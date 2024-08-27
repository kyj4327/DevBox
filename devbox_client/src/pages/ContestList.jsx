import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ContestList = () => {
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/contest/write');
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `http://127.0.0.1:8080/contest/list?page=${page}`;
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

    return (
        <div>
            <Header />
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2">공모전</h1>
                    <p className="text-center pb-5 light-300">대회/공모전의 세부요강은 주최사의 기획에 의해 내용이 변경될 수 있으니, 주최사의 공고를 반드시 확인해 보시기 바랍니다.</p>
                    <div className="row projects gx-lg-5">
                        {
                            data.map((v) => {
                                return (
                                    <a href={v.officialUrl} className="col-sm-6 col-lg-4 text-decoration-none" key={v.id} target='_blank'>
                                        <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                            <img className="card-img-top" src={v.imgUrl} alt="" />
                                            <div className="card-body">
                                                <h5 className="card-title light-300 text-dark">{v.title}<label htmlFor="dday" style={{ color: 'red' }}>(D-3)</label></h5>
                                                <li>주최</li>
                                                <p className="card-text light-300 text-dark">{v.host}</p>
                                                <li>대상</li>
                                                <p className="card-text light-300 text-dark">{v.target}</p>
                                                <li>접수</li>
                                                <p className="card-text light-300 text-dark">
                                                    {v.regStart} ~ {v.regEnd}
                                                </p>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span className="text-decoration-none text-primary light-300">
                                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                                    </span>
                                                    <span className="text-decoration-none text-primary light-300">
                                                        <a href=''
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigate(`/contest/update?contestId=${v.id}`);
                                                            }}>수정</a>
                                                        <a href=''
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                async function send() {
                                                                    const url = `http://127.0.0.1:8080/contest/delete?contestId=${v.id}`;
                                                                    await fetch(url);
                                                                    alert("삭제가 완료되었습니다.");
                                                                    window.location.reload();
                                                                }
                                                                send();
                                                            }}>삭제</a>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </a>
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
            <Footer />
        </div>
    );
};

export default ContestList;