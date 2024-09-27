import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../components/Category";

const Main = () => {
    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function get(page = 1) {
            const url = `http://localhost:8080/hiring/list/${category}?page=${page}`;
            const res = await fetch(url);
            const data = await res.json();
            const listData = data.slice(0, -1);
            setData(listData);
            setCurrentPage(page);
        }
        get(currentPage);
    }, [category, currentPage]);

    const clickCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.textContent);
        setCurrentPage(1);
    };

    return (
        <>
            <div class="banner-wrapper bg-light">
                <div id="index_banner" class="banner-vertical-center-index container-fluid pt-5">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="py-5 row d-flex align-items-center">
                                    <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                        <h1 class="banner-heading h1 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                                            Develop <strong>Strategies</strong> for
                                            <br />your business
                                        </h1>
                                        <p class="banner-body text-muted py-3 mx-0 px-0">
                                            Dev Box is a corporate HTML template with Bootstrap 5 Beta 1. This CSS template is 100% free to download provided by <a rel="nofollow" href="https://templatemo.com/page/1" target="_parent">TemplateMo</a>. Total 6 HTML pages included in this template. Icon fonts by <a rel="nofollow" href="https://boxicons.com/" target="_blank">Boxicons</a>. Photos are from <a rel="nofollow" href="https://unsplash.com/" target="_blank">Unsplash</a> and <a rel="nofollow" href="https://icons8.com/" target="_blank">Icons 8</a>.
                                        </p>
                                        <a class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" href="#" role="button">Get Started</a>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="py-5 row d-flex align-items-center">
                                    <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                        <h1 class="banner-heading h1 text-secondary display-3 mb-0 pb-3 mx-0 px-0 light-300">
                                            HTML CSS Template with Bootstrap 5 Beta 1
                                        </h1>
                                        <p class="banner-body text-muted py-3">
                                            You are not allowed to re-distribute this Dev Box HTML template as a downloadable ZIP file on any kind of Free CSS collection websites. This is strongly prohibited. Please contact TemplateMo for more information.
                                        </p>
                                        <a class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" href="#" role="button">Get Started</a>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="py-5 row d-flex align-items-center">
                                    <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                        <h1 class="banner-heading h1 text-secondary display-3 mb-0 pb-3 mx-0 px-0 light-300">
                                            Cupidatat non proident, sunt in culpa qui officia
                                        </h1>
                                        <p class="banner-body text-muted py-3">
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                            irure dolor in reprehenderit in voluptate velit esse cillum
                                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
                                        </p>
                                        <a class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" href="#" role="button">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev text-decoration-none" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                            <i class='bx bx-chevron-left'></i>
                            <span class="visually-hidden">Previous</span>
                        </a>
                        <a class="carousel-control-next text-decoration-none" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                            <i class='bx bx-chevron-right'></i>
                            <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* <section class="bg-secondary">
                <div class="container py-5">
                    <div class="row d-flex justify-content-center text-center">
                        <h5 className="h5 text-center text-light">
                            더 많은 채용 정보는 <Link to="/hiring/list" className="text-light">채용 공고 게시판</Link>
                            에서 확인해주세요.
                        </h5>
                    </div>
                </div>
            </section> */}

            <section class="container overflow-hidden py-5">
                <div class="row gx-5 gx-sm-3 gx-lg-5 gy-lg-5 gy-3 pb-3 projects justify-content-center">
                    <h4 className="h4 semi-bold-600 text-center">
                        더 많은 채용 정보는 <Link to="/hiring/list" className="semi-bold-600">채용 공고 게시판</Link>
                        에서 확인해주세요.
                    </h4>
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto justify-content-center">
                        <Category text={'All'} isActive={category} onClick={clickCategory} />
                        <Category text={'Busan'} isActive={category} onClick={clickCategory} />
                        <Category text={'Others'} isActive={category} onClick={clickCategory} />
                    </div>
                    <div class="row gy-5 g-lg-5 mb-4" style={{ marginTop: '0' }}>
                        {
                            data.map((v) => {
                                return (
                                    <div class="col-sm-6 col-lg-4" key={v.id}>
                                        <Link to={v.wantedUrl} class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0" target='_blank'>
                                            <img class="service card-img" src={v.imgUrl} alt="https://www.wanted.co.kr/" />
                                            <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                                                <div class="service-work-content text-left text-light">
                                                    <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">{v.company}</span>
                                                    <p class="card-text">{v.job}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default Main;