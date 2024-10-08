import Category from '../../components/Category';
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import '../../assets/css/reservation.css';
import reset from '../../assets/img/reset.png';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { useUser } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ReservationList = () => {
    const domain = "https://www.devback.shop";
    const [state, setState] = useState(false);

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
        setState(p => !p)
    }, [user, loading, navigate]);
    const token = localStorage.getItem('accessToken');

    const [category, setCategory] = useState('예약완료');
    const [date, setDate] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        if (user && (user.role === "ROLE_ADMIN" || user.role === "ROLE_STUDENT")) {
            async function get(page = 1) {
                const url = `${domain}/reservation/check/${category}/${date}?page=${page}`;
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
        }
    }, [category, date, currentPage, state]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);

    const clickCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.textContent);
        setCurrentPage(1);
        setDate('All');
        setStartDate('');
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
        <div className="mypage-content__wrapper">
            <div className="mypage-content__title-wrapper">
                <h5 className="mypage-content__title">회의실 예약내역</h5>
            </div>
            {
                user && user.role === "ROLE_USER" ?
                    <div className="mypage-content__user-info">
                        <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                            권한이 없습니다.
                        </div>
                    </div>
                    : (
                        <div className="row justify-content-center my-5">
                            <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                                <Category text={'예약완료'} isActive={category} onClick={clickCategory} />
                                <Category text={'사용완료'} isActive={category} onClick={clickCategory} />
                            </div>
                            <div className="row text-end">
                                <div className="row py-4" style={{ padding: '0' }}>
                                    <div style={{ padding: '0', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        <span className="me-2">
                                            <DatePicker className="form-control"
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                dateFormat="yyyy년 MM월"
                                                showMonthYearPicker
                                                locale={ko}
                                                placeholderText='년/월'
                                                popperPlacement="top" // 달력을 위쪽에 표시
                                            />
                                        </span>
                                        <button className="btn px-4 border border-2 me-2" onClick={searchDate}>
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                        <button className="btn px-4 border border-2"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setStartDate('');
                                                setDate('All');
                                            }}><i class="fa-solid fa-rotate-right"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center align-items-center pb-5">
                                {
                                    data.map((v) => {
                                        return (
                                            <div className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5 border border-3" style={{ marginBottom: '1rem' }}>
                                                <div className="row p-2">
                                                    <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                                        <h4>{v.condition}</h4>
                                                    </div>
                                                    <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                                        <table>
                                                            <tr>
                                                                <td><h5><li>예약자명</li></h5></td>
                                                                <td><h5 style={{ marginLeft: '1rem' }}>: {v.userId}</h5></td>
                                                            </tr>
                                                            <tr>
                                                                <td><h5><li>날짜</li></h5></td>
                                                                <td><h5 style={{ marginLeft: '1rem' }}>: {v.date}</h5></td>
                                                            </tr>
                                                            <tr>
                                                                <td><h5><li>시간</li></h5></td>
                                                                <td><h5 style={{ marginLeft: '1rem' }}>: {v.time}</h5></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                                        {
                                                            v.condition === "예약완료" ?
                                                                <button className="btn rounded-pill px-4 btn-primary light-300"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        if (!user) {
                                                                            Swal.fire({
                                                                                icon: "error",
                                                                                title: "로그인이 필요합니다."
                                                                            });
                                                                            return;
                                                                        }
                                                                        Swal.fire({
                                                                            icon: "warning",
                                                                            title: "취소하시겠습니까?",
                                                                            text: `${v.date} ${v.time}`,
                                                                            showCancelButton: true,
                                                                            confirmButtonText: "예",
                                                                            confirmButtonColor: "#3085d6",
                                                                            cancelButtonText: "아니오",
                                                                            cancelButtonColor: "#d33"
                                                                        }).then((result) => {
                                                                            if (result.isConfirmed) {
                                                                                async function send() {
                                                                                    const url = `${domain}/reservation/delete?reservationId=${v.id}`;
                                                                                    await fetch(url, {
                                                                                        credentials: 'include',
                                                                                        headers: {
                                                                                            'Authorization': `Bearer ${token}`
                                                                                        }
                                                                                    });
                                                                                    Swal.fire({
                                                                                        icon: "success",
                                                                                        title: "취소되었습니다."
                                                                                    }).then(() => {
                                                                                        window.location.reload();
                                                                                    });
                                                                                }
                                                                                send();
                                                                            }
                                                                        });
                                                                    }}>예약취소</button>
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Pagination handlePageChange={handlePageChange} pageData={pageData} />
                        </div>
                    )
            }
        </div >
    );
};

export default ReservationList;