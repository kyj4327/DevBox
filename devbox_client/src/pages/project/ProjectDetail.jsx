import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';

import '../../assets/css/styles.css';

import { FreeMode, EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import Swal from "sweetalert2";



const ProjectDetail = () => {
    const navigate = useNavigate();
    const [proData, setProData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    let iframe;
    async function get() {
        const res = await fetch(`http://localhost:8080/project/detail?id=${id}`)
        const data = await res.json();
        console.log("API Response:", data);
        setProData(data);
    }

    useEffect(() => {
        get();
    }, []);


    // useEffect(() => {
    //     if(iframe != null) {
    //         iframe.onload = function () {
    //             try { 
    //                 console.log("call");
    //                 console.dir(iframe);
    //                 // iframe.contentWindow.location.href; 
    //             }
    //             catch (err) { hide(); }
    //         }      
    //     }
    // }, [proData]);

    // function hide() {
    //     iframe.style.display = "none";
    //     console.log("hidden");
    // }


    return (
        <div>
            <div id="work_single_banner" class="bg-light w-100">
                <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 class="banner-heading h2 pb-5 typo-space-line-center">{proData.title}</h1>
                    </div>
                </div>
            </div>

            <section class="container py-5">
                <div className="mySwiper">
                    <Swiper
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        spaceBetween={20}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectCoverflow, Autoplay, Pagination, FreeMode]}
                        className="mySwiper"
                    >
                        {proData.imgs && proData.imgs.map((img, index) => (
                            <SwiperSlide key={img.id}>
                                <img
                                    className="img-fluid border rounded"
                                    src={`http://localhost:8080/project/download?id=${img.id}`}
                                    alt={`Slide ${index + 1}`}
                                    style={{ width: '100%', height: '500px' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {
                    proData.link && (
                        proData.link.startsWith('http://') || proData.link.startsWith('https://')
                    )
                        ?
                        <div class="row justify-content-center">
                            <div class="col-lg-8 pt-4 pb-4">
                                <div class="ratio ratio-16x9">
                                    <iframe id='iframe' class="embed-responsive-item" src={proData.link} allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                        :
                        null}

                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">프로젝트 내용</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>{proData.coment}</li>
                        </p>
                        <div className="row">
                            <div className="col text-start">
                                <Button text={'목록'} onClick={() => { navigate('/project/list') }} />
                            </div>
                            <div className="col text-end">
                                <button type="submit" className="me-2 btn btn-secondary text-white px-md-4 px-2 py-md-3 py-1 radius-0 light-300"
                                    onClick={(e) => { e.preventDefault(); navigate(`/project/update?id=${proData.id}`); }}
                                >수정</button>
                                <Button
                                    text={'삭제'}
                                    onClick={async (e) => {
                                        e.preventDefault();

                                        // SweetAlert2로 삭제 확인 창 띄우기
                                        const result = await Swal.fire({
                                            icon: "warning",
                                            title: "정말 삭제하시겠습니까?",
                                            text: "삭제 후에는 되돌릴 수 없습니다.",
                                            showCancelButton: true, // 취소 버튼 추가
                                            confirmButtonText: "삭제",
                                            cancelButtonText: "취소",
                                            confirmButtonColor: "#d33", // 삭제 버튼 색상 (빨간색)
                                            cancelButtonColor: "#3085d6", // 취소 버튼 색상 (파란색)
                                        });

                                        // 사용자가 '삭제' 버튼을 눌렀을 때만 삭제 요청 보내기
                                        if (result.isConfirmed) {
                                            const url = `http://localhost:8080/project/delete?Id=${proData.id}`;
                                            await fetch(url, { method: 'DELETE' });
                                            Swal.fire("삭제 완료", "프로젝트가 삭제되었습니다.", "success");
                                            navigate('/project/list');
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

export default ProjectDetail;