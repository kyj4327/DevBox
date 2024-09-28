import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from './context/UserContext';
import WriteShort from './WriteShort';

const UserContact = ({ nickname }) => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const domain = "http://localhost:8080";
    const [title, setTitle] = useState('');
    const [reciver, setReciver] = useState(nickname);
    const [content, setContent] = useState('');

    const handleDetail = async () => {
        const formData = new FormData();


        formData.append("title", title);
        formData.append("content", content);
        formData.append("reciver", reciver);
        console.log(reciver);
        
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
            navigate('/project/list');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.msg
            });
        }

    };

    const handleClose = (e) => {
        setShowModal(false);
    }
    const handleShow = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <>
            <div class="dropdown ">
                <button className="btn  dropdown" data-bs-toggle="dropdown" aria-expanded="true">
                    {nickname}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onClick={handleShow}>쪽지 보내기</a></li>
                </ul>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div value ={reciver} onChange={(e) => { setReciver(e.target.value) }} >
                    <Modal.Title>받는 사람: {nickname} </Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            {/* <div className="form-group d-flex align-items-center">
                                <label htmlFor="title" className="form-label d-flex align-items-center mb-2 me-4">제목</label>
                                <textarea
                                    id="title"
                                    className="form-control"
                                    rows="1"
                                    value={title}
                                    style={{ }}
                                    onChange={(e) => setTitle(e.target.value)} // onChange 핸들러 수정
                                ></textarea>
                            </div> */}

                            <label htmlFor="message" className="form-label">메시지</label>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="6"
                                value={content}
                                onClick={(e) =>{
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
                        handleDetail();
                        // 여기서 쪽지 전송 로직 추가
                        alert('쪽지가 전송되었습니다!');
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
