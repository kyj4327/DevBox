import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, createPost, updatePost } from '../services/api-service';

const FreeBoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const data = await getPost(id);
          setPost(data);
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

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (id) {
        await updatePost(id, post);
      } else {
        await createPost(post);
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
    <div className="container mt-5">
      <h2>{id ? '게시글 수정' : '새 게시글 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">작성자</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {id ? '수정' : '작성'}
        </button>
      </form>
    </div>
  );
};

export default FreeBoardDetail;