import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useLocation} from 'react-router-dom';
import Swal from 'sweetalert2';

const UserContact = ({ nickname }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const domain = "http://localhost:8080";
    const [title, setTitle] = useState('');
    const [reciver, setReciver] = useState(nickname);
    const [content, setContent] = useState('');

    

    const handleDetail = async () => {

        const formData = new FormData();

        console.log("Reciver 값: ", nickname);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("reciver", nickname);

        const token = localStorage.getItem('accessToken');
        const url = `${domain}/msg/write`;
        const res = await fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData

        });
        const data = await res.json();
        if (data.code == 200) {
            Swal.fire({
                icon: "success",
                title: "전송 완료!!",
                text: "메시지가 성공적으로 발송되었습니다."
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.msg
            });
        }

    };

    const handleClose = (e) => {
        if (e) {
            e.preventDefault(); // 기본 동작을 방지합니다.
            e.stopPropagation(); // 이벤트 전파를 중지합니다.
        }
        setShowModal(false);
    }
    const handleShow = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <>
            <div className="dropdown " style={{display:'inline'}}>
                <button className="btn dropdown " data-bs-toggle="dropdown" aria-expanded="true" style={{padding:0}}>
                    {nickname}
                </button>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" onClick={handleShow}>쪽지 보내기</Link></li>
                </ul>
            </div>

            <Modal show={showModal} backdrop={'static'} keyboard={false}>
                <Modal.Header>
                    <div>
                        <Modal.Title>받는 사람: {nickname} </Modal.Title>
                    </div>
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
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>

                            <label htmlFor="message" className="form-label pt-3">메시지</label>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="6"
                                value={content}
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                onChange={(e) =>
                                    setContent(e.target.value)} // onChange 핸들러 수정
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

export default UserContact;
