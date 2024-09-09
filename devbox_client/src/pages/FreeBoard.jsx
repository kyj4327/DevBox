import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/api-service';
import Pagination from '../components/Pagination';  // Pagination 컴포넌트 import

const FreeBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('게시글을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // HTML 태그 제거하는 함수
  const stripHtml = (html) => {
    return html.replace(/<[^>]+>/g, '');
  };

  // 현재 페이지의 게시글만 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">자유게시판</h2>
      <Link to="/community/freeboard/new" className="btn btn-primary mb-3">
        새 글 작성
      </Link>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <div className="list-group">
          {currentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/community/freeboard/post/${post.id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
              </div>
              <p className="mb-1">{stripHtml(post.content).substring(0, 100)}...</p>
              <small>작성자: {post.author}</small>
            </Link>
          ))}
        </div>
      )}
      <Pagination 
        // 여기에 필요한 props를 전달합니다
      />
    </div>
  );
};

export default FreeBoard;