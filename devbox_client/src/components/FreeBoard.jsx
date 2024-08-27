import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const FreeBoard = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const postsPerPage = 8;
    const navigate = useNavigate();

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to fetch posts. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleNewPost = () => {
        navigate('/community/freeboard/new');
    };

    const handleViewPost = (postId) => {
        navigate(`/community/freeboard/${postId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">FreeBoard</h2>
            <button className="btn btn-primary mb-4" onClick={handleNewPost}>
                New Post
            </button>

            <ul className="list-group mb-4">
                {currentPosts.length > 0 ? (
                    currentPosts.map(post => (
                        <li key={post.id} className="list-group-item" onClick={() => handleViewPost(post.id)}>
                            <h5>{post.title}</h5>
                            <p>{post.content.substring(0, 100)}...</p>
                            <small>{new Date(post.date).toLocaleString()}</small>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No posts available</li>
                )}
            </ul>

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default FreeBoard;
