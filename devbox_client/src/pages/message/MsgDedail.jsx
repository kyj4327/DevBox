import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Swal from "sweetalert2";

const MesDetail = () => {
    const navigate = useNavigate();
    const [msgData, setMsgData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [reciver, setReciver] = useState('');
    const [content, setContent] = useState('');

    async function get() {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`http://localhost:8080/msg/detail?id=${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log("API Response:", data);
        setMsgData(data);

        setTitle(data.title);
        setContent(data.content);
        setSender(data.sender);
        setReciver(data.reciver);

    }

    useEffect(() => {
        get();
    }, []);

     console.log("Message ID:", msgData.senderId);
    


    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5 ">쪽지</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">

                        <div className="contact-form row">
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">보낸사람</h2>
                                <p className="worksingle-footer py-3 text-muted light-200">
                                    <div className="floating">
                                        <input type={'text'} className="form-control form-control-lg light-300"
                                            value={sender} />
                                    </div>
                                </p>
                            </div>

                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">받은사람</h2>
                                <p className="worksingle-footer py-3 text-muted light-200">
                                    <div className="floating">
                                        <input type={'text'} className="form-control form-control-lg light-300"
                                            value={reciver} />
                                    </div>
                                </p>
                            </div>


                            <div className="contact-form row">
                                <div className="col-lg-6 mb-4">
                                    <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">제목</h2>
                                    <p className="worksingle-footer py-3 text-muted light-200">
                                        <div className="floating">
                                            <input type={'text'} className="form-control form-control-lg light-300"
                                                value={title} />
                                        </div>
                                    </p>
                                </div>


                                <h1 className="worksingle-heading h4 pb-4 light-300 typo-space-line">내용</h1>
                                <p className="worksingle-footer py-3 text-muted light-200">

                                    <textarea
                                        className="form-control form-control-lg light-300"
                                        rows="6"
                                        id="floatingtextarea"
                                        type="text"
                                        value={content}
                                    ></textarea>
                                </p>
                            </div>
                        </div>


                        <div className="row pt-3">
                            <div className="col text-start">

                                <Button text={'목록'} onClick={(e) => { e.preventDefault(); navigate('/message/list') }} />
                            </div>
                            <div className="col text-end">

                                <button type="submit" className="me-2 btn btn-secondary text-white px-md-4 px-2 py-md-3 py-1 radius-0 light-300"
                                    onClick={(e) => { e.preventDefault(); navigate(`/message/reply?id=${msgData.id}`); }}
                                >답장</button>
                                <Button
                                    text={'삭제'}
                                    onClick={async (e) => {
                                        e.preventDefault();

                                        const result = await Swal.fire({
                                            icon: "warning",
                                            title: "정말 삭제하시겠습니까?",
                                            text: "삭제 후에는 되돌릴 수 없습니다.",
                                            showCancelButton: true,
                                            confirmButtonText: "삭제",
                                            cancelButtonText: "취소",
                                            confirmButtonColor: "#d33",
                                            cancelButtonColor: "#3085d6",
                                        });

                                        if (result.isConfirmed) {
                                            try {
                                                const url = `http://localhost:8080/msg/delete?id=${msgData.id}`;
                                                const res = await fetch(url, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                });

                                                if (res.ok) {
                                                    Swal.fire("삭제 완료", "메시지가 삭제되었습니다.", "success");
                                                    navigate('/message/list');
                                                } else {
                                                    throw new Error('삭제 실패');
                                                }
                                            } catch (error) {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: '서버 오류',
                                                    text: '요청을 처리하는 중 오류가 발생했습니다.'
                                                });
                                            }
                                        }
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MesDetail;