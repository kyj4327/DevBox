import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EduInfo = () => {
    const navigate = useNavigate();
    const [eduList, setEduList] = useState([]);

    async function get() {
        const res = await fetch(`http://localhost:8080/edu/list`);
        const data = await res.json();
        setEduList(data);
    }

    useEffect(() => {
        get();
    }, []);

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
                    {eduList.map((edu) => (
                        <a key={edu.id} href={`/detail?id=${edu.id}`} className="col-sm-6 col-lg-4 text-decoration-none project">
                            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                <img className="card-img-top" src={`${edu.logo}`} alt={edu.title} />
                                <div className="card-body">
                                    <h4 className="card-title light-300 text-dark">{edu.title}</h4>
                                    <p className="card-text light-300 text-dark">
                                        {edu.subtitle}
                                    </p>
                                    <span className="text-decoration-none text-primary light-300">
                                        Read more <i className='bx bxs-hand-right ms-1'></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
            <a href="/dm" className="dm">글쓰기</a>

        </div>

    );
};

export default EduInfo;