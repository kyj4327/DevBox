import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import { useUser } from "../../src/components/context/UserContext";

const Main = () => {
  const domain = "https://www.devback.shop";

  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState("모집중");
  const [eduData, setEduData] = useState([]);
  const [category, setCategory] = useState("All");
  const [hiringData, setHiringData] = useState([]);
  const { user, loading } = useUser();

  useEffect(() => {
    async function get(page = 1) {
      try {
        const res = await fetch(`${domain}/edu/list/${state}?page=${page}`);
        const data = await res.json();
        setEduData(data.list);
        setCurrentPage(page);
      } catch (err) {
        setError(true);
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
        setError(true);
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
      <div className="banner-wrapper bg-light">
        <div className="banner-vertical-center-index container-fluid pt-5">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-wrap="true"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="py-5 row d-flex align-items-center">
                  <div className="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                    <h2 className="banner-heading h2 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                      DevBox에 오신것을 환영합니다.
                    </h2>
                    <p className="banner-body text-muted py-3 mx-0 px-0">
                      개발의 모든 것을 담은 상자처럼, 신입 개발자들이 필요한
                      모든 것이 있는 공간
                    </p>
                    <Link
                      to="https://github.com/kyj4327/DevBox"
                      className="banner-button btn rounded-pill btn-outline-primary btn-lg px-4"
                      role="button"
                      target="_blank"
                    >
                      <i
                        className="bx bxl-github"
                        style={{ marginRight: "3px" }}
                      ></i>
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
              {error
                ? ""
                : eduData.map((v) => {
                    return (
                      <div className="carousel-item" key={v.id}>
                        <div className="py-5 row d-flex align-items-center">
                          <div className="banner-content col-lg-8 col-8 offset-2 m-lg-auto text-left py-5 pb-5">
                            <h2 className="banner-heading h2 text-secondary display-3 mb-0 pb-5 mx-0 px-0 light-300 typo-space-line">
                              {v.title}
                            </h2>
                            <p className="banner-body text-muted py-3 mx-0 px-0">
                              {v.subtitle}
                            </p>
                            <Link
                              to={`/edu/detail?id=${v.id}`}
                              className="banner-button btn rounded-pill btn-outline-primary btn-lg px-4"
                              role="button"
                            >
                              Read more
                              <i className="bx bxs-hand-right ms-1"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
            <Link
              to="#carouselExampleIndicators"
              className="carousel-control-prev text-decoration-none text-primary h1"
              role="button"
              data-bs-slide="prev"
            >
              <i className="bx bx-chevron-left"></i>
              <span className="visually-hidden">Previous</span>
            </Link>
            <Link
              to="#carouselExampleIndicators"
              className="carousel-control-next text-decoration-none text-primary h1"
              role="button"
              data-bs-slide="next"
            >
              <i className="bx bx-chevron-right"></i>
              <span className="visually-hidden">Next</span>
            </Link>
          </div>
        </div>
      </div>
      {error ? (
        ""
      ) : (
        <>
          <section className="bg-secondary">
            <div className="container py-5"></div>
          </section>
          <section className="container overflow-hidden py-5">
            <div className="row gx-5 gx-sm-3 gx-lg-5 gy-lg-5 gy-3 pb-3 projects justify-content-center">
              <h4 className="h4 semi-bold-600 text-center">
                더 많은 채용 정보는{" "}
                <Link to="/hiring/list" className="semi-bold-600">
                  채용 공고 게시판
                </Link>
                에서 확인해 주세요.
              </h4>
              <div className="filter-btns shadow-md rounded-pill text-center col-auto justify-content-center">
                <Category
                  text={"All"}
                  isActive={category}
                  onClick={clickCategory}
                />
                <Category
                  text={"Busan"}
                  isActive={category}
                  onClick={clickCategory}
                />
                <Category
                  text={"Others"}
                  isActive={category}
                  onClick={clickCategory}
                />
              </div>
              <div className="row gy-5 g-lg-5 mb-4" style={{ marginTop: "0" }}>
                {hiringData.map((v) => {
                  return (
                    <div className="col-md-4 mb-3" key={v.id}>
                      <Link
                        to={v.wantedUrl}
                        className="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
                        target="_blank"
                      >
                        <img
                          className="service card-img"
                          src={v.imgUrl}
                          alt="https://www.wanted.co.kr/"
                          style={{ height: '265px' }}
                        />
                        <div className="service-work-vertical card-img-overlay d-flex align-items-end">
                          <div className="service-work-content text-left text-light">
                            <span className="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">
                              {v.company}
                            </span>
                            <p className="card-text">{v.job}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Main;
