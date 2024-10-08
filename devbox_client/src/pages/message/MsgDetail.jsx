import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Swal from "sweetalert2";

const MsgDetail = () => {
    const navigate = useNavigate();
    const [msgData, setMsgData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const kind = category == '받은쪽지' ? 0 : 1;
    const domain = "https://www.devback.shop";
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [reciver, setReciver] = useState('');
    const [content, setContent] = useState('');
    
    

    async function get() {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${domain}/msg/detail?id=${id}&kind=${kind}`, {
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
        setSender(data.sender ? data.sender : "탈퇴한 회원");
        setReciver(data.reciver);

    }

    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5" style={{cursor: 'default'}}>쪽지</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">

                        <div className="contact-form row">
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>보낼분</h2>
                                <p className="worksingle-footer py-3 text-muted light-200">
                                    <div className="floating">
                                        <input type={'text'} className="form-control form-control-lg light-300"
                                            value={sender}  onFocus={(e) => e.target.blur()} style={{cursor: 'default'}}/>
                                    </div>
                                </p>
                            </div>

                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>받을분</h2>
                                <p className="worksingle-footer py-3 text-muted light-200">
                                    <div className="floating">
                                        <input type={'text'} className="form-control form-control-lg light-300"
                                            value={reciver}  onFocus={(e) => e.target.blur()} style={{cursor: 'default'}} />
                                    </div>
                                </p>
                            </div>


                            <div className="contact-form row">
                                <div className="col-lg-6 mb-4">
                                    <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>제목</h2>
                                    <div className="worksingle-footer py-3 text-muted light-200">
                                        <div className="floating">
                                            <input type={'text'} className="form-control form-control-lg light-300"
                                                value={title}  onFocus={(e) => e.target.blur()} style={{cursor: 'default'}} />
                                        </div>
                                    </div>
                                </div>


                                <h1 className="worksingle-heading h4 pb-4 light-300 typo-space-line" style={{cursor: 'default'}}>내용</h1>
                                <div className="floating">

                                    <p className="form-control form-control-lg light-300"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    >
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="row pt-3">
                            <div className="col text-start">

                                <Button icon={'list'} text={'목록'} onClick={(e) => { e.preventDefault(); navigate('/message/list') }} />
                            </div>
                            <div className="col text-end">
                                {sender !== "탈퇴한 회원" && (
                                    <span className="me-2">

                                    <Button
                                        icon={'reply'}
                                        text={'답장'}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/message/reply?id=${msgData.id}`);
                                        }}
                                        />
                                        </span>
                                        
                                )}
                                <Button
                                    icon={'trash'}
                                    text={'삭제'}
                                    onClick={async (e) => {
                                        e.preventDefault();

                                        const result = await Swal.fire({
                                            icon: "warning",
                                            title: "삭제하시겠습니까?",
                                            text: "삭제 후에는 되돌릴 수 없습니다.",
                                            showCancelButton: true,
                                            confirmButtonText: "삭제",
                                            confirmButtonColor: "#d33",
                                            cancelButtonText: "취소",
                                            cancelButtonColor: "#3085d6"
                                        });

                                        if (result.isConfirmed) {
                                            try {
                                                const token = localStorage.getItem('accessToken');
                                                const url = `${domain}/msg/delete?id=${msgData.id}`;
                                                const res = await fetch(url, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                    headers: {
                                                        "Authorization": `Bearer ${token}`,
                                                    },
                                                });

                                                if (res.ok) {
                                                    Swal.fire({
                                                        icon: "success",
                                                        title: "삭제되었습니다."
                                                    }).then(() => {
                                                        navigate('/message/list');
                                                    });
                                                } else {
                                                    throw new Error('삭제 실패');
                                                }
                                            } catch (error) {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: '삭제 중 오류가 발생했습니다.',
                                                    text: '다시 시도해 주세요.'
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

export default MsgDetail;