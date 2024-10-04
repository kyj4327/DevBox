import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import '../../assets/css/styles.css';
import { FreeMode, EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import Swal from "sweetalert2";
import { useUser } from "../../components/context/UserContext";
import profilePic from "../../assets/img/profilePic.png";
import UserContact from "../../components/UserContact";

const ProjectDetail = () => {

    const { user } = useUser();
    const navigate = useNavigate();
    const [proData, setProData] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [likeStatus, setLikeStatus] = useState({});
    const [refresh, setRefresh] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const domain = "http://localhost:8080";

    const [showSwiper, setShowSwiper] = useState(false);


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
        setShowSwiper(true);
        if (data && data.name) {
            console.log(data.name);
        }
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

    const handleLikeClick = (e, proId) => {
        e.stopPropagation();
        e.preventDefault();
        likeCount(proId); // 좋아요 상태 업데이트
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
                        {showSwiper && (
                            proData.imgs.length > 1 ? (
                                <Swiper
                                    loop={proData.imgs.length > 3}
                                    effect={proData.imgs.length >= 4 ? 'coverflow' : 'slide'}  // 4장 이상일 때 coverflow 사용
                                    grabCursor={true}
                                    slidesPerView={proData.imgs.length >= 4 ? 3 : 1}  // 4장 이상일 때는 3장, 그 미만은 1장씩 보이게 설정
                                    coverflowEffect={{
                                        rotate: 50,
                                        stretch: 0,
                                        depth: 100,
                                        modifier: 1,
                                        slideShadows: proData.imgs.length >= 4,
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
                                >
                                    {proData.imgs.map((img, index) => (
                                        <SwiperSlide
                                            key={img.id}
                                            style={{
                                                boxShadow: proData.imgs.length >= 4 ? '0px 10px 20px rgba(0, 0, 0, 0.2), 0px 6px 6px rgba(0, 0, 0, 0.15)' : 'none',
                                                width: proData.imgs.length >= 4 ? '300px' : '500px',  
                                                height: '500px',
                                            }}
                                        >
                                            <img
                                                className="img-fluid border rounded"
                                                src={`${domain}/project/download?id=${img.id}`}
                                                alt={`Slide ${index + 1}`}
                                                style={{
                                                    width: '500px', height: '500px', display: 'block',
                                                    margin: '0 auto',
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                // 이미지가 한 장일 경우 슬라이드 없이 표시
                                <div className="single-image text-center">
                                    <img
                                        className="img-fluid border rounded"
                                        src={`${domain}/project/download?id=${proData.imgs[0].id}`}
                                        alt="Single Image"
                                        style={{ width: '500px', height: '500px' }}
                                    />
                                </div>
                            )
                        )}
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
                                <i
                                    className={`bx h2 px-1 ${likeStatus[proData.id]?.liked ? 'bxs-like' : 'bx-like'} ${isHovered ? 'bx-tada' : ''}`}
                                    onClick={(e) => handleLikeClick(e, proData.id)} // 좋아요 클릭 시 처리
                                    style={{ color: '#4232C2' }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                ></i>
                                <span className='pt-2 h4' style={{ color: '#4232C2' }}>{likeStatus[proData.id] !== undefined ? likeStatus[proData.id].count : proData.likeCount}</span>
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
                                    <span>작성자: <UserContact nickname={proData.name} /> </span>
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
                                    <Button icon={'list'} text={'목록'} onClick={() => { navigate('/project/list') }} />
                                </div>
                                <div className="col text-end">
                                    {user && proData.name === user.nickname && (
                                        <>   
                                        <span className="me-2">
                                        <Button
                                            icon={'edit'}
                                            text={'수정'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/update?id=${proData.id}`);
                                            }}
                                            />
                                            </span>
                                            <Button
                                                icon={'trash'}
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
