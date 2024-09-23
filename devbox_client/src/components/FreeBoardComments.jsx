import React, { useState, useEffect } from 'react';
import { getCommentsByPostId, createComment, deleteComment } from '../services/api-service';

const FreeBoardComments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const commentsData = await getCommentsByPostId(postId);
            console.log('Processed comments data:', commentsData); // 처리된 데이터 로깅
            setComments(commentsData);
          } catch (error) {
            console.error('Failed to fetch comments:', error);
          }
        };
      
        fetchComments();
      }, [postId]);

    const fetchComments = async () => {
        try {
            const data = await getCommentsByPostId(postId);
            setComments(data);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError('Failed to load comments. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const comment = { postId, content: newComment };
            await createComment(comment);
            setNewComment('');
            fetchComments(); // Refresh comments after adding a new one
        } catch (err) {
            console.error('Error creating comment:', err);
            setError('Failed to add comment. Please try again.');
        }
    };

    const handleDelete = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteComment(commentId);
                fetchComments(); // Refresh comments after deleting
            } catch (err) {
                console.error('Error deleting comment:', err);
                setError('Failed to delete comment. Please try again.');
            }
        }
    };

    return (
        <div className="mt-5">
            <h3>Comments</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group mb-3">
                {comments.map((comment) => (
                    <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{comment.content}</span>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea 
                        className="form-control" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows="3"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
        </div>
    );
}
    export default FreeBoardComments;
