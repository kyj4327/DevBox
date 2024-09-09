import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getCommentsByPostId, createComment, deletePost, deleteComment } from '../services/api-service';
import Button from "../components/Button";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getCommentsByPostId(id)
        ]);
        setPost(postData);
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (error) {
        console.error('게시글 또는 댓글을 불러오는 데 실패했습니다.', error);
        setError('게시글 또는 댓글을 불러오는 데 실패했습니다.');
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
      setComments(prevComments => [...prevComments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
      setError('댓글 작성에 실패했습니다.');
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePost(id);
        navigate('/community/freeboard');
      } catch (error) {
        console.error('게시글 삭제에 실패했습니다.', error);
        setError('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('댓글 삭제에 실패했습니다.', error);
        setError('댓글 삭제에 실패했습니다.');
      }
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="container mt-5">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
      <div className="mb-3">
        <button onClick={() => navigate(`/community/freeboard/${id}/edit`)} className="btn btn-primary mr-2">수정</button>
        <button onClick={handleDeletePost} className="btn btn-danger">삭제</button>
      </div>

      <h2>댓글</h2>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className="card mb-2">
            <div className="card-body">
              <p>{comment.content}</p>
              <small>작성일: {new Date(comment.createdAt).toLocaleString()}</small>
              <button 
                onClick={() => handleDeleteComment(comment.id)} 
                className="btn btn-danger btn-sm float-end"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <div className="form-group">
          <textarea
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">댓글 작성</button>
      </form>
    </div>
  );
};

export default PostDetail;
