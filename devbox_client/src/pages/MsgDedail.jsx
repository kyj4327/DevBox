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
        <div className="MesDetail">
            <div class="row pb-4">
                <div class="worksingle-comment-body col-md-8 m-auto">
                    <div class="d-flex">
                        <div class="comment-body">
                            <div class="comment-header d-flex justify-content-between ms-3">
                                <div class="header text-start">
                                    <h5 class="h5">보낸사람: {msgData.sender}</h5>
                                    <h5 class="h5">받는사람: {msgData.reciver}</h5>
                                </div>
                                <a href="#" class="text-decoration-none text-secondary"><i class='bx bxs-share me-2'></i>Reply</a>
                            </div>
                            <div class="comment-header d-flex justify-content-between ms-3">
                                <h5 class="h6">{msgData.title}</h5>
                            </div>
                            <div class="footer">
                                <div class="card-body border ms-3 light-300">
                                   {msgData.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button text={'목록'} onClick={(e) => {e.preventDefault(); navigate('/message/list') }} />
            <Button text={'삭제'} onClick={deleteState} />
        </div>
    );
};

export default MesDetail;