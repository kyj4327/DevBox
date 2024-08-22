import { useLocation, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import { useEffect, useState } from "react";

const DetailBasic = () => {
    const navigate = useNavigate();
    const [eduData, setEduData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    async function get() {
        const res = await fetch(`http://localhost:8080/edu/detail?id=${id}`);
        const data = await res.json();
        setEduData(data);
    }



    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            <Banner />
            <section class="container py-5">
                <div class="row justify-content-center pb-4">
                    <div class="col-lg-8">
                        <div id="templatemo-slide-link-target" class="card mb-3">
                            <img class="img-fluid border rounded" src={`http://localhost:8080/download?id=${eduData.id}`} alt="Card image cap" />
                        </div>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">과정요약</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>모집기간: {eduData.recruit}</li>
                            <li>교육기간: {eduData.eduterm}</li>
                            <li>모집인원: {eduData.people}</li>
                            <li>신청 ▶ <a href={eduData.link} target="_blank">{eduData.link}</a></li>
                        </p>
                    </div>
                </div>
                <div className="buttom">
                    <a href={eduData.link} target="_blank"><button>수강 신청</button></a>
                    <button>목록</button>
                    <button>수정</button>
                    <a className="nav-link" href="" id="delete"
                        onClick={async (e) => {
                            e.preventDefault();
                            const url = `http://127.0.0.1:8080/edu/delete?Id=${eduData.Id}`;
                            await fetch(url);
                            alert('삭제가 완료되었습니다.');
                            navigate('/');
                        }}>삭제</a>
                </div>


            </section>
        </div>
    );
};

export default DetailBasic;