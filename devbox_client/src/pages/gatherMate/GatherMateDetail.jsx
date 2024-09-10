import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/Comments";
import profilePic from "../../assets/img/profilePic.png";
import "./GatherMateDetail.css";
import PostButton from "../../components/PostButton";
import WriteShort from "../../components/WriteShort";

const GatherMateDetail = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isRecruiting, setIsRecruiting] = useState("");
  const [apply, setApply] = useState("");

  const navigate = useNavigate();
  const toList = () => {
    navigate("/gatherlist");
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // 게시글 백엔드에서 가져오기
  const fetchPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/gathermate/posts/${postId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPost(data);
      setLikes(data.likes || 0);
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
    navigate(`/gatheredit/${postId}`); // postId를 포함한 경로로 이동
  };

  // 게시글 삭제
  const deletePost = async () => {
    const confirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/gathermate/posts/${postId}`,
        {
          method: "DELETE", // 삭제 요청
        }
      );

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      alert("게시글이 성공적으로 삭제되었습니다.");
      navigate("/gatherlist"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
    // TODO: 백엔드랑 연동하기 좋아요 투표
  };

  const handleToggleRecruit = async () => {
    const newRecruitingStatus = !isRecruiting; // 현재 상태의 반대값으로 변경

    try {
      const response = await fetch(
        `http://localhost:8080/gathermate/posts/${postId}/recruiting`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isRecruiting: newRecruitingStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("모집 상태 업데이트에 실패했습니다.");
      }

      // 백엔드 업데이트가 성공한 후에 프론트엔드 상태를 변경
      setIsRecruiting(newRecruitingStatus);
      alert(
        newRecruitingStatus
          ? "모집중으로 변경되었습니다."
          : "모집완료로 변경되었습니다."
      );
    } catch (error) {
      console.error("모집 상태 업데이트 중 오류 발생:", error);
      alert("모집 상태를 변경하는 데 실패했습니다. 다시 시도해주세요.");
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
              <span>작성자: 김개발{post.author}</span>
              <span>
                작성일: {formatDateTime(post.createdAt)} 조회수: 9999
                {post.views}
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
            style={{ color: "black !important" }}
            dangerouslySetInnerHTML={{ __html: post.content }} // HTML을 렌더링
          />

        <div className="col-lg-8 ml-auto mr-auto pt-1 pb-2">
          <div className="d-flex flex-column text-muted light-300">
            <span>지원 방법: {apply}</span>
          </div>
        </div>

          <div className="d-flex justify-content-center">
            <div className="d-flex">
              <PostButton icon="♡" text={likes} onClick={handleLike} />
              <PostButton
                text={isRecruiting ? "모집중" : "모집완료"}
                onClick={handleToggleRecruit}
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div
            className="col-lg-8 d-flex justify-content-between"
            style={{ padding: "10px 0px 0px" }}
          >
            <div className="d-flex">
              <PostButton text="수정" onClick={goToEditPage} />
              <PostButton text="삭제" onClick={deletePost} />
            </div>
            <div className="d-flex">
              {/* http://localhost:3000/gatherlist */}
              <PostButton text="목록으로" onClick={toList} />
            </div>
          </div>
        </div>

        {/* 댓글 컴포넌트 */}
        <div className="row justify-content-center"></div>
        <Comment />
      </div>
    </section>
  );
};

export default GatherMateDetail;
