import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const ReservationCheck = () => {
    const navigate = useNavigate();

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
                                    <h5><li style={{ marginBottom: '1rem' }}> 년  월  일</li></h5>
                                    <h5><li style={{ listStyle: 'none' }}>시간</li></h5>
                                    <h5><li>시간</li></h5>
                                </div>
                                <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                    <button className="btn rounded-pill px-4 btn-primary light-300"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/reservation');
                                        }}>예약하기</button>
                                    <button className="btn rounded-pill px-4 btn-primary light-300"
                                    >삭제하기</button>
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

export default ReservationCheck;