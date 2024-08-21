import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const DetailManager = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [img, setImg] = useState('');
    const [recruit, setRecruit] = useState('');
    const [eduterm, setEduterm] = useState('');
    const [people, setPeople] = useState('');
    const [link, setLink] = useState('');
    const [start, setStart] =  useState('');
    const [start2, setStart2] =  useState('');
    const [end, setEnd] =  useState('');
    const [end2, setEnd2] =  useState('');

    const handleDetail = async () => {
        const url = 'http://127.0.0.1:8080/edu';
        const res = await fetch(url, {
            method: 'post',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify({ title: title, subtitle: subtitle, recruit:  start + " ~ " + end, eduterm:  start2 + " ~ " + end2, people:people, link:link })
        });
        const data = await res.json();
        if (data.code == 200) {
            navigate('/');
        } else {
            alert(data.msg);
        }
        
    };

    return (
        <div>
            <div id="work_single_banner" class="bg-light w-100">
                <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 class="banner-heading h2 pb-5 typo-space-line-center">제목 :  </h1>
                        <div className="title">
                            <input
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                            />
                        </div>
                        <p class="banner-footer light-300">
                            소제목:
                        </p>
                        <div className="subtitle">
                            <input
                                name="subtitle"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                type="text"
                            />
                        </div>
                        <img src=''></img>
                    </div>
                </div>
            </div>
            <section class="container py-5">
                <div class="row justify-content-center pb-4">
                    <div class="col-lg-8">
                        <div id="templatemo-slide-link-target" class="card mb-3">
                            <img class="img-fluid border rounded" src="http://edu.busanit.or.kr/image/5f2b1ec7-c058-44fe-b720-68ad0a636129.png" alt="Card image cap" />
                        </div>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">과정요약</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>모집기간: </li>
                            <div className="recruit">
                                <input
                                    name="start"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    type="date"
                                />
                                <input
                                    name="end"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <li>교육기간: </li>
                            <div className="eduterm">
                            <input
                                    name="start2"
                                    value={start2}
                                    onChange={(e) => setStart2(e.target.value)}
                                    type="date"
                                />
                                <input
                                    name="end2"
                                    value={end2}
                                    onChange={(e) => setEnd2(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <li>모집인원: </li>

                            <div className="people">
                                <input
                                    name="people"
                                    value={people}
                                    onChange={(e) => setPeople(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <li>링크: </li>

                            <div className="link">
                                <input
                                    name="link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </p>
                    </div>
                </div >
                <div className="buttom">
                    <button>삭제</button>
                    <button onClick={handleDetail}
                    className="btn" >올리기</button>
                </div>


            </section >
        </div >
    );
};

export default DetailManager;