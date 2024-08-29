import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../services/api-service';
import Comments from './Comments';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    };

    const handleEdit = () => {
        navigate(`/community/freeboard/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id);
                navigate('/community/freeboard');
            } catch (err) {
                console.error('Error deleting post:', err);
                setError('Failed to delete post. Please try again.');
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div className="container mt-5">
            <h1>{post.title}</h1>
            <p className="text-muted">Posted on: {formatDate(post.date)}</p>
            <div className="mb-4">{post.content}</div>
            <button className="btn btn-primary mr-2" onClick={handleEdit}>Edit</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <Comments postId={post.id} />
        </div>
    );
};

export default PostDetail;