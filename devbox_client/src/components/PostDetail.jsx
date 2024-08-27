import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
        if (isMounted) {
          setPost(response.data);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        if (isMounted) {
          setError('게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleEdit = () => {
    navigate(`/community/freeboard/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/posts/${id}`);
        navigate('/community/freeboard');
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('게시글 삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="container mt-5">
      <h1>{post.title}</h1>
      <p className="text-muted">작성일: {new Date(post.date).toLocaleString()}</p>
      <div className="mb-4">{post.content}</div>
      <button className="btn btn-primary mr-2" onClick={handleEdit}>수정</button>
      <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default PostDetail;
