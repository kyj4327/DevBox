import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getPost, createPost, updatePost, getCommentsByPostId, createComment, deleteComment } from '../services/api-service';

const FreeBoard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">자유게시판</h2>
      <Link to="/community/freeboard/new" className="btn btn-primary mb-3">
        새 글 작성
      </Link>
      <div className="list-group">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/community/freeboard/post/${post.id}`}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{post.title}</h5>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
            <p className="mb-1">{post.content.substring(0, 100)}...</p>
            <small>작성자: {post.author}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FreeBoard;