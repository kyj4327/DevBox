import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
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
        if (data.code == 200) {
            navigate('/message/list');
        }
    };

    // 상태 필터링 함수
    const clickState = (e) => {
        e.preventDefault();
        props.clickState(e.target.textContent);
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

            <div className="pricing-horizontal row col-10 m-auto d-flex shadow-sm rounded overflow-hidden bg-white">
                {props.list && props.list.map((msg) => {
                    // 메시지의 좋아요 상태를 상태에서 가져옵니다.
                    const isLiked = likeStatus[msg.id] !== undefined ? likeStatus[msg.id] : msg.like;
                    const msgStyle = msg.readTime ? { backgroundColor: '#f0f0f0' } : {};
                    return (
                        <div key={msg.id} className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5" style={msgStyle}>
                            <a href={`/message/detail?id=${msg.id}`} className="col-sm-6 col-lg-4 text-decoration-none project">
                                <div className="row p-2">
                                    <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                        <i className="display-3 bx bx-package"></i>
                                    </div>
                                    <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                        <ul className="list-unstyled text-center light-300">
                                            <li className="h5 semi-bold-600 mb-0 mt-3">{msg.title}</li>
                                            <li>{msg.sender}</li>
                                            <li>{msg.sendTime}</li>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                            <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                                <div
                                    onClick={() => like(msg.id)}
                                    className={`bx-fw bx ${isLiked ? 'bxs-heart' : 'bx-heart'} me-1`}
                                    style={{ cursor: 'pointer' }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Button text={'쪽지'} onClick={(e) => {
                e.preventDefault();
                navigate('/message/write');
            }} />
        </div>
    );
};

export default MsgList;
