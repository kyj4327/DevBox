import React, { useState, useEffect } from "react";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
  editComment,
} from "../services/api-service";
import { useUser } from "../components/context/UserContext";
import Button from "../components/Button";
import profilePic from "../assets/img/profilePic.png";
import Swal from "sweetalert2";
import "./GatherMateComments.css";
import UserContact from "./UserContact";

const FreeBoardComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const { user, accessToken } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState({ id: null });
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

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
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다."
      });
      return;
    }
    if (!newComment.trim()) return;

    try {
      const createdComment = await createComment(postId, {
        content: newComment,
        author: user.nickname,
      });
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
    } catch (err) {
      console.error("Error creating comment:", err);
      setError("댓글 작성에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleDelete = async (commentId) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다."
      });
      return;
    }
    Swal.fire({
      icon: "warning",
      title: "댓글을 삭제하시겠습니까?",
      text: "삭제 후에는 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#d33",
      cancelButtonText: "취소",
      cancelButtonColor: "#3085d6"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteComment(commentId);
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          Swal.fire({
            icon: "success",
            title: "댓글이 삭제되었습니다."
          });
        } catch (err) {
          console.error("Error deleting comment:", err);
          Swal.fire({
            icon: "error",
            title: "삭제 중 오류가 발생했습니다.",
            text: err.message || "다시 시도해 주세요."
          });
        }
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

  const handleEditSubmit = async (commentId) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다."
      });
      return;
    }

    try {
      await editComment(commentId, { content: editCommentContent.trim() });
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: editCommentContent.trim() }
          : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditCommentContent("");
      Swal.fire({
        icon: "success",
        title: "수정되었습니다."
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "수정 중 오류가 발생했습니다.",
        text: error.message || "다시 시도해 주세요."
      });
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => (prev.id === id ? { id: null } : { id }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen.id !== null &&
        !event.target.closest(".menu-icon-container")
      ) {
        setDropdownOpen({ id: null });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `작성일: ${year}-${month}-${day}-${hours}:${minutes}`;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div id="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">첫 번째 댓글을 남겨보세요.</p>
            ) : (
              comments
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
                              nickname={comment.author}
                              nicknameStyle={{
                                fontSize: "16px",
                                color: "#888888",
                              }}
                            />
                          </span>
                          <span className="comment-time">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      {user && comment.author === user.nickname && (
                        <div className="menu-icon-container">
                          <div
                            className="menu-icon"
                            onClick={() => toggleDropdown(comment.id)}
                          >
                            ...
                          </div>
                          <div
                            className={`dropdown-menu ${dropdownOpen.id === comment.id ? "show" : ""
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
                              onClick={() => handleDelete(comment.id)}
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
                      ) : (
                        comment.content
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>

          <div className="leave-comment mt-5">
            {user ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
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
                  <button
                    type="submit"
                    className="btn btn-primary position-absolute bottom-0 end-0 m-2"
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
    </div>
  );
};

export default FreeBoardComments;