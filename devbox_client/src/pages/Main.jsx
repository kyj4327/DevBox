import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../components/Category";

const Main = () => {
    const domain = "http://localhost:8080";

    const [error, setError] = useState(false); // 오류 상태 추가
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState('모집중');
    const [eduData, setEduData] = useState([]);
    const [category, setCategory] = useState('All');
    const [hiringData, setHiringData] = useState([]);

    useEffect(() => {
        async function get(page = 1) {
            try {
                const res = await fetch(`${domain}/edu/list/${state}?page=${page}`);
                const data = await res.json();
                setEduData(data.list);
                setCurrentPage(page);
            } catch (err) {
                setError(true); // 오류 발생 시 true로 설정
            }
        }
        get(currentPage);
    }, []);

    useEffect(() => {
        async function get(page = 1) {
            try {
                const url = `${domain}/hiring/list/${category}?page=${page}`;
                const res = await fetch(url);
                const data = await res.json();
                const listData = data.slice(0, -1);
                setHiringData(listData);
                setCurrentPage(page);
            } catch (err) {
                setError(true); // 오류 발생 시 true로 설정
            }
        }
        get(currentPage);
    }, [category]);

    const clickCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.textContent);
        setCurrentPage(1);
    };

    return (
        <>
            <div class="banner-wrapper bg-light">
                {/* <div id="index_banner" class="banner-vertical-center-index container-fluid pt-5"> */}
                <div class="banner-vertical-center-index container-fluid pt-5">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-wrap="true">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="py-5 row d-flex align-items-center">
                                    <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                        <h2 class="banner-heading h2 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                                            DevBox에 오신것을 환영합니다.
                                        </h2>
                                        <p class="banner-body text-muted py-3 mx-0 px-0">
                                            개발의 모든 것을 담은 상자처럼, 신입 개발자들이 필요한 모든 것이 있는 공간
                                        </p>
                                        <Link to="https://github.com/kyj4327/DevBox" class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" role="button" target="_blank">
                                            <i class='bx bxl-github' style={{ marginRight: '3px' }}></i>GitHub
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {
                                error ? '' : (
                                    eduData.map((v) => {
                                        return (
                                            <div class="carousel-item" key={v.id}>
                                                <div class="py-5 row d-flex align-items-center">
                                                    <div class="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                                                        <h2 class="banner-heading h2 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                                                            {v.title}
                                                        </h2>
                                                        <p class="banner-body text-muted py-3 mx-0 px-0">
                                                            {v.subtitle}
                                                        </p>
                                                        <Link to={`/edu/detail?id=${v.id}`} class="banner-button btn rounded-pill btn-outline-primary btn-lg px-4" role="button">
                                                            Read more<i className='bx bxs-hand-right ms-1'></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                        <Link to="#carouselExampleIndicators" class="carousel-control-prev text-decoration-none text-primary h1" role="button" data-bs-slide="prev">
                            <i class='bx bx-chevron-left'></i>
                            <span class="visually-hidden">Previous</span>
                        </Link>
                        <Link to="#carouselExampleIndicators" class="carousel-control-next text-decoration-none text-primary h1" role="button" data-bs-slide="next">
                            <i class='bx bx-chevron-right'></i>
                            <span class="visually-hidden">Next</span>
                        </Link>

                    </div>
                </div>
            </div>
            {
                error ? '' : (
                    <>
                        <section class="bg-secondary">
                            <div class="container py-5">
                            </div>
                        </section>
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
                                        hiringData.map((v) => {
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
                )
            }
        </>
    );
};

export default Main;