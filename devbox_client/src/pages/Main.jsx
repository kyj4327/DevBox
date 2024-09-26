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
            <section class="py-5 mb-5">
                <div class="container">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto justify-content-center" style={{ marginBottom: '3rem' }}>
                        <Category text={'All'} isActive={category} onClick={clickCategory} />
                        <Category text={'Busan'} isActive={category} onClick={clickCategory} />
                        <Category text={'Others'} isActive={category} onClick={clickCategory} />
                    </div>
                    <div class="row gy-5 g-lg-5 mb-4">
                        {
                            data.map((v) => {
                                return (
                                    <div className="col-sm-6 col-lg-4" style={{ marginBottom: '3rem' }} key={v.id}>
                                        <Link to={v.wantedUrl} className="text-decoration-none recent-work card border-0 shadow-lg overflow-hidden" target='_blank' >
                                            <div className="overflow-hidden card mb-5 mx-5 m-sm-0 ">
                                                <img className="card-img-top" src={v.imgUrl} alt="https://www.wanted.co.kr/" />
                                                <div className="card-body">
                                                    <h5 className="card-title light-300 text-dark">{v.job}</h5>
                                                    <h5 className="card-title light-300 text-dark">{v.company}</h5>
                                                    <p className="card-text light-300 text-dark">{v.area} / {v.career}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        {/* <div class="col-md-4 mb-3">
                            <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
                                <img class="recent-work-img card-img" src="./assets/img/recent-work-01.jpg" alt="Card image" />
                                <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                                    <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                                        <h3 class="card-title light-300">Social Media</h3>
                                        <p class="card-text">Ullamco laboris nisi ut aliquip ex</p>
                                    </div>
                                </div>
                            </a>
                        </div> */}
                    </div>
                </div>
            </section>
            <section class="bg-secondary">
                <div class="container py-5">
                    <div class="row d-flex justify-content-center text-center">
                        {/* <div class="col-lg-2 col-12 text-light align-items-center"> */}
                            {/* <i class='display-1 bx bxs-box bx-lg'></i> */}
                        {/* </div> */}
                        {/* <div class="col-lg-7 col-12 text-light pt-2"> */}
                            <h4 class="h4 text-light light-300">채용 공고</h4>
                            <p class="text-light light-300">더 많은 공고는 채용 공고 게시판에서 확인해주세요.</p>
                        {/* </div> */}
                        {/* <div class="col-lg-3 col-12 pt-4"> */}
                            <Link to="/hiring/list" class="col-lg-3 btn btn-primary rounded-pill btn-block shadow px-4 py-2">채용 공고 게시판으로 이동</Link>
                        {/* </div> */}
                    </div>
                </div>
            </section>
            <section class="py-5 mb-5">
                <div class="container">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto justify-content-center" style={{ marginBottom: '3rem' }}>
                        <Category text={'All'} isActive={category} onClick={clickCategory} />
                        <Category text={'Busan'} isActive={category} onClick={clickCategory} />
                        <Category text={'Others'} isActive={category} onClick={clickCategory} />
                    </div>
                    <div class="row gy-5 g-lg-5 mb-4">
                        {
                            data.map((v) => {
                                return (
                                    <div className="col-sm-6 col-lg-4" style={{ marginBottom: '3rem' }} key={v.id}>
                                        <Link to={v.wantedUrl} className="text-decoration-none recent-work card border-0 shadow-lg overflow-hidden" target='_blank' >
                                            <div className="overflow-hidden card mb-5 mx-5 m-sm-0 ">
                                                <img className="card-img-top" src={v.imgUrl} alt="https://www.wanted.co.kr/" />
                                                <div className="card-body">
                                                    <h5 className="card-title light-300 text-dark">{v.job}</h5>
                                                    <h5 className="card-title light-300 text-dark">{v.company}</h5>
                                                    <p className="card-text light-300 text-dark">{v.area} / {v.career}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className="text-decoration-none text-primary light-300">
                                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        {/* <div class="col-md-4 mb-3">
                            <a href="#" class="recent-work card border-0 shadow-lg overflow-hidden">
                                <img class="recent-work-img card-img" src="./assets/img/recent-work-01.jpg" alt="Card image" />
                                <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                                    <div class="recent-work-content text-start mb-3 ml-3 text-dark">
                                        <h3 class="card-title light-300">Social Media</h3>
                                        <p class="card-text">Ullamco laboris nisi ut aliquip ex</p>
                                    </div>
                                </div>
                            </a>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Main;