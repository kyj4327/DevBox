// src/pages/MyPosts.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/freeboard.css";
import Pagination from "../../components/Pagination";
import { getUserPosts } from "../../services/api-service"; // 사용자의 게시글을 가져오는 함수
import Button from "../../components/Button";
import { useUser } from "../../components/context/UserContext";

const MyFreeboard = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getUserPosts(user.id); // 사용자의 게시글을 가져옵니다.
        // 게시글을 최신순으로 정렬
        const sortedPosts = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];
        setPosts(sortedPosts);
      } catch (error) {
        setError("게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserPosts();
    } else {
      navigate("/mypage/myfreeboard");
    }
  }, [user, navigate]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const pageData = {
    currentPage: currentPage,
    totalPage: totalPages,
    startPage: Math.max(1, currentPage - 4),
    endPage: Math.min(totalPages, currentPage + 4),
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    // const hours = String(date.getHours()).padStart(2, "0");   시 분이 필요할시 추가
    // const minutes = String(date.getMinutes()).padStart(2, "0");  시 분이 필요할시 추가
    return ` ${year}-${month}-${day}`; //${hours}:${minutes} 시 분이 필요할시 추가
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mypage-content__wrapper">
      <div className="mypage-content__title-wrapper">
        <h5 className="mypage-content__title">자유 게시판_내가 쓴 글</h5>
      </div>
      <div className="row justify-content-center my-5">
        <div className="notice-list">
          <table className="notice-table">
            <thead>
              <tr>
                <th>글 번호</th>
                <th>제목</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id} className="notice-item">
                  <td data-label="글 번호" className="notice-id">
                    {post.id}
                  </td>
                  <td data-label="제목" className="notice-title">
                    <Link to={`/freeboard/detail/${post.id}`}>
                      {post.title}
                    </Link>
                  </td>
                  <td data-label="작성일" className="notice-date">
                    {formatDate(post.createdAt)}
                  </td>
                  <td data-label="조회수" className="notice-views">
                    {post.views}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination pageData={pageData} handlePageChange={handlePageChange} />
    </div>
  );
};

export default MyFreeboard;
