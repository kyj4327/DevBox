import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";
import profilePic from "../../assets/img/profilePic.png";
import "./GatherMateDetail.css";
import PostButton from "../../components/PostButton";
import BoardComments from "../../components/BoardComments";
import Swal from "sweetalert2"; // Import SweetAlert2
import UserContact from '../../components/UserContact';
import Button from '../../components/Button';

const GatherMateDetail = () => {
  const { postId } = useParams();
  const { user, loading } = useUser();
  const [post, setPost] = useState(null);

  const [isLiked, setIsLiked] = useState(false);

  const [isRecruiting, setIsRecruiting] = useState(false);
  const [apply, setApply] = useState("");

  const navigate = useNavigate();
  const toList = () => {
    navigate("/gathermate/list");
  };

  useEffect(() => {
    if (!loading) {
      fetchPost();
      if (user) {
        fetchIsLiked();
      } // 사용자 정보가 있을 때만 isLiked 조회
    }
  }, [postId, loading, user]);

  // 게시글 백엔드에서 가져오기
  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://www.devback.shop/gathermate/posts/${postId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }
      const data = await response.json();
      console.log("Fetched post data:", data); // 전체 데이터 로그
      console.log("data 뽑기 " + data.isLiked);
      setPost(data);
      // // setLikes(data.likes || 0);
      // setIsLiked(data.isLiked || false);
      setIsRecruiting(data.recruiting);
      setApply(data.apply);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 수정 페이지로 이동하는 함수
  const goToEditPage = () => {
    navigate(`/gathermate/edit/${postId}`); // postId를 포함한 경로로 이동
  };

  // 게시글 삭제
  const deletePost = async () => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "삭제하시겠습니까?",
      text: "삭제 후에는 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#d33",
      cancelButtonText: "취소",
      cancelButtonColor: "#3085d6"
    });
    if (!confirmed.isConfirmed) return;

    try {
      const response = await fetch(
        `https://www.devback.shop/gathermate/delete/${postId}`,
        {
          method: "DELETE", // 삭제 요청
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("작성자가 아닙니다.");
        }
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      await Swal.fire({
        icon: "success",
        title: "삭제되었습니다."
      });
      navigate("/gathermate/list"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "삭제 중 오류가 발생했습니다.",
        text: error.message || "다시 시도해 주세요."
      });
    }
  };

  // 좋아요
  const handleLike = async () => {
    if (!user) {
      await Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다."
      });
      return;
    }

    try {
      const response = await fetch(
        `https://www.devback.shop/gathermate/likes/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle like status");
      }

      const data = await response.json();
      console.log("Like toggled:", data);
      setPost((prevPost) => ({
        ...prevPost,
        likeCount: data.likeCount,
      }));
      setIsLiked(data.isLiked);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "좋아요 중 오류가 발생했습니다.",
        text: error.message || "다시 시도해 주세요."
      });
    }
  };

  const handleToggleRecruit = async () => {
    const newRecruitingStatus = !isRecruiting;
  
    try {
      const response = await fetch(
        `https://www.devback.shop/gathermate/edit/${postId}/recruiting`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ isRecruiting: newRecruitingStatus }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        // 백엔드에서 업데이트된 데이터를 다시 가져옵니다.
        await fetchPost();
        await Swal.fire({
          icon: "success",
          title: data.message || "모집 상태가 변경되었습니다."
        });
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "모집 상태 업데이트에 실패했습니다."
        );
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "변경 중 오류가 발생했습니다.",
        text: error.message || "다시 시도해 주세요."
      });
    }
  };

  // 새로운 함수: isLiked 상태를 별도로 조회
  const fetchIsLiked = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `https://www.devback.shop/gathermate/isLiked/posts/${postId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        }
      );

      if (response.status === 401) {
        setIsLiked(false);
        return;
      }

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const data = await response.json();
      console.log("Fetched isLiked data:", data);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error("isLiked 조회 오류:", error);
      setIsLiked(false); // 오류 발생 시 기본값 설정
    }
  };

  return (
    <section className="container py-5" style={{ padding: "0px" }}>
      <div className="container">
        <h1 className="h2 semi-bold-600 text-center mt-2">모여라 메이트</h1>
        <p
          className="text-center light-300"
          style={{ marginBottom: "0", padding: "0px" }}
        >
          너! 나의 동료가 돼라!
        </p>
      </div>

      {post ? ( // post가 존재할 때 렌더링
        <>
          {/* 글 제목 */}
          <div className="row pt-5">
            <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
              <h2
                className="worksingle-heading h3 pb-3 light-300 typo-space-line"
                style={{ marginTop: "10px" }}
              >
                {post.title}
              </h2>
            </div>
          </div>

          {/* 작성자 정보 */}
          <div className="row justify-content-center">
            <div className="col-lg-8 ml-auto mr-auto pt-1 pb-2">
              <div className="d-flex align-items-center text-muted light-300">
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
                <div className="d-flex flex-column">

                

                  <span>작성자: <UserContact
                          nickname={post.author}
                          nicknameStyle={{
                            fontSize: "16px",
                            color: "#6c757d",
                          }}
                        /></span>
                  <span>
                    작성일: {formatDateTime(post.createdAt)} 조회수:{post.views}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="row justify-content-center">
            <div className="col-lg-8 ml-auto mr-auto pt-3 pb-4 border border-3">
              <div
                className="text-muted light-300"
                style={{
                  color: "black !important",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: post.content }} // HTML을 렌더링
              />

              <div className="col-lg-8 ml-auto mr-auto pt-1 pb-2">
                <div className="d-flex flex-column text-muted light-300">
                  <span>지원 방법: {apply}</span>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="d-flex">
                  {/* 좋아요 버튼 */}
                  {/* {post.likeCount !== undefined && (
                    <PostButton
                      icon={
                        <ion-icon
                          name={post.likeCount > 0 ? "heart" : "heart-outline"}
                          style={{
                            color: post.likeCount > 0 ? "red" : "black",
                            fontSize: "25px",
                          }}
                          // name={isLiked ? 'heart' : 'heart-outline'}
                          // style={{ color: isLiked ? 'red' : 'black', fontSize: '25px' }}
                        ></ion-icon>
                      }
                      text={post.likeCount}
                      onClick={handleLike}
                      disabled={!user}
                    />
                  )} */}

                  {/* 좋아요 버튼 */}
                  {post.likeCount !== undefined && (
                    <PostButton
                      icon={
                        <ion-icon
                          name={isLiked ? "heart" : "heart-outline"}
                          style={{
                            color: isLiked ? "red" : "black",
                            fontSize: "25px",
                          }}
                        ></ion-icon>
                      }
                      text={post.likeCount}
                      onClick={handleLike}
                      disabled={!user}
                    />
                  )}
                  <PostButton
                    text={isRecruiting ? "모집중" : "모집완료"}
                    onClick={handleToggleRecruit}
                    disabled={!user}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 버튼과 목록으로 */}
          <div className="row justify-content-center">
            <div
              className="col-lg-8 d-flex justify-content-between"
              style={{ padding: "10px 0px 0px" }}
            >
              <div className="d-flex">
                {/* 작성자가 아닐 경우 수정/삭제 버튼을 숨김 */}
                {user && post.author === user.nickname && (
                  <>
                    <Button text={"수정"} icon="edit"  onClick={goToEditPage} />
                    <Button text={"삭제"} icon="trash" onClick={deletePost} />

                  </>
                )}
              </div>
              <div className="d-flex">
                <Button text={"목록"} icon="list" onClick={toList} />
              </div>
            </div>
          </div>

          {/* 댓글 컴포넌트 */}
          <div className="row justify-content-center">
            <div className="col-lg-8 ml-auto mr-auto pt-5 pb-2">
              {/* <GatherMateComments postId={postId} /> */}

              <BoardComments postId={postId} boardType="gathermate" />
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div> // post가 null일 경우 로딩 표시
      )}
    </section>
  );
};

export default GatherMateDetail;
