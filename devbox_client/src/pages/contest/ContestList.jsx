import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';

const ContestList = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/contest/write');
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `http://localhost:8080/contest/list?page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            const listData = data.slice(0, -1);
            const pageInfo = data[data.length - 1];
            setData(listData);
            setPageData(pageInfo);
            setCurrentPage(page);
        }
        get(currentPage);
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const calculateDDay = (targetDate) => {
        const today = new Date(); // 오늘 날짜
        const target = new Date(targetDate); // String 형태의 날짜를 Date 객체로 변환
        // 두 날짜 간의 차이를 밀리초 단위로 계산
        const diff = target.getTime() - today.getTime();
        // 밀리초를 일수로 변환
        const dDay = Math.ceil(diff / (1000 * 3600 * 24));
        return dDay;
    };

    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2">공모전</h1>
                    <p className="text-center pb-5 light-300">대회/공모전의 세부요강은 주최사의 기획에 의해 내용이 변경될 수 있으니, 주최사의 공고를 반드시 확인해 보시기 바랍니다.</p>
                    <div className="row projects gx-lg-5">
                        {
                            data.map((v) => {
                                return (
                                    <div className="col-sm-6 col-lg-4" style={{ marginBottom: '3rem' }} key={v.id}>
                                        <Link to={v.officialUrl} className="text-decoration-none" target='_blank' >
                                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                                <img className="card-img-top" src={v.imgUrl} alt="" />
                                                <div className="card-body">
                                                    <h5 className="card-title light-300 text-dark">
                                                        {v.title}
                                                        <label htmlFor="dday" style={{ color: 'red' }}>
                                                            (D-{calculateDDay(v.regEnd) == 0 ? "day" : calculateDDay(v.regEnd)})
                                                        </label>
                                                    </h5>
                                                    <li>주최</li><p className="card-text light-300 text-dark">{v.host}</p>
                                                    <li>대상</li><p className="card-text light-300 text-dark">{v.target}</p>
                                                    <li>접수</li><p className="card-text light-300 text-dark">{v.regStart} ~ {v.regEnd}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                                        </span>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            <Link style={{ marginRight: '0.5em', textDecoration: 'none' }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    navigate(`/contest/update?contestId=${v.id}`);
                                                                }}>수정</Link>
                                                            <Link style={{ textDecoration: 'none' }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (!user) {
                                                                        alert("로그인이 필요합니다.");
                                                                        return;
                                                                    }
                                                                    const token = localStorage.getItem('accessToken');
                                                                    if (window.confirm("삭제하시겠습니까?")) {
                                                                        async function send() {
                                                                            const url = `http://localhost:8080/contest/delete?contestId=${v.id}`;
                                                                            await fetch(url, {
                                                                                credentials: 'include',
                                                                                headers: {
                                                                                    'Authorization': `Bearer ${token}`
                                                                                }
                                                                            });
                                                                            alert("삭제되었습니다.");
                                                                            window.location.reload();
                                                                        }
                                                                        send();
                                                                    }
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

export default ContestList;