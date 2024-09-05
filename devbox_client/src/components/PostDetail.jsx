import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPost,
  getCommentsByPostId,
  createComment,
} from "../services/api-service";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getCommentsByPostId(id),
        ]);
        setPost(postData);
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
        setError("게시글 또는 댓글을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const createdComment = await createComment(id, { content: newComment });
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
      setError("댓글 작성에 실패했습니다.");
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="container mt-5">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>

      <h2>댓글</h2>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="card mb-2">
            <div className="card-body">
              <p>{comment.content}</p>
              <small>
                작성일: {new Date(comment.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          댓글 작성
        </button>
      </form>
    </div>
  );
};

export default PostDetail;
