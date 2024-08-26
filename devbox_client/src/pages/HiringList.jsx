import Header from '../components/Header';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const HiringList = () => {
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/hiring/write');
    };

    return (
        <div>
            <Header />
            <section className="container py-5">
                <div class="container py-5">
                    <h1 class="h2 semi-bold-600 text-center mt-2">채용 공고</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
                    <div className="row justify-content-center my-5">
                        <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                            {/* <Category text={'All'} isActive={selectJob} onClick={clickSelectJob} />
                            <Category text={'부산'} isActive={selectJob} onClick={clickSelectJob} />
                            <Category text={'부산외'} isActive={selectJob} onClick={clickSelectJob} /> */}
                        </div>
                    </div>
                    <div className="row projects gx-lg-5">
                        <a href="https://www.wanted.co.kr/wd/225573" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business" target='_blank'>
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F47097%2Fvkmzgfpx5znwy3df__1080_790.jpg&w=700&q=100" alt="https://www.wanted.co.kr/" />
                                <div className="card-body">
                                    <h5 className="card-title light-300 text-dark">실시간 데이터 통신 및 데이터 처리 개발자</h5>
                                    <h5 className="card-title light-300 text-dark">아이오티플렉스</h5>
                                    <p className="card-text light-300 text-dark">
                                        부산 / 신입-경력 10년
                                    </p>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <span className="text-decoration-none text-primary light-300">
                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                        </span>
                                        <span className="text-decoration-none text-primary light-300">
                                            <a href='#'>수정</a>
                                            <a href='#'>삭제</a>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </a>
                        <a href="https://www.wanted.co.kr/wd/237648" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business" target='_blank'>
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F1776%2Fgjxbzmgfmxcpeo91__1080_790.png&w=700&q=100" alt="https://www.wanted.co.kr/" />
                                <div className="card-body">
                                    <h5 className="card-title light-300 text-dark">신입 백엔드 엔지니어</h5>
                                    <h5 className="card-title light-300 text-dark">모두싸인</h5>
                                    <p className="card-text light-300 text-dark">
                                        부산 해운대구 / 신입
                                    </p>
                                    <span className="text-decoration-none text-primary light-300">
                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a href="https://www.wanted.co.kr/wd/207573" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business" target='_blank'>
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F47417%2Fkzalrowgz0wizwwi__1080_790.png&w=700&q=100" alt="https://www.wanted.co.kr/" />
                                <div className="card-body">
                                    <h5 className="card-title light-300 text-dark">Frontend Developer</h5>
                                    <h5 className="card-title light-300 text-dark">토스플레이스</h5>
                                    <p className="card-text light-300 text-dark">
                                        서울 강남구 / 경력 1-15년
                                    </p>
                                    <span className="text-decoration-none text-primary light-300">
                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a href="https://www.wanted.co.kr/wd/233465" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business" target='_blank'>
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F153%2Fjokadyokaftvfdeb__1080_790.jpg&w=700&q=100" alt="https://www.wanted.co.kr/" />
                                <div className="card-body">
                                    <h5 className="card-title light-300 text-dark">[Tech Solutions]웹 어플리케이션 개발자</h5>
                                    <h5 className="card-title light-300 text-dark">샌드박스네트워크(Sandbox)</h5>
                                    <p className="card-text light-300 text-dark">
                                        서울 용산구 / 경력 1년 이상
                                    </p>
                                    <span className="text-decoration-none text-primary light-300">
                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a href="https://www.wanted.co.kr/wd/225832" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business" target='_blank'>
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F15095%2Fdg7hu3ytbsorm3zl__1080_790.jpg&w=700&q=100" alt="https://www.wanted.co.kr/" />
                                <div className="card-body">
                                    <h5 className="card-title light-300 text-dark">개발팀 웹 파트 부문</h5>
                                    <h5 className="card-title light-300 text-dark">비바이노베이션</h5>
                                    <p className="card-text light-300 text-dark">
                                        서울 강남구 / 경력 1-5년
                                    </p>
                                    <span className="text-decoration-none text-primary light-300">
                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a href="https://www.wanted.co.kr/wd/229817" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business" target='_blank'>
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F1014%2Fqfzxagxlqjbc2qsb__1080_790.jpg&w=700&q=100" alt="https://www.wanted.co.kr/" />
                                <div className="card-body">
                                    <h5 className="card-title light-300 text-dark">프론트엔드 엔지니어</h5>
                                    <h5 className="card-title light-300 text-dark">엘리스</h5>
                                    <p className="card-text light-300 text-dark">
                                        서울 강남구 / 신입-경력 4년
                                    </p>
                                    <span className="text-decoration-none text-primary light-300">
                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'작성하기'} onClick={toWrite} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HiringList;