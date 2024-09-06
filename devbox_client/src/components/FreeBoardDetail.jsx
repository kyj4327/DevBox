import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, createPost, updatePost } from '../services/api-service';
import Button from "../components/Button";
import WriteLong from "../components/WriteLong";
import WriteShort from "../components/WriteShort";
import QuillEditor from "../components/QuillEditor";

const FreeBoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const data = await getPost(id);
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
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const postData = { title, content, author };
      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      navigate('/community/freeboard');
    } catch (error) {
      console.error('Error saving post:', error);
      setError('게시글 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">
            {id ? '게시글 수정' : '새 게시글 작성'}
          </h1>
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
            </div>
          </div>
        </div>
        <div className="form-row pt-2">
          <div className="col-md-12 col-10 text-end">
            <Button text={id ? "수정하기" : "작성하기"} onClick={handleSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeBoardDetail;