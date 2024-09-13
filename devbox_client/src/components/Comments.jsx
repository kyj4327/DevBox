import React, { useState, useEffect } from 'react';
import { getCommentsByPostId, createComment, deleteComment } from '../services/api-service';

const Comments = ({ postId }) => {
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

 
    // mmmmm    
import React, { useState, useEffect } from "react";
import profilePic from "../assets/img/profilePic.png";
import "./Comments.css";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "김개발",
      time: "2024-09-03 17:54",
      message: "테스트 댓글 1.",
      imgSrc: profilePic,
      replies: [],
    },
    {
      id: 2,
      name: "김코딩",
      time: "2024-09-05 17:54",
      message: "테스트 댓글 2.",
      imgSrc: profilePic,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState({
    name: "",
    message: "",
  });

  const [replyData, setReplyData] = useState({
    parentId: null,
    replyToId: null,
    name: "",
    message: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState({ id: null, type: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.message) {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newComment.name,
          time: "방금 전",
          message: newComment.message,
          imgSrc: profilePic,
          replies: [],
        },
      ]);
      setNewComment({
        name: "",
        message: "",
      });
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyData.name && replyData.message && replyData.parentId) {
      const newReply = {
        id: Date.now(),
        name: replyData.name,
        time: "방금 전",
        message: replyData.message,
        imgSrc: profilePic,
      };

      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === replyData.parentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        });
      });

      setReplyData({
        parentId: null,
        replyToId: null,
        name: "",
        message: "",
      });
    }
  };

  const openReplyForm = (commentId, replyId = null) => {
    setReplyData({
      parentId: commentId,
      replyToId: replyId,
      name: "",
      message: "",
    });
  };

  const toggleDropdown = (id, type) => {
    setDropdownOpen((prev) => 
      prev.id === id && prev.type === type ? { id: null, type: null } : { id, type }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen.id !== null && !event.target.closest(".menu-icon")) {
        setDropdownOpen({ id: null, type: null });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const renderReplies = (replies, parentId) => {
    return replies.map((reply) => (
      <div className="reply" key={reply.id} style={{ marginLeft: "20px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={reply.imgSrc} alt="profile" className="profile-image me-3" />
            <div>
              <span className="comment-author d-block">{reply.name}</span>
              <span className="comment-time">{reply.time}</span>
            </div>
          </div>
          <div className="menu-icon-container">
            <div className="menu-icon" onClick={() => toggleDropdown(reply.id, 'reply')}>
              ...
            </div>
            <div className={`dropdown-menu ${dropdownOpen.id === reply.id && dropdownOpen.type === 'reply' ? "show" : ""}`}>
              <button className="dropdown-item">수정</button>
              <button className="dropdown-item">삭제</button>
            </div>
          </div>
        </div>
        <div className="comment-content mt-2">{reply.message}</div>
        <div className="mt-2">
          <button className="reply-button" onClick={() => openReplyForm(parentId, reply.id)}>
            Reply
          </button>
        </div>
        {replyData.parentId === parentId && replyData.replyToId === reply.id && (
          <div className="reply-form mt-2">
            <form onSubmit={handleReplySubmit}>
              <input
                type="text"
                className="form-control mb-2"
                name="name"
                value={replyData.name}
                onChange={handleReplyChange}
                placeholder="Your Name"
                required
              />
              <textarea
                className="form-control mb-2"
                name="message"
                value={replyData.message}
                onChange={handleReplyChange}
                placeholder="Your Reply"
                rows="3"
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Send Reply
              </button>
            </form>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="col-lg-8">
      <h2 className="mb-4">Comments</h2>
      <div id="comments-list">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={comment.imgSrc} alt="profile" className="profile-image me-3" />
                <div>
                  <span className="comment-author d-block">{comment.name}</span>
                  <span className="comment-time">{comment.time}</span>
                </div>
              </div>
              <div className="menu-icon-container">
                <div className="menu-icon" onClick={() => toggleDropdown(comment.id, 'comment')}>
                  ...
                </div>
                <div className={`dropdown-menu ${dropdownOpen.id === comment.id && dropdownOpen.type === 'comment' ? "show" : ""}`}>
                  <button className="dropdown-item">수정</button>
                  <button className="dropdown-item">삭제</button>
                </div>
              </div>
            </div>
            <div className="comment-content mt-2">{comment.message}</div>
            <div className="mt-2">
              <button className="reply-button" onClick={() => openReplyForm(comment.id)}>
                Reply
              </button>
            </div>
            {replyData.parentId === comment.id && replyData.replyToId === null && (
              <div className="reply-form mt-2">
                <form onSubmit={handleReplySubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="name"
                    value={replyData.name}
                    onChange={handleReplyChange}
                    placeholder="Your Name"
                    required
                  />
                  <textarea
                    className="form-control mb-2"
                    name="message"
                    value={replyData.message}
                    onChange={handleReplyChange}
                    placeholder="Your Reply"
                    rows="3"
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    Send Reply
                  </button>
                </form>
              </div>
            )}
            {renderReplies(comment.replies, comment.id)}
          </div>
        ))}
      </div>

      <div className="leave-comment mt-5">
        <h3 className="mb-3">Leave Comment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newComment.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Comment</label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              value={newComment.message}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Comment
          </button>
        </form>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Comments;