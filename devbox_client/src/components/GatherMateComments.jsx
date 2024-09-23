import React, { useState, useEffect } from "react";
import profilePic from "../assets/img/profilePic.png";
import "./GatherMateComments.css";
import { useUser } from '../components/context/UserContext';

const GatherMateComments = ({ postId }) => {
  const { user, accessToken, loading } = useUser();
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState({
    message: "",
  });

  const [replyData, setReplyData] = useState({
    parentId: null,
    replyToId: null,
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

  // 댓글 목록 가져오기
  useEffect(() => {
    fetch(`http://localhost:8080/gathermate/${postId}/commentslist`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  // 댓글 작성하기
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (newComment.message) {
      const data = {
        content: newComment.message,
        parentId: null,
      };

      fetch(`http://localhost:8080/gathermate/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 401) {
            alert("로그인이 필요합니다.");
            return;
          }
          if (!response.ok) {
            throw new Error("Failed to post comment");
          }
          return fetch(`http://localhost:8080/gathermate/${postId}/commentslist`);
        })
        .then((response) => {
          if (response && response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch comments");
          }
        })
        .then((data) => {
          setComments(data);
          setNewComment({ message: "" });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 답글 작성하기
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (replyData.message && replyData.parentId) {
      const data = {
        content: replyData.message,
        parentId: replyData.parentId,
      };

      fetch(`http://localhost:8080/gathermate/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 401) {
            alert("로그인이 필요합니다.");
            return;
          }
          if (!response.ok) {
            throw new Error("Failed to post reply");
          }
          return fetch(`http://localhost:8080/gathermate/${postId}/commentslist`);
        })
        .then((response) => {
          if (response && response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch comments");
          }
        })
        .then((data) => {
          setComments(data);
          setReplyData({ parentId: null, replyToId: null, message: "" });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const openReplyForm = (commentId, replyId = null) => {
    setReplyData({
      parentId: commentId,
      replyToId: replyId,
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
            <img src={profilePic} alt="profile" className="profile-image me-3" />
            <div>
              <span className="comment-author d-block">{reply.authorName}</span>
              <span className="comment-time">{reply.createdAt}</span>
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
        
        <div className="comment-content mt-2">{reply.content}</div>
        <div className="mt-2">
          {user && (
            <button className="reply-button" onClick={() => openReplyForm(parentId, reply.id)}>
              답글쓰기2
            </button>
          )}
        </div>
        {replyData.parentId === parentId && replyData.replyToId === reply.id && (
          <div className="reply-form mt-2">
            <form onSubmit={handleReplySubmit}>
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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div id="comments-list">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={profilePic} alt="profile" className="profile-image me-3" />
                    <div>
                      <span className="comment-author d-block">{comment.authorName}</span>
                      <span className="comment-time">{comment.createdAt}</span>
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
                <div className="comment-content mt-2">{comment.content}</div>
                <div className="mt-2">
                  {user && (
                    <button className="reply-button" onClick={() => openReplyForm(comment.id)}>
                      답글쓰기
                    </button>
                  )}
                </div>
                {replyData.parentId === comment.id && replyData.replyToId === null && (
                  <div className="reply-form mt-2">
                    <form onSubmit={handleReplySubmit}>
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
                {comment.replies && renderReplies(comment.replies, comment.id)}
              </div>
            ))}
          </div>

          <div className="leave-comment mt-5">
            {user ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={newComment.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="댓글을 작성해보세요"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  등록
                </button>
              </form>
            ) : (
              <p>댓글을 작성하려면 로그인이 필요합니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatherMateComments;