import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Category from "../components/Category";

const MsgList = (props) => {
    const navigate = useNavigate();

    const [likeStatus, setLikeStatus] = useState({});

    const like = async (msgId) => {
        const url = `http://localhost:8080/msg/like?id=${msgId}`;
        const res = await fetch(url, {
            method: 'GET'
            
        });
        const data = await res.json();
        console.log(data);
        
        props.setRefresh(); // 부모 컴포넌트 refresh상태 반전

    };

    // 상태 필터링 함수
    const clickState = (e) => {
        e.preventDefault();
        props.clickState(e.target.textContent);
    };

    // 날짜와 시간을 원하는 형식으로 변환하는 함수
    const formatDateTime = (sendTime) => {
        const date = new Date(sendTime.replace(" ", "T"));
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // 오전/오후 표시
        }).format(date);
    };

    return (
        <div className="MsgList">
            <h2 style={{ textAlign: 'center', marginTop: '2em' }}>쪽지 보관함</h2>

            <div className="row justify-content-center my-5">
                <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                    <Category isActive={props.category} text={'받은쪽지'} onClick={clickState} />
                    <Category isActive={props.category} text={'보낸쪽지'} onClick={clickState} />
                </div>
            </div>

            <div className="pricing-horizontal bg-white">
                {props.list && props.list.map((msg) => {
                    // 메시지의 좋아요 상태를 상태에서 가져옵니다.
                    const isLiked = likeStatus[msg.id] !== undefined ? likeStatus[msg.id] : msg.like;
                    const msgStyle = msg.readTime ? { backgroundColor: '#f0f0f0'} : {};
                    return (
                        <div  key={msg.id} className="pricing-list mt-3 row-10 col-10 m-auto shadow-sm rounded-3" style={msgStyle}>
                            <Link to={`/message/detail?id=${msg.id}`} className="col-sm-6 col-lg-4 text-decoration-none project">
                                <div className="row p-3">
                                    <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                    <i className={`display-3 bx ${msg.readTime ? 'bx-envelope-open' : 'bx-envelope'}`}></i>

                                    </div>
                                    <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                        <ul className="list-unstyled text-center light-300">
                                            <li className="h5 semi-bold-600 mb-0 mt-3">{msg.title}</li>
                                            <li>{msg.sender}</li>
                                            <li>{formatDateTime(msg.sendTime)}</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // 클릭 이벤트가 부모 요소로 전파되는 것 상위 컴포넌트에 영향을 주지 않음
                                                e.preventDefault();
                                                //<a> 태그나 <form> 안에 있는 요소라면 기본 동작(링크 이동 또는 폼 제출)을 방지
                                                like(msg.id)
                                            }}
                                            className={`bx-md bx ${isLiked ? 'bxs-heart' : 'bx-heart'} me-1`}
                                        ></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className="form-row pt-5">
                <div className="col-md-11 col-10 text-end">
                    <Button text={'쪽지'} onClick={(e) => {
                        e.preventDefault();
                        navigate('/message/write');
                    }} />
                </div>
            </div>
            
        </div>
    );
};

export default MsgList;
