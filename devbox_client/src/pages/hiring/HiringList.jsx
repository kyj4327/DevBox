import Category from '../../components/Category';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';

const HiringList = () => {
    const domain = "https://www.devback.shop";

    const { user } = useUser();
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/hiring/write');
    };

    const userRole = user ? user.role : null;

    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `${domain}/hiring/list/${category}?page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            const listData = data.slice(0, -1);
            const pageInfo = data[data.length - 1];
            setData(listData);
            setPageData(pageInfo);
            setCurrentPage(page);
        }
        get(currentPage);
    }, [category, currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);

    const clickCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.textContent);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2">채용 공고</h1>
                    <p className="text-center pb-5 light-300">더 다양한 채용 정보를 알고 싶다면 5층 취업 상담실을 방문해 주세요.</p>
                    <div className="row justify-content-center my-5">
                        <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                            <Category text={'All'} isActive={category} onClick={clickCategory} />
                            <Category text={'Busan'} isActive={category} onClick={clickCategory} />
                            <Category text={'Others'} isActive={category} onClick={clickCategory} />
                        </div>
                    </div>
                    <div className="row gy-5 g-lg-5 mb-4">
                        {
                            data.map((v) => {
                                return (
                                    <div className="col-md-4 mb-3" key={v.id}>
                                        <Link to={v.wantedUrl} className="text-decoration-none" target='_blank' >
                                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                                <img className="card-img-top" src={v.imgUrl} alt="https://www.wanted.co.kr/" style={{ height: '297px' }} />
                                                <div className="card-body" style={{ height: '184px' }}>
                                                    <h5 className="card-title light-300 text-dark">{v.job}</h5>
                                                    <h5 className="card-title light-300 text-dark">{v.company}</h5>
                                                    <p className="card-text light-300 text-dark">{v.area} / {v.career}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                                        </span>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            {
                                                                userRole === "ROLE_ADMIN"
                                                                    ? <>
                                                                        <Link style={{ marginRight: '0.5em', textDecoration: 'none' }}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                navigate(`/hiring/update?hiringId=${v.id}`);
                                                                            }}>수정</Link>
                                                                        <Link style={{ textDecoration: 'none' }}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                if (!user) {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "로그인이 필요합니다."
                                                                                    });
                                                                                    return;
                                                                                }
                                                                                const token = localStorage.getItem('accessToken');
                                                                                Swal.fire({
                                                                                    title: "삭제하시겠습니까?",
                                                                                    text: "삭제 후에는 되돌릴 수 없습니다.",
                                                                                    icon: "warning",
                                                                                    showCancelButton: true,
                                                                                    confirmButtonText: "삭제",
                                                                                    confirmButtonColor: "#d33",
                                                                                    cancelButtonText: "취소",
                                                                                    cancelButtonColor: "#3085d6"
                                                                                }).then((result) => {
                                                                                    if (result.isConfirmed) {
                                                                                        async function send() {
                                                                                            const url = `${domain}/hiring/delete?hiringId=${v.id}`;
                                                                                            await fetch(url, {
                                                                                                credentials: 'include',
                                                                                                headers: {
                                                                                                    'Authorization': `Bearer ${token}`
                                                                                                }
                                                                                            });
                                                                                            Swal.fire({
                                                                                                icon: "success",
                                                                                                title: "삭제되었습니다."
                                                                                            }).then(() => {
                                                                                                window.location.reload();
                                                                                            });
                                                                                        }
                                                                                        send();
                                                                                    }
                                                                                });
                                                                            }}>삭제</Link>
                                                                    </>
                                                                    : ''
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        {
                            userRole === "ROLE_ADMIN"
                                ? <div className="form-row pt-2">
                                    <div className="col-md-12 col-10 text-end">
                                        <Button text={'글쓰기'} icon="pen" onClick={toWrite} />
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                </div>
            </section>
            <Pagination handlePageChange={handlePageChange} pageData={pageData} />
        </div>
    );
};

export default HiringList;