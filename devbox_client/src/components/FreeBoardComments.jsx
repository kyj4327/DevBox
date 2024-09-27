import React, { useState, useEffect } from "react";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "../services/api-service";
import { useUser } from "../components/context/UserContext";
import Button from "../components/Button";
import "../assets/css/freeboard.css";
import profilePic from "../../src/assets/img/profilePic.png";

const FreeBoardComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
      console.error("Error fetching comments:", err);
      setError("댓글을 불러오는데 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // 댓글 작성 시 author 정보 추가
      const createdComment = await createComment(postId, {
        content: newComment,
        author: user.nickname, // 현재 사용자의 닉네임을 author로 전송
      });
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
    } catch (err) {
      console.error("Error creating comment:", err);
      setError("댓글 작성에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (err) {
        console.error("Error deleting comment:", err);
        setError("댓글 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  //css수정 추가사항

  const [dropdownOpen, setDropdownOpen] = useState({ id: null, type: null });

  const [replyData, setReplyData] = useState({
    parentId: null,
    replyToId: null,
    message: "",
  });

  const toggleDropdown = (id, type) => {
    setDropdownOpen((prev) =>
      prev.id === id && prev.type === type
        ? { id: null, type: null }
        : { id, type }
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

  const openReplyForm = (commentId, replyId = null) => {
    setReplyData({
      parentId: commentId,
      replyToId: replyId,
      message: "",
    });
  };

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
        //   "Authorization": `Bearer ${accessToken}`,
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

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div id="comments-list">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={profilePic}
                      alt="profile"
                      className="profile-image me-3"
                    />
                    <div>
                      <span className="comment-author d-block">
                        {comment.author}
                      </span>
                      <span className="comment-time">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="menu-icon-container">
                    <div className="menu-icon">...</div>
                    <div
                      className={`dropdown-menu ${
                        dropdownOpen.id === comment.id &&
                        dropdownOpen.type === "comment"
                          ? "show"
                          : ""
                      }`}
                    >
                      <button className="dropdown-item">수정</button>
                      <button className="dropdown-item">삭제</button>
                    </div>
                  </div>
                </div>
                <div className="comment-content mt-2">{comment.content}</div>
                <div className="mt-2">
                  {/* {user && (
                        <button className="reply-button" onClick={() => openReplyForm(comment.id)}>
                          답글쓰기
                        </button>
                      )} */}
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
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
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

export default FreeBoardComments;
