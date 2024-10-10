import Pagination from '../../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';
import Category from '../../components/Category';

const MyReferenceList = () => {
    const domain = "https://www.devback.shop";

    const { user, loading } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading && !user) {
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            }).then(() => {
                navigate('/auth');
            });
        }
    }, [user, loading, navigate]);
    const token = localStorage.getItem('accessToken');

    const userNickName = user ? user.nickname : null;

    const [selectJob, setSelectJob] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `${domain}/reference/mylist/${selectJob}?page=${page}`;
            const res = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            const listData = data.slice(0, -1);
            const pageInfo = data[data.length - 1];
            setData(listData);
            setPageData(pageInfo);
            setCurrentPage(page);
        }
        get(currentPage);
    }, [selectJob, currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);

    const clickSelectJob = (e) => {
        e.preventDefault();
        setSelectJob(e.target.textContent);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mypage-content__wrapper">
            <div className="mypage-content__title-wrapper">
                <h5 className="mypage-content__title">추천해요_내가 쓴 글</h5>
            </div>
            <div className="row justify-content-center my-5">
                <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                    <Category text={'All'} isActive={selectJob} onClick={clickSelectJob} />
                    <Category text={'Web'} isActive={selectJob} onClick={clickSelectJob} />
                    <Category text={'DevOps'} isActive={selectJob} onClick={clickSelectJob} />
                    <Category text={'Cloud'} isActive={selectJob} onClick={clickSelectJob} />
                    <Category text={'Data'} isActive={selectJob} onClick={clickSelectJob} />
                    <Category text={'Mobile'} isActive={selectJob} onClick={clickSelectJob} />
                    <Category text={'Others'} isActive={selectJob} onClick={clickSelectJob} />
                </div>
            </div>
            <div className="row justify-content-center my-5">
                {
                    data.length > 0 ? (
                        data.map((v) => {
                            return (
                                <div className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5" key={v.id}>
                                    <div className="row p-2">
                                        <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                            <h3>{v.title}</h3>
                                            <span>작성자 : {v.userId}</span>
                                        </div>
                                        <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                            <li style={{ listStyle: 'none' }}>{v.selectJob}</li>
                                            <li>{v.content1}</li>
                                            <li>{v.content2}</li>
                                            {v.content3 === '' ? '' : <li>{v.content3}</li>}
                                            {v.content4 === '' ? '' : <li>{v.content4}</li>}
                                            {v.content5 === '' ? '' : <li>{v.content5}</li>}
                                        </div>
                                        <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                            <Link to={v.link} className="btn rounded-pill px-4 btn-primary light-300" target='_blank' style={{ marginRight: '1rem' }}>Link</Link>
                                            {
                                                v.userId === userNickName
                                                    ? <>
                                                        <Link style={{ marginRight: '0.5em', textDecoration: 'none' }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigate(`/reference/update?referenceId=${v.id}`);
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
                                                                    icon: "warning",
                                                                    title: "삭제하시겠습니까?",
                                                                    text: "삭제 후에는 되돌릴 수 없습니다.",
                                                                    showCancelButton: true,
                                                                    confirmButtonText: "삭제",
                                                                    confirmButtonColor: "#d33",
                                                                    cancelButtonText: "취소",
                                                                    cancelButtonColor: "#3085d6"
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        async function send() {
                                                                            const url = `${domain}/reference/delete?referenceId=${v.id}`;
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
                                                    : <>
                                                        <span style={{ visibility: 'hidden', marginRight: '0.5em', cursor: 'default' }}>수정</span>
                                                        <span style={{ visibility: 'hidden', cursor: 'default' }}>삭제</span>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : <p>작성한 글이 없습니다.</p>
                }
            </div>
            {
                data.length > 0 ? <Pagination handlePageChange={handlePageChange} pageData={pageData} /> : ''
            }
        </div>
    );
};

export default MyReferenceList;