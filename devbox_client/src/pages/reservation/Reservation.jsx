import '../../assets/css/reservation.css';
import forCSS from '../../assets/img/banner-img-01.svg';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';

const Reservation = () => {
    const domain = "https://www.devback.shop";

    const { user } = useUser();
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const condition = "예약완료";
    const [timeData, setTimeData] = useState([]);

    const [userName, setUserName] = useState(''); // useState로 상태 초기화
    useEffect(() => {
        if (user) {
            setUserName(user.name); // user의 이름을 상태로 설정
        }
    }, [user]); // user 상태가 변경될 때만 실행

    const [isWeekend, setIsWeekend] = useState(false); // 주말 여부를 저장할 상태 변수
    useEffect(() => {
        const dayOfWeek = moment(value).day();
        setIsWeekend(dayOfWeek === 0 || dayOfWeek === 6); // 토요일(6), 일요일(0)인지 확인
        setDate(moment(value).format("YYYY년 MM월 DD일"));
    }, [value]);

    // 일요일(0) 또는 토요일(6)인지 확인하여 클래스를 지정
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (date.getDay() === 0) {
                return 'sunday';
            } else if (date.getDay() === 6) {
                return 'saturday';
            } else {
                return '';
            }
        } else {
            return false;
        }
    };

    const disableWeekends = ({ date, view }) => {
        if (view === 'month') { // 달력 뷰가 일 단위일 때만 주말을 비활성화
            const day = moment(date).day();
            return day === 0 || day === 6; // day가 0이면 일요일, 6이면 토요일
        }
        return false; // 다른 뷰 (연간, 월간)에서는 비활성화하지 않음
    };

    const timeClick = (e) => {
        e.preventDefault();
        setTime(e.target.innerText);
    };

    const validateFields = () => {
        if (isWeekend) { // 주말인지 체크
            Swal.fire({
                icon: "warning",
                title: "주말은 예약 불가합니다."
            });
            return false;
        } else if (!user) {
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            }).then(() => {
                navigate('/auth');
            });
            return false;
        } else if (user.role === "ROLE_USER") {
            Swal.fire({
                icon: "error",
                title: "수강생만 이용가능합니다."
            }).then(() => {
                navigate('/reservation/write');
            });
            return false;
        } else if (time === '') {
            Swal.fire({
                icon: "warning",
                title: "예약 시간을 선택해 주세요."
            });
            return false;
        }
        return true;
    };

    // 예약 가능 여부를 확인하는 함수 추가
    const checkReservationAvailability = async () => {
        const url = `${domain}/reservation/availability`;
        const response = await fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ date: date, time: time })
        });
        const data = await response.json();
        return data.isAvailable; // 서버에서 예약 가능 여부 반환
    };

    const saveData = async () => {
        try {
            const url = `${domain}/reservation/write`;
            const response = await fetch(url, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ date: date, time: time, condition: condition })
            });
            if (!response.ok) {
                throw new Error("서버에서 오류가 발생했습니다.");
            }
            const data = await response.json();
            if (data.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "예약되었습니다.",
                    text: `${date} ${time}`
                }).then(() => {
                    navigate('/mypage/reservation/check');
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "다시 입력해 주세요."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "예약 중 오류가 발생했습니다.",
                text: "다시 시도해 주세요."
            });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            const isAvailable = await checkReservationAvailability(); // 첫 번째 예약 가능 여부 확인
            if (!isAvailable) {
                Swal.fire({
                    icon: "warning",
                    title: "이미 예약된 날짜/시간입니다."
                }).then(() => {
                    window.location.reload();
                });
                return;
            }
            const result = await Swal.fire({
                title: "예약하시겠습니까?",
                text: `${date} ${time}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "예약",
                confirmButtonColor: "#3085d6",
                cancelButtonText: "취소",
                cancelButtonColor: "#d33",
            });
            if (result.isConfirmed) {
                const isStillAvailable = await checkReservationAvailability(); // 두 번째 예약 가능 여부 확인
                if (!isStillAvailable) {
                    Swal.fire({
                        icon: "warning",
                        title: "이미 예약된 날짜/시간입니다."
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    saveData(); // 예약 가능 시 데이터 저장
                }
            }
        }
    };

    useEffect(() => {
        async function get() {
            const url = `${domain}/reservation/write/${date}`;
            const res = await fetch(url);
            const data = await res.json();
            setTimeData(data);
            setTime('');
        }
        if (date) {
            get();
        }
    }, [date]);

    const isDisabled = (time) => {
        const now = moment(new Date()).format("YYYY년 MM월 DD일 HH:mm");
        const calTime = `${date} ${time.split(' - ')[0]}`;
        return (
            now > calTime // 현재 시간이 더 뒤인 경우 true를 반환
            || timeData.some((v) => v.time === time)
            // some() : 배열의 요소 중 하나라도 주어진 조건을 만족하면 true를 반환하고, 조건을 만족하는 요소가 하나도 없으면 false를 반환
        );
    };

    const TimeButton = ({ value }) => {
        return (
            !isWeekend && ( // 주말일 경우 버튼을 숨김
                <button className={`btn px-4 mx-auto btn-outline-primary ${isDisabled(value) ? "disabled-btn" : ""}`}
                    onClick={timeClick} disabled={isDisabled(value)}>{value}</button>
            )
        );
    };

    return (
        <div>
            <section className="bg-light reservation-section">
                <div className="container py-4">
                    <div className="row align-items-center justify-content-between">
                        <div className="contact-header col-lg-4">
                            <h1 className="h2 pb-3 text-primary">Reservation</h1>
                            <h3 className="h4 regular-400">회의실 예약</h3>
                            <p className="light-300">6층 회의실</p>
                        </div>
                        <div className="reservation-img col-lg-5 align-items-end col-md-4">
                            <img src={forCSS} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container py-5">
                <h1 className="col-12 col-xl-8 h2 text-left text-primary pt-3">부산 디지털 혁신아카데미 회의실</h1>
                <p className="col-12 col-xl-8 text-left text-danger pb-5 light-300">
                    본 6층 회의실 예약 서비스는 기능 구현을 위한 목적으로 제공되며, 실제 예약 및 사용은 부산 정보진흥원측에 문의하세요!
                </p>
                <div className="row d-flex align-items-center pb-5">
                    <div className="col-lg-6" style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div className="pricing-list rounded-botton rounded-3 py-sm-0 py-5">
                            <Calendar onChange={onChange} value={value}
                                formatDay={(locale, date) => moment(date).format('D')} // "일" 제거(숫자만 보이게)
                                calendarType='gregory' // 일요일부터 시작
                                next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                                prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                                minDate={new Date()} // 선택할 수 있는 최소 날짜
                                minDetail='year'
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 14))}
                                tileClassName={tileClassName} // 주말 색 설정
                                tileDisabled={disableWeekends} // 주말 비활성화
                            />
                        </div>
                        <div className="pricing-list rounded-botton rounded-3 py-sm-0 py-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <TimeButton value="09:00 - 12:00" />
                            <TimeButton value="12:00 - 15:00" />
                            <TimeButton value="15:00 - 18:00" />
                            <TimeButton value="18:00 - 21:00" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5 border border-3">
                            <div className="row p-2">
                                <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                    <h4>예약정보</h4>
                                </div>
                                <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                    <h5><li style={{ listStyle: 'none' }}>예약자명</li></h5>
                                    <h5><li style={{ marginBottom: '1rem' }}>{userName}</li></h5>
                                    <h5><li style={{ listStyle: 'none' }}>날짜</li></h5>
                                    <h5><li style={{ marginBottom: '1rem' }}>{date}</li></h5>
                                    <h5><li style={{ listStyle: 'none' }}>시간</li></h5>
                                    <h5><li>{time}</li></h5>
                                </div>
                                <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                    <button className="btn rounded-pill px-4 btn-primary light-300" onClick={handleSave}>예약하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>
    );
};

export default Reservation;