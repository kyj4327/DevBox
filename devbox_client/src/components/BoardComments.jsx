import React, { useState, useEffect } from "react";
import profilePic from "../assets/img/profilePic.png";
import "./BoardComments.css"; // CSS 파일 이름도 변경
import { useUser } from "../components/context/UserContext";
import Swal from "sweetalert2";
import UserContact from './UserContact';

const BoardComments = ({ postId, boardType }) => {
  const { user, accessToken, loading } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ message: "" });
  const [replyData, setReplyData] = useState({
    parentId: null,
    replyToId: null,
    message: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState({ id: null, type: null });
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  // 동적으로 API 경로 생성
  const boardName = `http://localhost:8080/${boardType}`;

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

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
    fetch(`${boardName}/${postId}/commentslist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
        Swal.fire({
          icon: "error",
          title: "댓글 불러오기 실패",
          text: error.message,
        });
      });
  }, [postId, boardName, accessToken]);

  // 새로운 댓글 작성
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
      return;
    }
    if (newComment.message.trim()) {
      const data = {
        content: newComment.message.trim(),
        parentId: null,
      };

      fetch(`${boardName}/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 401) {
            Swal.fire({
              icon: "warning",
              title: "로그인 필요",
              text: "로그인이 필요합니다.",
            });
            return;
          }
          if (!response.ok) {
            throw new Error("Failed to post comment");
          }
          return fetch(`${boardName}/${postId}/commentslist`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
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
          Swal.fire({
            icon: "error",
            title: "댓글 작성 실패",
            text: error.message,
          });
        });
    }
  };

  // 답글 작성 핸들러
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
      return;
    }
    if (replyData.message.trim() && replyData.parentId) {
      const data = {
        content: replyData.message.trim(),
        parentId: replyData.parentId,
      };

      fetch(`${boardName}/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 401) {
            Swal.fire({
              icon: "warning",
              title: "로그인 필요",
              text: "로그인이 필요합니다.",
            });
            return;
          }
          if (!response.ok) {
            throw new Error("Failed to post reply");
          }
          return fetch(`${boardName}/${postId}/commentslist`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
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
          Swal.fire({
            icon: "error",
            title: "답글 작성 실패",
            text: error.message,
          });
        });
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (commentId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
      return;
    }
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${boardName}/comments/${commentId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err) => {
                throw new Error(err.message || "댓글 삭제에 실패했습니다.");
              });
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire({
              icon: "success",
              title: "댓글이 삭제되었습니다.",
              text: data.message,
            });
            return fetch(`${boardName}/${postId}/commentslist`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("댓글 목록을 불러오는데 실패했습니다.");
            }
            return response.json();
          })
          .then((data) => {
            setComments(data);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "오류",
              text: error.message,
            });
          });
      }
    });
  };

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentContent("");
  };

  // 댓글 수정 핸들러
  const handleEditSubmit = (commentId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
      return;
    }

    fetch(`${boardName}/comments/${commentId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content: editCommentContent.trim() }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: data.message || "댓글이 성공적으로 수정되었습니다.",
        });
        return fetch(`${boardName}/${postId}/commentslist`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("댓글 목록을 불러오는데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
        setEditingCommentId(null);
        setEditCommentContent("");
      })
      .catch((error) => {
        console.error("수정 실패:", error);
        Swal.fire({
          icon: "error",
          title: "수정 실패",
          text: error.message || "댓글 수정에 실패했습니다.",
        });
      });
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
      prev.id === id && prev.type === type
        ? { id: null, type: null }
        : { id, type }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen.id !== null &&
        !event.target.closest(".menu-icon-container")
      ) {
        setDropdownOpen({ id: null, type: null });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const renderReplies = (replies, parentId) => {
    return (
      <div className="replies">
        {replies.map((reply) => (
          <div className="reply" key={reply.id}>
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-center">
                <img
                  src={profilePic}
                  alt="profile"
                  className="profile-image me-3"
                />
                <div>
                  <span className="comment-author d-block">

                  <UserContact
                          nickname={reply.authorName}
                          nicknameStyle={{
                            fontSize: "16px",
                            color: "black",
                            fontWeight: "bold",
                          }}/>
                  </span>
                  {/* <span className="comment-time">{reply.createdAt}</span> */}
                  <span className="comment-time">{formatDateTime(reply.createdAt)}</span>
                  {/* <span className="comment-time">{new Date(reply.createdAt).toLocaleString()}</span> */}
                  

                  
                </div>
              </div>
              {user && user.nickname === reply.authorName && (
                <div className="menu-icon-container">
                  <div
                    className="menu-icon"
                    onClick={() => toggleDropdown(reply.id, "reply")}
                  >
                    ...
                  </div>
                  <div
                    className={`dropdown-menu ${
                      dropdownOpen.id === reply.id &&
                      dropdownOpen.type === "reply"
                        ? "show"
                        : ""
                    }`}
                  >
                    <button
                      className="dropdown-item"
                      onClick={() => handleEditClick(reply.id, reply.content)}
                    >
                      수정
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDeleteComment(reply.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="comment-content mt-2">
              {editingCommentId === reply.id ? (
                <div className="edit-form">
                  <div className="textarea-container">
                    <textarea
                      className="form-control mb-2"
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                      rows="3"
                    />
                    <div className="edit-buttons">
                      {/* <button
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        취소
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEditSubmit(reply.id)}
                      >
                        등록
                      </button> */}
                      <span
                        className="btn-text"
                        onClick={handleCancelEdit}
                        style={{
                          cursor: "pointer",
                          marginRight: "10px",
                          color: "#6c757d",
                        }}
                      >
                        취소
                      </span>
                      <span
                        className="btn-text"
                        onClick={() => handleEditSubmit(reply.id)}
                        style={{ cursor: "pointer", color: "#007bff" }}
                      >
                        등록
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                reply.content
              )}
            </div>
            <div className="mt-2">
              {user && (
                <button
                  className="reply-button"
                  onClick={() => openReplyForm(parentId, reply.id)}
                >
                  답글쓰기
                </button>
              )}
            </div>
            {replyData.parentId === parentId &&
              replyData.replyToId === reply.id && (
                <div className="reply-form mt-2">
                  <form onSubmit={handleReplySubmit}>
                    <div className="form-group">
                      <textarea
                        className="form-control mb-2"
                        name="message"
                        value={replyData.message}
                        onChange={handleReplyChange}
                        placeholder="댓글을 작성해보세요"
                        rows="3"
                        required
                      ></textarea>
                      <button
                        type="submit"
                        className="btn btn-primary float-end"
                      >
                        등록
                      </button>
                    </div>
                  </form>
                </div>
              )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8" style={{ width: "100%" }}>
        <div id="comments-list">
          {comments
            .filter((comment) => comment !== null)
            .map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-center">
                    <img
                      src={profilePic}
                      alt="profile"
                      className="profile-image me-3"
                    />
                    <div>
                      <span className="comment-author d-block">
                        
                      <UserContact
                          nickname={comment.authorName}
                          nicknameStyle={{
                            fontSize: "16px",
                            color: "black",
                            fontWeight: "bold",
                          }}/>


                      </span>
                      {/* <span className="comment-time">{comment.createdAt}</span> */}
                      <span className="comment-time">{formatDateTime(comment.createdAt)}</span>
                    </div>
                  </div>
                  {user &&
                    user.nickname === comment.authorName &&
                    !comment.deleted && (
                      <div className="menu-icon-container">
                        <div
                          className="menu-icon"
                          onClick={() => toggleDropdown(comment.id, "comment")}
                        >
                          ...
                        </div>
                        <div
                          className={`dropdown-menu ${
                            dropdownOpen.id === comment.id &&
                            dropdownOpen.type === "comment"
                              ? "show"
                              : ""
                          }`}
                        >
                          <button
                            className="dropdown-item"
                            onClick={() =>
                              handleEditClick(comment.id, comment.content)
                            }
                          >
                            수정
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    )}
                </div>
                <div className="comment-content mt-2">
                  {editingCommentId === comment.id ? (
                    <div className="edit-form">
                      <div className="textarea-container">
                        <textarea
                          className="form-control mb-2"
                          value={editCommentContent}
                          onChange={(e) =>
                            setEditCommentContent(e.target.value)
                          }
                          rows="3"
                        />
                        <div className="edit-buttons">
                          {/* <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleCancelEdit}
                            >
                              취소
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              onClick={() => handleEditSubmit(comment.id)}
                            >
                              등록
                            </button> */}
                          <span
                            className="btn-text"
                            onClick={handleCancelEdit}
                            style={{
                              cursor: "pointer",
                              marginRight: "10px",
                              color: "#6c757d",
                            }}
                          >
                            취소
                          </span>
                          <span
                            className="btn-text"
                            onClick={() => handleEditSubmit(comment.id)}
                            style={{ cursor: "pointer", color: "#007bff" }}
                          >
                            등록
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : comment.deleted ? (
                    "삭제된 댓글입니다"
                  ) : (
                    comment.content
                  )}
                </div>
                <div className="mt-2">
                  {user && (
                    <button
                      className="reply-button"
                      onClick={() => openReplyForm(comment.id)}
                    >
                      답글쓰기
                    </button>
                  )}
                </div>
                {replyData.parentId === comment.id &&
                  replyData.replyToId === null && (
                    <div className="reply-form mt-2">
                      <form onSubmit={handleReplySubmit}>
                        <div className="form-group">
                          <textarea
                            className="form-control mb-2"
                            name="message"
                            value={replyData.message}
                            onChange={handleReplyChange}
                            placeholder="댓글을 작성해보세요"
                            rows="3"
                            required
                          ></textarea>
                          <button
                            type="submit"
                            className="btn btn-primary float-end"
                          >
                            등록
                          </button>
                        </div>
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
              <div className="form-group">
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
                <button
                  type="submit"
                  className="btn btn-primary float-end mt-2"
                >
                  등록
                </button>
              </div>
            </form>
          ) : (
            <p>댓글을 작성하려면 로그인이 필요합니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardComments;
