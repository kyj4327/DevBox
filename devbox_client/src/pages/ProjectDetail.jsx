import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const
    ProjectDetail = (props) => {
        const navigate = useNavigate();
        const [proData, setProData] = useState({});
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');

        async function get() {
            const res = await fetch(`http://localhost:8080/pro/detail?id=${id}`)
            const data = await res.json();
            console.log("API Response:", data);
            setProData(data);
        }

        useEffect(() => {
            get();
        }, []);

        return (
            <div>

                <div id="work_single_banner" class="bg-light w-100">
                    <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                        <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                            <h1 class="banner-heading h2 pb-5 typo-space-line-center">{proData.title}</h1>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center pb-4">
                    <div class="col-lg-8">
                        <div id="templatemo-slide-link-target" class="card mb-3">
                            <img id="mainImage" class="img-fluid border rounded" src={`http://localhost:8080/pro/download?id=${proData.imgs ? proData.imgs[0].id : ''}`} alt="Card image cap"></img>
                        </div>
                        <div class="worksingle-slide-footer row">

                            <div class="col-1 align-self-center">
                                <a href="#multi-item-example" role="button" data-bs-slide="prev">
                                    <i class='bx bxs-chevron-left bx-sm text-dark'></i>
                                </a>
                            </div>

                            <div id="multi-item-example" class="col-10 carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner" role="listbox">

                                    <div class="carousel-item active">
                                        <div class="row">
                                            {proData.imgs && proData.imgs.map((img) => {
                                                return (
                                                    <div class="col">
                                                        <a class="templatemo-slide-link" onClick={(e) => {
                                                            e.preventDefault();
                                                            const mainImage = document.getElementById('mainImage');
                                                            mainImage.src = `http://localhost:8080/pro/download?id=${img.id}`;

                                                        }}>
                                                            <img class="img-fluid border rounded" src={`http://localhost:8080/pro/download?id=${img.id}`} alt="Product Image"></img>
                                                        </a>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div class="col-1 align-self-center text-end">
                                <a href="#multi-item-example" role="button" data-bs-slide="next">
                                    <i class='bx bxs-chevron-right bx-sm text-dark'></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-lg-8 pt-4 pb-4">
                        <div class="ratio ratio-16x9">
                            <iframe class="embed-responsive-item" src={proData.link} allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">프로젝트 자랑</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>{proData.coment}</li>
                        </p>
                    </div>
                </div>
                <a href="/project/list">목록</a>
                <a href="" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/project/update?id=${proData.id}`)
                }}>수정</a>
                <a href=""
                    onClick={async (e) => {
                        e.preventDefault();
                        const url = `http://localhost:8080/pro/delete?Id=${proData.id}`;
                        await fetch(url, { method: 'DELETE' });
                        alert('삭제가 완료되었습니다.');
                        navigate('/project/list');
                    }}>삭제</a>
            </div>

        );
    };

export default ProjectDetail;