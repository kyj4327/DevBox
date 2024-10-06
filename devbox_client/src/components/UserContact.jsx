import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useUser } from '../components/context/UserContext';

const UserContact = ({
    nickname,
    nicknameStyle = {},
    nicknameClassName = '',
}) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const domain = "https://www.devback.shop";
    const [title, setTitle] = useState('');
    const [reciver, setReciver] = useState(nickname);
    const [content, setContent] = useState('');

    const { user } = useUser();

    const handleDetail = async () => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인 후 이용해 주세요."
            });
            return;
        }

        const formData = new FormData();

        console.log("Reciver 값: ", nickname);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("reciver", nickname);

        const token = localStorage.getItem('accessToken');
        const url = `${domain}/msg/write`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });
            const data = await res.json();
            if (data.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "전송 완료!!",
                    text: "메시지가 성공적으로 발송되었습니다."
                });
                // 선택적으로 폼 필드 초기화
                setTitle('');
                setContent('');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.msg
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            Swal.fire({
                icon: "error",
                title: "전송 실패",
                text: "메시지를 보내는 중 오류가 발생했습니다."
            });
        }
    };

    const handleClose = (e) => {
        if (e) {
            e.preventDefault(); // 기본 동작을 방지
            e.stopPropagation(); // 이벤트 전파 중지
        }
        setShowModal(false);
    }

    const handleShow = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인 후 이용해 주세요."
            });
            return;
        }

        setShowModal(true);
    }

    return (
        <>
            <div className="dropdown" style={{ display: 'inline' }}>
                <button
                    className={`btn dropdown ${nicknameClassName}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ padding: 0, ...nicknameStyle }}
                >
                    {nickname}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" onClick={handleShow}>
                            쪽지 보내기
                        </Link>
                    </li>
                </ul>
            </div>

            <Modal 
                show={showModal} 
                onHide={handleClose} 
                backdrop={true}   
                keyboard={true}    
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        받는 사람: <span className={nicknameClassName}>{nickname}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <div className="form-group align-items-center">
                                <label htmlFor="title" className="form-label">제목</label>
                                <input
                                    id="title"
                                    className="form-control"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <label htmlFor="message" className="form-label pt-3">메시지</label>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="6"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="outline-primary" onClick={() => {
                        if (!title || !content) {
                            Swal.fire({
                                icon: "warning",
                                title: "입력 오류",
                                text: "제목, 메시지 입력해주세요."
                            });
                            return;
                        }
                        handleDetail();
                        handleClose();
                    }}>
                        전송
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

UserContact.propTypes = {
    nickname: PropTypes.string.isRequired,
    nicknameStyle: PropTypes.object,
    nicknameClassName: PropTypes.string,
};

export default UserContact;