import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/freeboard.css";
import Pagination from "../../components/Pagination";
import { getAllPosts } from "../../services/api-service";
import Button from "../../components/Button";
import { useUser } from "../../components/context/UserContext";

const FreeBoard = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const navigate = useNavigate();
  const toWrite = () => {
    if (user) {
      navigate("/freeboard/write");
    } else {
      alert("글을 작성하려면 로그인해야 합니다.");
      navigate("/freeboard/list");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPosts();
        // 게시글을 최신순으로 정렬
        const sortedPosts = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("게시글을 불러오는 데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const stripHtml = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };

  const getTrimmedContent = (content) => {
    const text = stripHtml(content);
    return text.length > 10 ? text.substring(0, 10) + "..." : text;
  };

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
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식
    };
    return date.toLocaleString("ko-KR", options).replace(",", ""); // 한국어 형식으로 포맷
  };

  // if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">자유게시판</h1>
          <p className="text-center pb-5 light-300">
            자유롭게 의견을 나눠보세요.
            <br />
          </p>
          <div className="row justify-content-center my-5"></div>

          {posts.length > 0 ? (
            <div className="notice-list">
              <table className="notice-table">
                <thead>
                  <tr>
                    <th>글 번호</th>
                    <th>제목</th>
                    <th>작성자</th>
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
                      <td data-label="작성자" className="notice-author">
                        {post.author}
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
          ) : (
            <p>게시글이 존재하지 않습니다.</p>
          )}
        </div>

        <div className="notice-search-wrapper">
          {user && (
            <Button
              text={"작성하기"}
              onClick={toWrite}
              className="notice-write-button"
            />
          )}
        </div>
      </section>

      <Pagination pageData={pageData} handlePageChange={handlePageChange} />
    </div>
  );
};

export default FreeBoard;
