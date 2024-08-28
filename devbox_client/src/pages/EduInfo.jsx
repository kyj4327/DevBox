import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EduInfo = (props) => {
    console.log(props.list);
    
    const clickState = (e) => {
        e.preventDefault();
        props.clickState(e.target.textContent);
        
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '2em' }}>개발 직군 정보</h2>
            <section className="container py-5">
                <div className="row justify-content-center my-5">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                    
                        <a className={`filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 ${props.state === '모집중' ? 'active' : ''}`}
                        data-filter=".project" href="" onClick={clickState}>모집중</a>
                        <a className={`filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 ${props.state === '모집완료' ? 'active' : ''}`}
                        data-filter=".business" href=""onClick={clickState}>모집완료</a>
                    </div>
                </div>
                <div className="row projects gx-lg-5">
                    {props.list && props.list.map((edu) => (
                        <a key={edu.id} href={`/edu/detail?id=${edu.id}`} className="col-sm-6 col-lg-4 text-decoration-none project">
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
            <a href="/edu/maneger" className="dm">글쓰기</a>

        </div>

    );
};

export default EduInfo;