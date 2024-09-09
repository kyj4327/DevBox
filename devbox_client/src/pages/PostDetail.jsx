import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getCommentsByPostId, createComment, deletePost, updatePost } from '../services/api-service';
import WriteShort from "../components/WriteShort"; // 작성 시 사용한 컴포넌트들 임포트
import WriteLong from "../components/WriteLong";
import QuillEditor from "../components/QuillEditor";
import Button from "../components/Button";

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
  const [author, setAuthor] = useState('');

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
        setUpdatedTitle(postData.title); // 수정 시 기존 데이터 로드
        setUpdatedContent(postData.content);
        setAuthor(postData.author);
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
  };

  const handleUpdatePost = async () => {
    try {
      await updatePost(id, { title: updatedTitle, content: updatedContent, author });
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
        <div>
          <section className="container py-5">
            <div className="container py-5">
              <h1 className="h2 semi-bold-600 text-center mt-2">게시글 수정</h1>
              <p className="text-center pb-5 light-300">
                자유롭게 의견을 나누어 보세요!
              </p>
              <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                <div className="contact-form row">
                  <WriteShort
                    type="text"
                    titleTag="작성자"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <WriteLong
                    titleTag="제목"
                    name="title"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">
                    내용
                  </h2>
                  <div className="col-lg-12 mb-4">
                    <div className="form-floating">
                      <QuillEditor
                        value={updatedContent}
                        onChange={setUpdatedContent}
                        height="450px"
                        placeholder="내용을 입력하세요."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row pt-2">
              <div className="col-md-12 col-10 text-end">
                <Button text="수정하기" onClick={handleUpdatePost} />
                <Button text="취소" onClick={() => setIsEditing(false)} />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>작성자: {post.author}</p>
          <p>작성일: {new Date(post.createdAt).toLocaleString()}</p>
          <button onClick={handleEditPost} className="btn btn-primary">수정</button>
          <button onClick={handleDeletePost} className="btn btn-danger ml-2">삭제</button>

          {/* 댓글 및 댓글 작성 폼은 수정 모드가 아닐 때만 표시 */}
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
        </>
      )}
    </div>
  );
};

export default PostDetail;
