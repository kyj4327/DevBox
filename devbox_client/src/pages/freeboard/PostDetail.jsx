import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost, updatePost, toggleLike } from "../../services/api-service"; // toggleLike 추가
import FreeBoardComments from "../../components/FreeBoardComments";
import Button from "../../components/Button";
import { useUser } from "../../components/context/UserContext";
import "../../assets/css/freeboard.css";

const PostDetail = () => {
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
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        navigate("/freeboard/list");
      } catch (error) {
        console.error("Error deleting post:", error);
        setError("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleEditPost = () => {
    navigate(`/freeboard/update/${id}`);
  };

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="not-found">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="freeboard-post-detail">
      <div className="freeboard-post-header">
        <h1 className="freeboard-post-title">{post.title}</h1>
        <div className="freeboard-post-meta">
          <span className="post-author">{post.author}</span>
          <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className="freeboard-post-content-wrapper">
        <div
          className="freeboard-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <div className="freeboard-post-actions">
        <div className="freeboard-button-group">
          <Button
            text="목록"
            onClick={() => navigate("/freeboard/list")}
            className="btn-freeboard-write"
          />
        </div>
        {user && post.author === user.nickname && (
          <div className="freeboard-button-group">
            <Button
              text="수정"
              onClick={handleEditPost}
              className="btn-freeboard-edit"
            />
            <Button
              text="삭제"
              onClick={handleDeletePost}
              className="btn-freeboard-delete"
            />
          </div>
        )}
      </div>
      {/* 좋아요 기능 추가 */}
      <div className="freeboard-post-like">
        <Button
          text={isLiked ? "좋아요 취소" : "좋아요"}
          onClick={handleToggleLike}
          className="btn-freeboard-like"
        />
        <span>{likeCount}명이 이 게시글을 좋아합니다.</span>
      </div>

      <FreeBoardComments postId={id} />
    </div>
  );
};

export default PostDetail;
