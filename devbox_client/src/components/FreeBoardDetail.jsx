import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const FreeBoardDetail = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const isEditing = Boolean(id); // id가 있으면 수정 모드

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        if (isEditing) {
          const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
          if (isMounted) {
            setTitle(response.data.title);
            setContent(response.data.content);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        if (isMounted) {
          setError('게시글을 가져오는 데 실패했습니다. 다시 시도해 주세요.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isEditing) {
      fetchPost();
    }

    return () => {
      isMounted = false;
    };
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const postData = { title, content };

      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/posts/${id}`, postData);
      } else {
        await axios.post(`${API_BASE_URL}/api/posts`, postData);
      }

      navigate('/community/freeboard');
    } catch (error) {
      console.error('Error saving post:', error);
      setError('게시글 저장에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isEditing ? '게시글 수정' : '새 게시글 작성'}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? '저장 중...' : (isEditing ? '게시글 수정' : '게시글 작성')}
        </button>
      </form>
    </div>
  );
};

export default FreeBoardDetail;
