import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getPost, createPost, updatePost } from '../services/api-service';
import Button from "../components/Button";
import WriteLong from "../components/WriteLong";
import WriteShort from "../components/WriteShort";
import WriteSelect from "../components/WriteSelect";
import QuillEditor from "../components/QuillEditor";

const FreeBoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewPost = location.pathname.includes('/new');

  const [post, setPost] = useState(null);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(isNewPost);

  useEffect(() => {
    if (!isNewPost && id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const data = await getPost(id);
          setPost(data);
          setCategory(data.category || '');
          setTitle(data.title);
          setContent(data.content);
          setAuthor(data.author);
        } catch (error) {
          console.error('Error fetching post:', error);
          setError('게시글을 불러오는 데 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isNewPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const postData = { category, title, content, author };
      if (!isNewPost && id) {
        await updatePost(id, postData);
        setPost({ ...post, ...postData });
        setIsEditing(false);
      } else {
        const newPost = await createPost(postData);
        navigate(`/community/freeboard/${newPost.id}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('게시글 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">자유게시판</h1>
          <p className="text-center pb-5 light-300">
            {isNewPost ? '새로운 게시글을 작성해보세요!' : (isEditing ? '게시글을 수정해보세요!' : '게시글 상세보기')}
          </p>
          {!isEditing && !isNewPost ? (
            <>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>작성자: {post.author}</p>
              <p>카테고리: {post.category}</p>
              <Button text="수정하기" onClick={handleEdit} />
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <WriteSelect
                titleTag="카테고리"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={["일반", "질문", "정보", "기타"]}
              />
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">
                내용
              </h2>
              <div className="col-lg-12 mb-4">
                <div className="form-floating">
                  <QuillEditor
                    value={content}
                    onChange={setContent}
                    height="450px"
                    placeholder="내용을 입력하세요."
                  />
                </div>
              </div>
              <div className="col-md-12 col-10 text-end">
                <Button text={isNewPost ? "작성 완료" : "수정 완료"} onClick={handleSubmit} />
                {!isNewPost && <Button text="취소" onClick={() => setIsEditing(false)} />}
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default FreeBoardDetail;