import { Link } from "react-router-dom";

const Footer = () => {
    const List = ({ link, text }) => {
        return (
            <li className="pb-2">
                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><Link to={link} className="text-decoration-none text-light py-1">{text}</Link>
            </li>
        );
    };

    return (
        <footer className="bg-secondary">
            <div className="w-100 py-3">
                <div className="container">
                    <div className="row pt-2">
                        <div className="col-lg-6 col-sm-12">
                            <Link to='/' className="navbar-brand">
                                <i className='bx bx-buildings bx-sm text-light'></i>
                                <span className="text-light h4">DevBox</span>
                            </Link>
                            <p className="text-light my-2">개발의 모든 것을 담은 상자처럼, 신입 개발자들이 필요한 모든 것이 있는 공간</p>
                            <p className="text-light my-2">기간 : 2024. 08. 19. - 2024. 10. 15.</p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-lg-end text-center text-light light-300">
                                <ul className="list-inline footer-icons light-300">
                                    <li className="list-inline-item m-0">
                                        <a className="text-light" target="_blank" href="깃주소">
                                            <i className='bx bxl-facebook-square bx-md'></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <a className="text-light" target="_blank" href="구글시트">
                                            <i className='bx bxl-linkedin-square bx-md'></i>
                                        </a>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row py-4">
                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">김영준(조장)</h2>
                        <ul className="list-unstyled text-light light-300">
                            <List link='/notice/list' text='공지사항' />
                            <List link='/greeting/list' text='가입 인사' />
                            <List link='/gathermate/list' text='모여라 메이트' />
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><span className="text-decoration-none text-light py-1" style={{ cursor: 'default' }}>로그인</span>
                            </li>
                            <List link='/mypage' text='마이페이지' />
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><span className="text-decoration-none text-light py-1" style={{ cursor: 'default' }}>배포</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">구본환</h2>
                        <ul className="list-unstyled text-light light-300">
                            <List link='/introduce' text='BDIA 소개' />
                            <List link='/schedule' text='연간 교육 일정' />
                            <List link='/freeboard/list' text='자유게시판' />
                            <List link='/faq' text='FAQ' />
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">김민준</h2>
                        <ul className="list-unstyled text-light light-300">
                            <List link='/edu/list' text='교육 과정' />
                            <List link='/project/list' text='프로젝트 자랑' />
                            <List link='/message/list' text='쪽지' />
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">이예림</h2>
                        <ul className="list-unstyled text-light light-300">
                            <List link='/' text='메인페이지' />
                            <List link='/jobinfo/list' text='개발 직군' />
                            <List link='/hiring/list' text='채용 공고' />
                            <List link='/contest/list' text='공모전 공고' />
                            <List link='/reference/list' text='추천해요' />
                            <List link='/reservation/write' text='6층 회의실 대여' />
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-100 bg-primary py-3">
                <div className="container">
                    <div className="row pt-2">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-lg-start text-center text-light light-300">
                                © Copyright 2021 Purple Buzz Company. All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-lg-end text-center text-light light-300">
                                Designed by <a rel="sponsored" className="text-decoration-none text-light" href="https://templatemo.com/" target="_blank"><strong>TemplateMo</strong></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;