import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Category from "../../components/Category";

const MsgList = (props) => {
    const navigate = useNavigate();
    const domain = "https://www.devback.shop";
    const [likeStatus, setLikeStatus] = useState({});

    const like = async (msgId, type) => {
        const token = localStorage.getItem('accessToken');
        let urlType = type;

        // 카테고리에 따라 API에서 처리할 타입 결정
        if (type === '중요쪽지') {
            urlType = 'important'; // 중요 쪽지에 대한 타입 추가
        } else {
            urlType = type === '받은쪽지' ? 'received' : 'sent';
        }

        const url = `${domain}/msg/like?id=${msgId}&type=${urlType}`;

        const res = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await res.json();
        props.setRefresh(); // 부모 컴포넌트 refresh 상태 반전

        if (data.like !== undefined) {
            setLikeStatus(prevStatus => ({
                ...prevStatus,
                [msgId]: data.like
            }));
        } else if (data.error) {
        }
    };

    // 상태 필터링 함수
    const clickState = (e) => {
        e.preventDefault();
        props.clickState(e.target.textContent);
    };

    // 날짜와 시간을 원하는 형식으로 변환하는 함수
    const formatDateTime = (sendTime) => {
        if (sendTime) {
            const date = new Date(sendTime.replace(" ", "T"));
            return new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // 오전/오후 표시
            }).format(date);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="h2 semi-bold-600 text-center mt-2" style={{ cursor: 'default' }}>쪽지 보관함</h1>

            <div className="row justify-content-center my-5">
                <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                    <Category isActive={props.category} text={'받은쪽지'} onClick={clickState} />
                    <Category isActive={props.category} text={'보낸쪽지'} onClick={clickState} />
                    <Category isActive={props.category} text={'중요쪽지'} onClick={clickState} />
                </div>
            </div>

            <div className="pricing-horizontal bg-white">
                {props.list && props.list.map((msg) => {
                    // 메시지의 좋아요 상태를 상태에서 가져옵니다.
                    const isLiked = likeStatus[msg.id] !== undefined ? likeStatus[msg.id] : msg.like;
                    const msgStyle = msg.readTime ? { backgroundColor: '#f0f0f0' } : {};
                    return (
                        <div key={msg.id} className="pricing-list mt-3 row-10 col-10 m-auto shadow-sm rounded-3" style={msgStyle}>
                            <Link to={`/message/detail?id=${msg.id}&category=${props.category}`} className="col-sm-6 col-lg-4 text-decoration-none project">
                                <div className="row p-3">
                                    <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                        <i className={`display-3 bx ${msg.readTime ? 'bx-envelope-open' : 'bx-envelope'}`}></i>
                                        <li style={{ fontSize: '20px', listStyle: 'none', marginTop: '5px' }}>보낸 사람: {msg.sender}</li>
                                    </div>
                                    <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                        <ul className="list-unstyled text-center light-300">
                                            <li className="h2 semi-bold-600 mb-2 mt-3">{msg.title}</li>
                                            <li>보낸 시간: {formatDateTime(msg.sendTime)}</li>
                                            <li>{msg.readTime ? `읽은 시간: ${formatDateTime(msg.readTime)}` : formatDateTime(msg.readTime)}</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-list-footer col-3 text-center m-auto align-items-center">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                like(msg.id, props.category); // 카테고리 그대로 전달
                                            }}
                                            className={`bx-md bx ${isLiked ? 'bxs-heart' : 'bx-heart'}`}
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
                    <Button icon={'paper-plane'} text={'쪽지 쓰기'} onClick={(e) => {
                        e.preventDefault();
                        navigate('/message/write');
                    }} />
                </div>
            </div>
        </div>
    );
};

export default MsgList;