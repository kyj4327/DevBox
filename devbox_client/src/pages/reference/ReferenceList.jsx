import Category from '../../components/Category';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';

const ReferenceList = () => {
    const domain = "http://localhost:8080";

    const { user } = useUser();
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/reference/write');
    };

    // user 객체에서 nickname 값 추출
    const userNickName = user ? user.nickname : null;

    const [selectJob, setSelectJob] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `${domain}/reference/list/${selectJob}?page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            // 페이지 데이터와 실제 데이터 분리
            const listData = data.slice(0, -1);  // 마지막 페이지 정보 객체를 제외한 부분
            const pageInfo = data[data.length - 1];  // 마지막 객체가 페이지 정보라고 가정
            setData(listData);  // 실제 데이터 설정
            setPageData(pageInfo);  // 페이지 정보 설정
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
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2">추천해요</h1>
                    <p className="text-center pb-5 light-300">다른 사람에게 알려주고 싶은 나만의 꿀팁을 공유해요!</p>
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
                    {
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
                                                                    title: "삭제하시겠습니까?",
                                                                    text: "삭제 후에는 되돌릴 수 없습니다.",
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonText: "삭제",
                                                                    confirmButtonColor: "#d33",
                                                                    cancelButtonText: "취소",
                                                                    cancelButtonColor: "#3085d6",
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
                                                                                title: "삭제되었습니다.",
                                                                                icon: "success"
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
                    }
                </div>
                {
                    !user ? ''
                        : <div className="form-row pt-2">
                            <div className="col-md-12 col-10 text-end">
                                <Button text={'작성하기'} onClick={toWrite} />
                            </div>
                        </div>
                }
            </section>
            <Pagination handlePageChange={handlePageChange} pageData={pageData} />
        </div>
    );
};

export default ReferenceList;