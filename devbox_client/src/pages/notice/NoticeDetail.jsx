import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";
import profilePic from "../../assets/img/profilePic.png";
import PostButton from "../../components/PostButton";
import Swal from "sweetalert2";
import Button from '../../components/Button';

const NoticeDetail = () => {
  const { postId } = useParams();
  const { user } = useUser(); 
  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const toList = () => {
    navigate("/notice/list");
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // 게시글 백엔드에서 가져오기
  const fetchPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/notice/posts/${postId}`,{
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data 뽑기 " + data.isLiked)
      setPost(data);
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
    navigate(`/notice/edit/${postId}`); // postId를 포함한 경로로 이동
  };

  // 게시글 삭제
  const deletePost = async () => {
    try {
      // SweetAlert2로 삭제 확인 창을 띄움
      const result = await Swal.fire({
        title: "게시글을 삭제하시겠습니까?",
        text: "삭제 후에는 되돌릴 수 없습니다!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      });

      // 사용자가 삭제를 확정한 경우
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:8080/notice/delete/${postId}`,
          {
            method: "DELETE", // 삭제 요청
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
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

        Swal.fire({
          icon: "success",
          title: "삭제 완료",
          text: "게시글이 성공적으로 삭제되었습니다.",
        });

        navigate("/notice/list"); // 삭제 후 목록 페이지로 이동
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: error.message || "글 삭제에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };



  
  return (
    <section className="container py-5" style={{ padding: "0px" }}>
      <div className="container">
        <h1 className="h2 semi-bold-600 text-center mt-2">공지사항</h1>
        <p
          className="text-center light-300"
          style={{ marginBottom: "0", padding: "0px" }}
        >
          공지 공지 공지사항입니다!
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
                    작성일: {formatDateTime(post.createdAt)} 조회수: {post.views}
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
                    <Button text="수정" icon="edit" onClick={goToEditPage} />
                    <Button text="삭제" icon="trash" onClick={deletePost} />
                  </>
                )}
              </div>
              <div className="d-flex">
                <Button text="목록" icon="list" onClick={toList} />
              </div>
            </div>
          </div>


        </>
      ) : (
        <div></div> // post가 null일 경우 로딩 표시
      )}
    </section>
  );
};

export default NoticeDetail;
