import { useNavigate } from "react-router-dom";

const EduInfo = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '2em' }}>개발 직군 정보</h2>
            <section className="container py-5">
                <div className="row justify-content-center my-5">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                        <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 active" data-filter=".project" href="#">전체</a>
                        <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".business" href="#">모집중</a>
                        <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">진행중</a>
                    </div>
                </div>
                <div className="row projects gx-lg-5">
                    <a href="/detail?id=1" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business">
                        <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                            <img className="card-img-top" src="http://edu.busanit.or.kr/image/8b58416b-ea75-4bad-a33f-be00d54aa54a.png" alt="제작자:IYIKON-Flaticon" />
                            <div className="card-body">
                                <h4 className="card-title light-300 text-dark">
                                    (채용연계)클라우드 기반 서버가상화 전문 기술교육 과정</h4>
                                <p className="card-text light-300 text-dark">
                                    AI / 클라우드 / 빅데이터 / 로봇으로의 기술혁신시대
                                    IT 전문가가 되기 위한 국제공인 교육 및 라이센스 취득

                                    문의 : 051-610-0110
                                </p>
                                <span className="text-decoration-none text-primary light-300">
                                    Read more <i className='bx bxs-hand-right ms-1'></i>
                                </span>
                            </div>
                        </div>
                    </a>
                    <a href="/detail?id=2" className="col-sm-6 col-lg-4 text-decoration-none project graphic social">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src="http://edu.busanit.or.kr/image/d492cee6-005a-421e-a3c1-d05205e15f79.jpg" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title light-300 text-dark">자바&스프링부트 크로스플랫폼 융합응용SW개발자 양성과정</h4>
                                <p className="card-text light-300 text-dark">
                                    자바&Springboot 크로스 플랫폼(풀스택)융합 응용SW개발자 양성과정
                                   
                                </p>
                                <span className="text-decoration-none text-primary light-300">
                                    Read more <i className='bx bxs-hand-right ms-1'></i>
                                </span>
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project marketing graphic business">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src="http://edu.busanit.or.kr/image/d492cee6-005a-421e-a3c1-d05205e15f79.jpg" alt="제작자:Freepik-Flaticon" />
                            <div className="card-body">
                                <h4 className="card-title light-300 text-dark">
                                [기업연계]메타버스 콘텐츠 제작자 양성</h4>
                                <p className="card-text light-300 text-dark">
                                (기업연계프로젝트형)메타버스 콘텐츠(Unity기반 실감형, VR/AR/XR)제작자 양성
                                   
                                </p>
                                <span className="text-decoration-none text-primary light-300">
                                    Read more <i className='bx bxs-hand-right ms-1'></i>
                                </span>
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project social business">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src="http://edu.busanit.or.kr/image/d492cee6-005a-421e-a3c1-d05205e15f79.jpg" alt="제작자:Freepik-Flaticon" />
                            <div className="card-body">
                                <h4 className="card-title light-300 text-dark">스프링부트 기반 웹개발과 플러터 기반 앱개발 심화과정</h4>
                                <p className="card-text light-300 text-dark">
                                    K-디지털 트레이닝 단기심화 / Spring Boot / Flutter / SW 융합 전문가 양성 /
                                    문의: 051-912-1000

                                </p>
                                <span className="text-decoration-none text-primary light-300">
                                    Read more <i className='bx bxs-hand-right ms-1'></i>
                                </span>
                            </div>
                        </div>
                    </a>
               
                </div>
            </section>
            <a href="/dm" className="dm">글쓰기</a>
            <button>삭제</button>

        </div>

    );
};

export default EduInfo;