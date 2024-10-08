import { useEffect, useState } from "react";
import WriteShort from "../../components/WriteShort";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../components/context/UserContext";
import QuillEditor from "../../components/QuillEditor";

const MesReply = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const domain = "https://www.devback.shop";
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [reciver, setReciver] = useState('');
    const [content, setContent] = useState('');
    const [MsgData, setMsgData] = useState({});


    const handleDetail = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            Swal.fire({
                icon: "warning",
                title: "메시지를 입력하지 않았습니다.",
                text: "그래도 전송하시겠습니까?",
                showCancelButton: true,
                confirmButtonText: "전송",
                confirmButtonColor: "#3085d6",
                cancelButtonText: "취소",
                cancelButtonColor: "#d33"
            });
            return;
        }

        const formData = new FormData();


        formData.append("title", title);
        formData.append("content", content);
        formData.append("reciver", reciver);

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
            navigate('/message/list');
        } else {
            Swal.fire({
                icon: "error",
                title: "전송 중 오류가 발생했습니다.",
                text: "다시 시도해 주세요."
            });
        }

    };

    async function get() {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${domain}/msg/reply?id=${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await res.json();

        // Reciver와 Sender가 올바르게 들어오는지 확인
        setReciver(data.sender); // 서버에서 받은 사람이 원래 보낸 사람
        setSender(data.reciver); // 로그인한 사용자가 답장을 보내는 사람이므로 sender는 유저의 닉네임으로 설정

    }


    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5" style={{cursor: 'default'}}>답장</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>보낼분</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="form-floating">
                                        <input type='text' className="form-control form-control-lg light-300" id='sender' name='sender' placeholder='보낼분'
                                            value={sender} onChange={(e) => { setSender(e.target.value) }} style={{cursor: 'default'}} readOnly />
                                        <label htmlFor="floatingsubject light-300">보낼분</label>
                                    </div>
                                </p>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>받을분</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="form-floating">
                                        <input type='text' className="form-control form-control-lg light-300" id='reciver' name='reciver' placeholder='받을분'
                                            value={reciver} onChange={(e) => { setReciver(e.target.value) }} style={{cursor: 'default'}} readOnly />
                                        <label htmlFor="floatingsubject light-300">받을분</label>
                                    </div>
                                </p>
                            </div>
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />

                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>작성 내용</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div className=" form-floating">
                                    <QuillEditor
                                        placeholder="내용"
                                        value={content}
                                        onChange={setContent}
                                        height="450px"
                                    />
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">

                        <Button icon={'paper-plane'}  text={'보내기'} onClick={handleDetail} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MesReply;
