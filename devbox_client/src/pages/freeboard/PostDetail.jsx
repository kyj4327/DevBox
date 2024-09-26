import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost, updatePost } from "../../services/api-service";
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

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
          <span className="post-date">
            {new Date(post.createdAt).toLocaleString()}
          </span>
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
        {user && (
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

      <FreeBoardComments postId={id} />
    </div>
  );
};

export default PostDetail;