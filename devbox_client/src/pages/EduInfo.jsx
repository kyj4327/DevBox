import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Category from "../components/Category";

const EduInfo = (props) => {
    const navigate = useNavigate();
    console.log(props.list);

    const clickState = (e) => {
        e.preventDefault();
        props.clickState(e.target.textContent);

    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">개발 교육 정보</h1>
                <div className="row justify-content-center my-5">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                        <Category text={'모집중'} onClick={clickState} isActive={props.state} />
                        <Category text={'모집완료'} onClick={clickState} isActive={props.state} />
                    </div>
                </div>
                <div className="row projects gx-lg-5">
                    {props.list && props.list.map((edu) => (
                        <div key={edu.id} className="col-sm-6 col-lg-4">
                            <Link to={`/edu/detail?id=${edu.id}`} className="text-decoration-none" >
                                <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                    <img className="card-img-top" src={`${edu.logo}`} alt={edu.title} style={{ height: '130px', objectFit: 'contain' }} />
                                    <div className="card-body">
                                        <h5 className="card-title light-300 text-dark">{edu.title}</h5>
                                        <p className="card-text light-300 text-dark">
                                            {edu.subtitle}
                                        </p>
                                        <span className="text-decoration-none text-primary light-300">
                                            Read more <i className='bx bxs-hand-right ms-1'></i>
                                        </span>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">

                        <Button text={'글쓰기'} onClick={() => { navigate('/edu/maneger') }} />
                    </div>
                </div>
            </div>
        </section>

    );
};

export default EduInfo;