import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPost,
  getCommentsByPostId,
  createComment,
  deletePost,
  deleteComment,
  updatePost,
} from "../../services/api-service";
import WriteShort from "../../components/WriteShort";
import WriteLong from "../../components/WriteLong";
import QuillEditor from "../../components/QuillEditor";
import Button from "../../components/Button";
import { useUser } from "../../components/context/UserContext"; // 사용자 정보 가져오기
import "../../assets/css/freeboard.css";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); // 로그인한 사용자 정보 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getCommentsByPostId(id),
        ]);
        setPost(postData);
        setComments(Array.isArray(commentsData) ? commentsData : []);
        setUpdatedTitle(postData.title);
        setUpdatedContent(postData.content);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
        setError("게시글 또는 댓글을 불러오는 데 실패했습니다.");
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
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
      setError("댓글 작성에 실패했습니다.");
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        navigate("/freeboard/list");
      } catch (error) {
        console.error("Error deleting post:", error);
        setError("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleEditPost = () => {
    navigate(`/freeboard/update/${id}`);
  };

  const handleUpdatePost = async () => {
    try {
      await updatePost(id, { title: updatedTitle, content: updatedContent });
      setPost({ ...post, title: updatedTitle, content: updatedContent });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("게시글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        setError("댓글 삭제에 실패했습니다.");
      }
    }
  };

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="not-found">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="freeboard-post-detail">
      {isEditing ? (
        <div className="freeboard-edit-post-form">
          <h2 className="freeboard-edit-post-title">게시글 수정</h2>
          <WriteShort
            type="text"
            titleTag="작성자"
            name="author"
            value={post.author}
            readOnly
          />
          <WriteLong
            titleTag="제목"
            name="title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <div className="freeboard-edit-content">
            <h3>내용</h3>
            <QuillEditor
              value={updatedContent}
              onChange={setUpdatedContent}
              placeholder="내용을 입력하세요."
            />
          </div>
          <div className="freeboard-edit-actions">
            <Button
              text="수정하기"
              onClick={handleUpdatePost}
              className="btn-freeboard-edit"
            />
            <Button
              text="취소"
              onClick={() => setIsEditing(false)}
              className="btn-freeboard-delete"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="freeboard-post-header">
            <h1 className="freeboard-post-title">{post.title}</h1>
            <div className="freeboard-post-meta">
              <span className="post-author">{post.author}</span>
              <span className="post-date">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="freeboard-post-content-wrapper">
            <div
              className="freeboard-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div className="freeboard-post-actions">
            <div className="freeboard-button-group">
              <Button
                text="목록"
                onClick={() => navigate("/freeboard/list")}
                className="btn-freeboard-write"
              />
            </div>
            <div className="freeboard-button-group">
              {user && post.user.id === user.id && (
                <>
                  <Button
                    text="수정"
                    onClick={handleEditPost}
                    className="btn-freeboard-edit"
                  />
                  <Button
                    text="삭제"
                    onClick={handleDeletePost}
                    className="btn-freeboard-delete"
                  />
                </>
              )}
            </div>
          </div>

          <div className="freeboard-comments-section">
            <h2 className="freeboard-comments-title">
              댓글 {comments.length}개
            </h2>
            {comments.length === 0 ? (
              <p className="no-comments">첫 번째 댓글을 남겨보세요.</p>
            ) : (
              <ul className="freeboard-comments-list">
                {comments.map((comment) => (
                  <li key={comment.id} className="freeboard-comment">
                    <div className="freeboard-comment-content">
                      {comment.content}
                    </div>
                    <div className="freeboard-comment-meta">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                      {user &&
                        comment.author === user.nickname && ( // 댓글 작성자와 로그인한 사용자가 같은 경우에만 삭제 버튼 활성화
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
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

            {user && ( // 로그인한 사용자만 댓글을 작성할 수 있음
              <form
                onSubmit={handleCommentSubmit}
                className="freeboard-comment-form"
              >
                <textarea
                  className="freeboard-comment-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 작성하세요..."
                  required
                />
                <Button text={"댓글 작성"}>
                  
                </Button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
