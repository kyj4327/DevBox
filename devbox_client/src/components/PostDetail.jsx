import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllPosts, getPost, createPost, updatePost, getCommentsByPostId, createComment, deleteComment } from '../services/api-service';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
        const commentsData = await getCommentsByPostId(id);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdComment = await createComment({ postId: id, content: newComment });
      setComments([...comments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
      <div className="mb-4">{post.content}</div>
      <Link to={`/community/freeboard/edit/${post.id}`} className="btn btn-primary mr-2">
        수정
      </Link>
      <Link to="/community/freeboard" className="btn btn-secondary">
        목록으로
      </Link>

      <h3 className="mt-5">댓글</h3>
      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">댓글 작성</button>
      </form>

      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="card mb-2">
            <div className="card-body">
              <p className="card-text">{comment.content}</p>
              <p className="card-text"><small className="text-muted">
                {new Date(comment.createdAt).toLocaleString()}
              </small></p>
              <button onClick={() => handleCommentDelete(comment.id)} className="btn btn-sm btn-danger">
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;