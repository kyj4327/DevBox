import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, createPost, updatePost } from '../services/api-service';

const FreeBoardDetail = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    const fetchPost = async () => {
      if (isEditing) {
        setIsLoading(true);
        try {
          const data = await getPost(id);
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          console.error('Error fetching post:', error);
          setError('Failed to fetch post. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const postData = { title, content };

      if (isEditing) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }

      navigate('/community/freeboard');
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
};

export default FreeBoardDetail;
