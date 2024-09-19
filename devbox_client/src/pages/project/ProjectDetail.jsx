import { useEffect, useState } from "react";
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
import { useUser } from "../../components/context/UserContext";

const ProjectDetail = () => {
    const { user } = useUser();  // 로그인된 사용자 정보와 이를 설정하는 함수를 사용합니다.
    const navigate = useNavigate();
    const [proData, setProData] = useState({});
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    async function getProjectDetail() {
        const res = await fetch(`http://localhost:8080/project/detail?id=${id}`);
        const data = await res.json();
        console.log("Project Detail API Response:", data);
        setProData(data);
    }

    async function getUserInfo() {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('http://localhost:8080/api/user/me', {
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            }, 
        });
        const data = await res.json();
        console.log("User Info API Response:", data);
        setUserData(data); // 로그인된 사용자 정보를 상태에 저장
    }

    useEffect(() => {
        getProjectDetail();
        getUserInfo();
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "로그인 필요",
                text: "로그인이 필요합니다."
            });
            navigate('/auth');
          }
    }, [id,user, navigate]);

    return (
        <div>
            <div id="work_single_banner" className="bg-light w-100">
                <div className="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div className="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 className="banner-heading h2 pb-5 typo-space-line-center">{proData.title}</h1>
                    </div>
                </div>
            </div>

            <section className="container py-5">
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
                        <div className="row justify-content-center">
                            <div className="col-lg-8 pt-4 pb-4">
                                <div className="ratio ratio-16x9">
                                    <iframe id='iframe' className="embed-responsive-item" src={proData.link} allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                        :
                        null}

                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">프로젝트 내용</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>{proData.coment}</li>
                        </p>
                        <div className="row">
                            <div className="col text-start">
                                <Button text={'목록'} onClick={() => { navigate('/project/list') }} />
                            </div>
                            <div className="col text-end">
                            {proData.user && userData.id === proData.user.id && (
                                    <>
                                        <button
                                            type="button"
                                            className="me-2 btn btn-secondary text-white px-md-4 px-2 py-md-3 py-1 radius-0 light-300"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/update?id=${proData.id}`);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <Button
                                            text={'삭제'}
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                if (!user) {
                                                    Swal.fire({
                                                        icon: "error",
                                                        title: "로그인 필요",
                                                        text: "로그인이 필요합니다."
                                                    });
                                                    navigate('/auth');
                                                    return;
                                                }
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

                                                const token = localStorage.getItem('accessToken');
                                                if (result.isConfirmed) {
                                                    try {
                                                        const url = `http://localhost:8080/project/delete?Id=${proData.id}`;
                                                        const res = await fetch(url, {
                                                            method: 'DELETE',
                                                            credentials: 'include',
                                                            headers: {
                                                                'Authorization': `Bearer ${token}`
                                                            },
                                                        });

                                                        if (res.ok) {
                                                            Swal.fire("삭제 완료", "프로젝트가 삭제되었습니다.", "success");
                                                            navigate('/project/list');
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
