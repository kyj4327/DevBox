import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Category from "../../components/Category";
import { useUser } from "../../components/context/UserContext";

const EduInfo = (props) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const userRole = user ? user.role : null;

    const clickState = (e) => {
        e.preventDefault();
        props.clickState(e.target.textContent);
    };


    const progressMax = (recruit) => {
        const recruitDates = recruit.split(' ~ ');
        
        const startDate = new Date(recruitDates[0]);
        const end = new Date(recruitDates[1]);
        

        const timeDiff = end - startDate;
        const daysEnd = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        return daysEnd;
    };

    // progress의 현재 진행률 (남은일수)
    const progressNow = (daysLeft, daysEnd) => {
        const percentageRemaining = (daysLeft / daysEnd) * 100; // 남은 일수의 백분율 계산
        const percentageCompleted = 100 - percentageRemaining;
        return percentageCompleted;
    };

    const calculateDaysLeft = (recruit) => {
        const recruitDates = recruit.split(' ~ ');
        const today = new Date();
        const end = new Date(recruitDates[1]);
        const timeDiff = end - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysLeft;
    };

    return (
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2" style={{cursor: 'default'}}>교육 프로그램</h1>
                <p
                        className="text-center light-300"
                        style={{ marginBottom: "0", padding: "0px",cursor: 'default' }}
                    >
                        멀 보고 있냐~ 신청해야지!!
                    </p>
                <div className="row justify-content-center my-5">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                        <Category text={'모집중'} onClick={clickState} isActive={props.state} />
                        <Category text={'모집완료'} onClick={clickState} isActive={props.state} />
                    </div>
                </div>
                <div className="row projects gx-lg-5 justify-content-center">
                    {props.list && props.list.map((edu) => {
                        const daysLeft = calculateDaysLeft(edu.recruit);
                        const daysEnd = progressMax(edu.recruit);
                        const percentageCompleted = progressNow(daysLeft, daysEnd);
                        const isUrgent = daysLeft <= 3;

                        return (
                            <div key={edu.id} className="col-sm-6 col-lg-4">
                                <Link to={`/edu/detail?id=${edu.id}`} className="text-decoration-none">
                                    <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                                        <img className="card-img-top" src={`${edu.logo}`} alt={edu.logo} style={{ height: '130px', objectFit: 'contain' }} />
                                        <div className="card-body">
                                            {props.state !== '모집완료' && (
                                                <div style={{ display: 'flex'}}>
                                                    <div className="progress" role="progressbar" aria-label="Example 20px high"
                                                        style={{ width: '75%', height:'20px' }}
                                                        aria-valuenow={percentageCompleted}
                                                        aria-valuemin="0"
                                                        aria-valuemax={daysEnd}>
                                                        <div className={`progress-bar ${isUrgent ? 'bg-danger' : ''}`} style={{ width: `${percentageCompleted}%` }}></div>
                                                    </div>
                                                    <p className={`progress_red ${isUrgent ? 'text-danger' : ''}`} style={{ marginLeft: '1rem' }}>
                                                        {isUrgent ? '마감임박' : `${daysLeft}일 남음`}
                                                    </p>
                                                </div>
                                            )}
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
                        );
                    })}
            </div>
            {
                userRole === "ROLE_ADMIN"
                    ?
                    <div className="form-row pt-2">
                        <div className="col-md-12 col-10 text-end">
                            {user && (
                                <>
                                    <Button icon={'pen'} text={'등록'} onClick={() => { navigate('/edu/write') }} />
                                </>
                            )}
                        </div>
                    </div>
                    : ''
            }
        </div>
    );
};

export default EduInfo;
