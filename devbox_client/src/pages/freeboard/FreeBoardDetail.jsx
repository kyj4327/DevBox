import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPost,
  deletePost,
  updatePost,
  toggleLike,
} from "../../services/api-service"; // toggleLike 추가
import FreeBoardComments from "../../components/FreeBoardComments";
import Button from "../../components/Button";
import { useUser } from "../../components/context/UserContext";
import "../../assets/css/freeboard.css";
import profilePic from "../../assets/img/profilePic.png";
import PostButton from "../../components/PostButton";

import Swal from "sweetalert2";

const FreeBoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 추가
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 상태 추가

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const postData = await getPost(id);
        setPost(postData);
        setIsLiked(postData.isLiked); // 서버에서 좋아요 여부를 받아와 설정
        setLikeCount(postData.likeCount); // 서버에서 좋아요 개수를 받아와 설정
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleToggleLike = async () => {
    try {
      await toggleLike(id); // 좋아요 토글 API 호출
      setIsLiked(!isLiked); // 좋아요 상태 반전
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); // 좋아요 개수 업데이트
    } catch (error) {
      console.error("Error toggling like:", error);
      setError("좋아요 처리에 실패했습니다.");
    }
  };

  const handleDeletePost = async () => {
    // 사용자가 로그인하지 않은 경우 경고 표시
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
      return;
    }

    // 게시글 삭제 확인 대화 상자
    Swal.fire({
      icon: "warning",
      title: "정말 삭제하시겠습니까?",
      text: "삭제 후에는 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePost(id); // 게시글 삭제 API 호출
          Swal.fire({
            icon: "success",
            title: "게시글이 삭제되었습니다.",
          });
          navigate("/freeboard/list"); // 삭제 후 목록으로 이동
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire({
            icon: "error",
            title: "게시글 삭제 실패",
            text: "게시글 삭제에 실패했습니다. 다시 시도해 주세요.",
          });
        }
      }
    });
  };

  const handleEditPost = () => {
    navigate(`/freeboard/update/${id}`);
  };

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="not-found">게시글을 찾을 수 없습니다.</div>;

  return (
    <section className="container py-5" style={{ padding: "0px" }}>
      <div className="container">
        <h1 className="h2 semi-bold-600 text-center mt-2">자유게시판</h1>
        <p
          className="text-center light-300"
          style={{ marginBottom: "0", padding: "0px" }}
        >
          어떤 이야기든!
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
                  <span>작성자: {post.author}</span>
                  <span>
                    작성일: {new Date(post.createdAt).toLocaleString()}
                    조회수: {post.views}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="row justify-content-center">
            <div
              className="col-lg-8 ml-auto mr-auto pt-3 pb-4 border border-3"
              style={{ minHeight: "200px" }} // 최소 높이 설정
            >
              <div
                className="text-muted light-300"
                style={{ color: "black !important" }}
                dangerouslySetInnerHTML={{ __html: post.content }} // HTML을 렌더링
              />

              {/* <div className="col-lg-8 ml-auto mr-auto pt-1 pb-2">
              <div className="d-flex flex-column text-muted light-300">
                <span>지원 방법: {apply}</span>
              </div>
            </div> */}

              <div className="d-flex justify-content-center">
                <div className="d-flex">
                  {/* 좋아요 버튼 */}
                  {post.likeCount !== undefined && (
                    <PostButton
                      icon={
                        <ion-icon
                          name={post.likeCount > 0 ? "heart" : "heart-outline"}
                          style={{
                            color: post.likeCount > 0 ? "red" : "black",
                            fontSize: "25px",
                          }}
                        ></ion-icon>
                      }
                      text={post.likeCount}
                      onClick={handleToggleLike}
                      disabled={!user}
                    />
                  )}
                  {/* <PostButton
                  text={isRecruiting ? "모집중" : "모집완료"}
                  onClick={handleToggleRecruit}
                /> */}
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
              <div className="d-flex" style={{ display: "flex", gap: "15px" }}>
                {/* 작성자가 아닐 경우 수정/삭제 버튼을 숨김 */}
                {user && post.author === user.nickname && (
                  <>
                    <Button text="수정" onClick={handleEditPost} />
                    <Button text="삭제" onClick={handleDeletePost} />
                  </>
                )}
              </div>
              <div className="d-flex">
                <Button
                  text="목록으로"
                  onClick={() => navigate("/freeboard/list")}
                />
              </div>
            </div>
          </div>

          {/* 댓글 컴포넌트 */}
          <div className="row justify-content-center"></div>
          <FreeBoardComments postId={id} />
        </>
      ) : (
        <div>Loading...</div> // post가 null일 경우 로딩 표시
      )}
    </section>
  );
};

export default FreeBoardDetail;
