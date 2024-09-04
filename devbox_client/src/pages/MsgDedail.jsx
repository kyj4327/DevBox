import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const MesDetail = () => {
    const navigate = useNavigate();
    const [msgData, setMsgData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');


    async function get() {
        const res = await fetch(`http://localhost:8080/msg/detail?id=${id}`)
        const data = await res.json();
        console.log("API Response:", data);
        setMsgData(data);
    }

    useEffect(() => {
        get();
    }, []);

    const deleteState = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/msg/delete?Id=${msgData.id}`;
        await fetch(url, { method: 'DELETE' });
        alert('삭제가 완료되었습니다.');
        navigate('/message/list');
    }

    return (
        <div>
            <section class="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5 ">쪽지</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">

                        <div class="row pb-4">
                            <div class="worksingle-comment-body col-md-8 m-auto">
                                <div class="d-flex">
                                    <div class="comment-body">
                                        <div class="comment-header d-flex justify-content-between ms-3">
                                            <div class="header text-start">
                                                <h5 class="h5 my-4">보낸사람: {msgData.sender}</h5>
                                                <h5 class="h5 my-4">받는사람: {msgData.reciver}</h5>
                                            </div>
                                        </div>
                                        <div class="comment-header d-flex justify-content-between ms-3">
                                            <h5 class="h6 my-2">제목: {msgData.title}</h5>
                                        </div>
                                        <div class="footer">
                                            <div class="card-body border ms-3 light-300">
                                                {msgData.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row pt-5">
                                    <div className="col text-start">

                                        <Button text={'목록'} onClick={(e) => { e.preventDefault(); navigate('/message/list') }} />
                                    </div>
                                    <div className="col text-end">

                                        <Button text={'삭제'} onClick={deleteState} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MesDetail;