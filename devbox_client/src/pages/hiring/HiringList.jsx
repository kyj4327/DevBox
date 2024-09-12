import Category from '../../components/Category';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HiringList = () => {
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/hiring/write');
    };

    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `http://127.0.0.1:8080/hiring/list/${category}?page=${page}`;
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
                    <p className="text-center pb-5 light-300">더 다양한 채용 정보를 알고 싶다면 5층 취업 상담실을 방문해주세요.</p>
                    <div className="row justify-content-center my-5">
                        <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                            <Category text={'All'} isActive={category} onClick={clickCategory} />
                            <Category text={'Busan'} isActive={category} onClick={clickCategory} />
                            <Category text={'Others'} isActive={category} onClick={clickCategory} />
                        </div>
                    </div>
                    <div className="row projects gx-lg-5">
                        {
                            data.map((v) => {
                                return (
                                    <div className="col-sm-6 col-lg-4" style={{ marginBottom: '3rem' }} key={v.id}>
                                        <Link to={v.wantedUrl} className="text-decoration-none" target='_blank' >
                                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                                <img className="card-img-top" src={v.imgUrl} alt="https://www.wanted.co.kr/" />
                                                <div className="card-body">
                                                    <h5 className="card-title light-300 text-dark">{v.job}</h5>
                                                    <h5 className="card-title light-300 text-dark">{v.company}</h5>
                                                    <p className="card-text light-300 text-dark">{v.area} / {v.career}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                                        </span>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            <Link onClick={(e) => {
                                                                e.preventDefault();
                                                                navigate(`/hiring/update?hiringId=${v.id}`);
                                                            }}>수정</Link>
                                                            <Link onClick={(e) => {
                                                                e.preventDefault();
                                                                async function send() {
                                                                    const url = `http://127.0.0.1:8080/hiring/delete?hiringId=${v.id}`;
                                                                    await fetch(url);
                                                                    alert("삭제가 완료되었습니다.");
                                                                    window.location.reload();
                                                                }
                                                                send();
                                                            }}>삭제</Link>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'작성하기'} onClick={toWrite} />
                    </div>
                </div>
            </section>
            <Pagination handlePageChange={handlePageChange} pageData={pageData} />
        </div>
    );
};

export default HiringList;