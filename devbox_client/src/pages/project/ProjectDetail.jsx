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
import profilePic from "../../assets/img/profilePic.png";


const ProjectDetail = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [proData, setProData] = useState({});
    const [likeStatus, setLikeStatus] = useState({});
    const [refresh, setRefresh] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const domain = "http://localhost:8080";
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
    
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };

    async function getProjectDetail() {
        const res = await fetch(`${domain}/project/detail?id=${id}`);
        const data = await res.json();
        setProData(data);
    }

    const fetchUserLikeStatus = async () => {
        const token = localStorage.getItem('accessToken');
        const url = `${domain}/project/like/status`;
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (data.likedProjects) {
            const initialLikeStatus = {};
            data.likedProjects.forEach(project => {
                initialLikeStatus[project.proId] = {
                    liked: true,
                    count: project.likeCount
                };
            });
            setLikeStatus(initialLikeStatus);
        }
    };


    const likeCount = async (proId) => {
        const token = localStorage.getItem('accessToken');
        const url = `${domain}/project/like?id=${proId}`;
        const res = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (data.likeCount !== undefined && data.isLiked !== undefined) {
            setLikeStatus(prevStatus => ({

                ...prevStatus,
                [proId]: {
                    liked: data.isLiked, // 유저가 좋아요를 눌렀는지 여부
                    count: data.likeCount // 좋아요 수
                }
            }));
            setRefresh(prev => !prev);
        }

    };

    useEffect(() => {
        getProjectDetail();
        fetchUserLikeStatus();
    }, []);

    return (
        <div className="container-full">
            <div className="container py-5">
                <div className="container">
                    <h1 className="h2 semi-bold-600 text-center mt-2">프로젝트 자랑 게시판</h1>
                    <p
                        className="text-center light-300"
                        style={{ marginBottom: "0", padding: "0px" }}
                    >
                        맘껏 자랑해봐!
                    </p>
                </div>

                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h1 className="worksingle-heading h3 pb-3 light-300 typo-space-line">{proData.title}</h1>
                        
                    </div>
                </div>

                <section className="py-5">
                    <div className="mySwiper">
                        <Swiper
                            loop={proData.imgs && proData.imgs.length >= 2}
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
                                        src={`${domain}/project/download?id=${img.id}`}
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

                    <div className="card-body">
                        <div className='d-flex justify-content-center'>
                        <div className="d-flex">
                            <svg
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    likeCount(proData.id);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bx me-1"
                                viewBox="0 0 16 16"
                            >
                                {likeStatus[proData.id] ? (
                                    likeStatus[proData.id].liked ? (
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                    ) : (
                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                    )
                                ) : (

                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                )
                                }
                            </svg>
                            <span>{likeStatus[proData.id] !== undefined ? likeStatus[proData.id].count : proData.likeCount}</span>
                        </div>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                            <h4 className="worksingle-heading h3 pb-4 light-300 typo-space-line">프로젝트 소개</h4>
                            <div className="d-flex align-items-center text-muted pb-2 px-3">
                                <img
                                    src={profilePic}
                                    alt="profile"
                                    className="profile-image me-1"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                                <div className="d-flex flex-column px-2">
                                    <span>작성자: {proData.name}</span>
                                    <span>작성일: {formatDateTime(proData.time)}</span>
                                </div>
                            </div>
                            <div
                                className="worksingle-footer px-3 py-3 text-muted light-300 border border-3"
                                style={{
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                    maxHeight: '500px', // 원하는 높이로 조정
                                }}
                                dangerouslySetInnerHTML={{ __html: proData.coment }}
                            >
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <Button text={'목록'} onClick={() => { navigate('/project/list') }} />
                                </div>
                                <div className="col text-end">
                                    {proData.user && user && user.id === proData.user.id && (
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
                                                            const url = `${domain}/project/delete?Id=${proData.id}`;
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
        </div>
    );
};

export default ProjectDetail;
