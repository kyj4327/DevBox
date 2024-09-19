import Category from '../../components/Category';
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import '../../assets/css/reservation.css';
import reset from '../../assets/img/reset.png';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

const ReservationList = () => {
    const [category, setCategory] = useState('예약완료');
    const [date, setDate] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `http://localhost:8080/reservation/list/${category}/${date}?page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            const listData = data.slice(0, -1);
            const pageInfo = data[data.length - 1];
            setData(listData);
            setPageData(pageInfo);
            setCurrentPage(page);
        }
        get(currentPage);
    }, [category, date, currentPage]);

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

    const [startDate, setStartDate] = useState('');
    const searchDate = (e) => {
        e.preventDefault();
        if (startDate) {
            setDate(format(startDate, 'yyyy년 MM월'));
        }
    };

    return (
        <div>
            <section className="bg-light contact-section">
                <div className="container py-4">
                    <div className="row align-items-center justify-content-between">
                        <div className="contact-header col-lg-4">
                            <h1 className="h2 pb-3 text-primary">Reservation</h1>
                            <h3 className="h4 regular-400">회의실 예약</h3>
                            <p className="light-300">
                                6층 회의실
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container py-5">
                <h1 className="col-12 col-xl-8 h2 text-left text-primary pt-3">마이페이지</h1>
                <h2 className="col-12 col-xl-8 h4 text-left regular-400">회의실 예약 내역</h2>
                <p className="col-12 col-xl-8 text-left text-muted pb-5 light-300">
                    번호 : 051-749-9424/9474
                </p>
                <div className="row justify-content-center my-5">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                        <Category text={'예약완료'} isActive={category} onClick={clickCategory} />
                        <Category text={'사용완료'} isActive={category} onClick={clickCategory} />
                    </div>
                    <div className="row py-4" style={{ justifyContent: 'flex-end' }}>
                        <div className="col-lg-6" style={{ width: '15%' }}>
                            <DatePicker className="form-control form-control-lg light-300"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy년 MM월"
                                showMonthYearPicker
                                locale={ko}
                                placeholderText='년/월'
                                popperPlacement="top"  // 달력을 위쪽에 표시
                            />
                        </div>
                        <div className="col-lg-6" style={{ width: '15%', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                            <button className="btn rounded-pill px-4 btn-primary light-300" onClick={searchDate}>검색</button>
                            <button className="btn rounded-pill px-4 btn-primary light-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStartDate('');
                                    setDate('All');
                                }}><img src={reset} alt="https://icons8.com" /></button>
                        </div>
                    </div>
                </div>
                <div className="row d-flex align-items-center pb-5">
                    {
                        data.map((v) => {
                            return (
                                <div className="col-lg-6" key={v.id} style={{ marginBottom: '2rem' }}>
                                    <div className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5 border border-3">
                                        <div className="row p-2">
                                            <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                                <h4>{v.condition}</h4>
                                            </div>
                                            <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                                <h5><li style={{ listStyle: 'none' }}>예약자명</li></h5>
                                                <h5><li style={{ marginBottom: '1rem' }}>{v.name}</li></h5>
                                                <h5><li style={{ listStyle: 'none' }}>날짜</li></h5>
                                                <h5><li style={{ marginBottom: '1rem' }}>{v.date}</li></h5>
                                                <h5><li style={{ listStyle: 'none' }}>시간</li></h5>
                                                <h5><li>{v.time}</li></h5>
                                            </div>
                                            <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                                {
                                                    v.condition === "예약완료" ?
                                                        <button className="btn rounded-pill px-4 btn-primary light-300"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (window.confirm(`${v.date} ${v.time} 예약취소하시겠습니까?`)) {
                                                                    async function send() {
                                                                        const url = `http://localhost:8080/reservation/delete?reservationId=${v.id}`;
                                                                        await fetch(url);
                                                                        alert(`${v.date} ${v.time} 예약취소되었습니다.`);
                                                                        window.location.reload();
                                                                    }
                                                                    send();
                                                                }
                                                            }}>예약취소</button>
                                                        : ""
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section >
            <Pagination handlePageChange={handlePageChange} pageData={pageData} />
        </div >
    );
};

export default ReservationList;