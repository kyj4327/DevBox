import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import UserContact from '../../components/UserContact';
import './ProjectMain.css';

const ProjectMyMain = (props) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태 관리
    const [likeStatus, setLikeStatus] = useState({}); // 좋아요 상태 및 수 관리
    const domain = "https://devback.shop";

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
        }
        props.setRefresh();
    };

    const handleLikeClick = (e, proId) => {
        e.stopPropagation();
        e.preventDefault();
        likeCount(proId); // 좋아요 상태 업데이트
    };

    useEffect(() => {
        fetchUserLikeStatus(); // 컴포넌트가 마운트될 때 사용자 좋아요 상태를 가져옴
        if (props.list) {
            const initialLikeStatus = {};
            props.list.forEach(pro => {
                initialLikeStatus[pro.id] = {
                    liked: pro.isLiked, // 유저가 이 게시물에 좋아요를 눌렀는지 여부
                    count: pro.likeCount // 해당 게시물의 좋아요 수
                };
            });
            setLikeStatus(initialLikeStatus);
        }
    }, [props.list]);

    return (
        <>
             <div className="mypage-content__title-wrapper">
                <h5 className="mypage-content__title" style={{cursor: 'default'}}>프로젝트 자랑 게시판</h5>
            </div>
            <section className="container py-4">
                <div className="row projects gx-lg-5">
                    {props.list && props.list.map((pro) => (
                        <div className="service-work overflow-hidden card mb-3 mx-2 col-sm-6 col-lg-4 pt-4 project marketing social business" key={pro.id}>
                            <Link to={`/project/detail?id=${pro.id}`} className="overflow-hidden card mb-2 mx-1 text-decoration-none">
                                <img
                                    style={{ height: '300px' }}
                                    className="card-img-top"
                                    src={`${domain}/project/download?id=${pro.mainImg}`}
                                    alt={`Project ${pro.id}`}
                                />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title h6 m-0 semi-bold-600 text-dark text-center" style={{cursor: 'default'}}>{pro.title}</h5>
                                <p className="card-text pt-2 mb-1 light-300 text-dark text-center">
                                    작성자: <UserContact nickname={pro.name} />
                                </p>
                                <div className='d-flex justify-content-end'>
                                    <i
                                        className={`bx h3 px-1 ${likeStatus[pro.id]?.liked ? 'bxs-like' : 'bx-like'} ${isHovered ? 'bx-tada' : ''}`}
                                        onClick={(e) => handleLikeClick(e, pro.id)} // 좋아요 클릭 시 처리
                                        style={{ color: '#4232C2' }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    ></i>
                                    <span className='pt-1'style={{ color: '#4232C2' }}>{likeStatus[pro.id]?.count || pro.likeCount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </section>
        </>
    );
};

export default ProjectMyMain;
