import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getCommentsByPostId, createComment, deletePost, updatePost } from '../services/api-service';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

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
        console.error('Error fetching post or comments:', error);
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
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      setError('댓글 작성에 실패했습니다.');
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      navigate('/community/freeboard'); // Redirect to the board after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('게시글 삭제에 실패했습니다.');
    }
  };

  const handleEditPost = () => {
    setIsEditing(true);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
  };

  const handleUpdatePost = async () => {
    try {
      await updatePost(id, { title: updatedTitle, content: updatedContent });
      setPost({ ...post, title: updatedTitle, content: updatedContent });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('게시글 수정에 실패했습니다.');
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="container mt-5">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="form-control mb-2"
            placeholder="제목을 수정하세요"
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="form-control mb-2"
            placeholder="내용을 수정하세요"
          />
          <button onClick={handleUpdatePost} className="btn btn-success">수정 완료</button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary">취소</button>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>작성자: {post.author}</p>
          <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
          <button onClick={handleEditPost} className="btn btn-primary">수정</button>
          <button onClick={handleDeletePost} className="btn btn-danger ml-2">삭제</button>
        </>
      )}

      <h2>댓글</h2>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="card mb-2">
            <div className="card-body">
              <p>{comment.content}</p>
              <small>작성일: {new Date(comment.createdAt).toLocaleString()}</small>
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
        <button type="submit" className="btn btn-primary">댓글 작성</button>
      </form>
    </div>
  );
};

export default PostDetail;
