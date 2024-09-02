import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/reservation.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const Reservation = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    // 컴포넌트가 처음 렌더링될 때 year, month, day를 설정
    useEffect(() => {
        setYear(format(startDate, 'yyyy'));
        // setMonth(format(startDate, 'MM'));
        // setDay(format(startDate, 'dd'));
        setMonth(format(startDate, 'M'));
        setDay(format(startDate, 'd'));
    }, [startDate]);

    const timeClick = (e) => {
        e.preventDefault();
        setTime(e.target.innerText);
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
                    <div className="col-lg-6 offset-lg-0 col-md-8 offset-md-2">
                        <div className="pricing-list rounded-botton rounded-3 py-sm-0 py-5">
                            <DatePicker
                                locale={ko}
                                todayButton="today"
                                selected={startDate}
                                onChange={(date) => { setStartDate(date); }}
                                minDate={new Date()}
                                inline />
                        </div>
                        <div className="pricing-list mt-4 rounded-botton rounded-3 py-sm-0 py-5" style={{ display: 'flex' }}>
                            <button className="btn px-4 mx-auto btn-outline-primary" onClick={timeClick}>09:00 - 12:00</button>
                            <button className="btn px-4 mx-auto btn-outline-primary" onClick={timeClick}>12:00 - 15:00</button>
                            <button className="btn px-4 mx-auto btn-outline-primary" onClick={timeClick}>15:00 - 18:00</button>
                            <button className="btn px-4 mx-auto btn-outline-primary" onClick={timeClick}>18:00 - 21:00</button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                            <ul className="list-unstyled text-center light-300">
                                <li className="h5 semi-bold-600 mb-0 mt-3">예약자명 : 이예림</li>
                                <li className="h5 semi-bold-600 mb-0 mt-3">날짜 : {year} 년 {month} 월 {day} 일</li>
                                <li className="h5 semi-bold-600 mb-0 mt-3">시간 : {time}</li>
                            </ul>
                            <div className="pricing-list-footer col-sm-4 col-5 text-center m-auto align-items-center">
                                <button className="btn rounded-pill px-4 btn-primary light-300">예약하기</button>
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