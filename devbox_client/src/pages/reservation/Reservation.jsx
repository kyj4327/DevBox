import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../assets/css/reservation.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
    const navigate = useNavigate();

    const [value, onChange] = useState(new Date());
    const [name, setName] = useState('이예림');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [condition, setCondition] = useState('예약완료');
    const [timeData, setTimeData] = useState([]);

    useEffect(() => {
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
    }

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

    const saveData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://127.0.0.1:8080/reservation/write';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name: name, date: date, time: time, condition: condition })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('예약 완료');
                navigate('/reservation/list');
            } else {
                alert('다시 입력해주세요.');
            }
        }
        send();
    };

    useEffect(() => {
        async function get() {
            const url = `http://127.0.0.1:8080/reservation/${date}`;
            const res = await fetch(url);
            const data = await res.json();
            setTimeData(data);
        }
        if (date) {
            get();
        }
    }, [date]);

    const isDisabled = (time) => {
        return timeData.some((v) => v.time === time);
    };
    // some() : 배열의 요소 중 하나라도 주어진 조건을 만족하면 true를 반환하고, 조건을 만족하는 요소가 하나도 없으면 false를 반환

    const TimeButton = ({ value }) => {
        return (
            <button className={`btn px-4 mx-auto btn-outline-primary ${isDisabled(value) ? "disabled-btn" : ""}`}
                onClick={timeClick} disabled={isDisabled(value)}>{value}</button>
        );
    };

    return (
        <div>
            <Header />
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
                <h1 className="col-12 col-xl-8 h2 text-left text-primary pt-3">부산 디지털 혁신아카데미 회의실</h1>
                <h2 className="col-12 col-xl-8 h4 text-left regular-400">회의실 관련 문의</h2>
                <p className="col-12 col-xl-8 text-left text-muted pb-5 light-300">
                    번호 : 051-749-9424/9474
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
                                    <h5><li style={{ marginBottom: '1rem' }}>이예림</li></h5>
                                    <h5><li style={{ listStyle: 'none' }}>날짜</li></h5>
                                    <h5><li style={{ marginBottom: '1rem' }}>{date}</li></h5>
                                    <h5><li style={{ listStyle: 'none' }}>시간</li></h5>
                                    <h5><li>{time}</li></h5>
                                </div>
                                <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                    <button className="btn rounded-pill px-4 btn-primary light-300" onClick={saveData}>예약하기</button>
                                    <button className="btn rounded-pill px-4 btn-primary light-300"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/reservation/list');
                                        }}>예약내역</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div >
    );
};

export default Reservation;