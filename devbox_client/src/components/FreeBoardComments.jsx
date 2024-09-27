import React, { useState, useEffect } from 'react';
import { getCommentsByPostId, createComment, deleteComment } from '../services/api-service';
import { useUser } from '../components/context/UserContext';
import Button from '../components/Button';
import '../assets/css/freeboard.css';

const FreeBoardComments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const commentsData = await getCommentsByPostId(postId);
            setComments(commentsData);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError('댓글을 불러오는데 실패했습니다. 다시 시도해 주세요.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
    
        try {
            // 댓글 작성 시 author 정보 추가
            const createdComment = await createComment(postId, { 
                content: newComment, 
                author: user.nickname // 현재 사용자의 닉네임을 author로 전송
            });
            setComments(prevComments => [...prevComments, createdComment]);
            setNewComment('');
        } catch (err) {
            console.error('Error creating comment:', err);
            setError('댓글 작성에 실패했습니다. 다시 시도해 주세요.');
        }
    };
    
    const handleDelete = async (commentId) => {
        if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
            try {
                await deleteComment(commentId);
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            } catch (err) {
                console.error('Error deleting comment:', err);
                setError('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
            }
        }
    };

    return (
        <div className="freeboard-comments-section">
            <h2 className="freeboard-comments-title">댓글 {comments.length}개</h2>
            {error && <div className="error">{error}</div>}
            {comments.length === 0 ? (
                <p className="no-comments">첫 번째 댓글을 남겨보세요.</p>
            ) : (
                <ul className="freeboard-comments-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="freeboard-comment">
                            <div className="freeboard-comment-content">{comment.content}</div>
                            <div className="freeboard-comment-meta">
                                <span className="comment-author">{comment.author}</span>
                                <span className="comment-date">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                                {user && comment.author === user.nickname && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="btn-comment-delete"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {user && (
                <form onSubmit={handleSubmit} className="freeboard-comment-form">
                    <textarea
                        className="freeboard-comment-input"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 작성하세요..."
                        required
                    />
                    <Button text="댓글 작성" />
                </form>
            )}
        </div>
    );
};

export default FreeBoardComments;