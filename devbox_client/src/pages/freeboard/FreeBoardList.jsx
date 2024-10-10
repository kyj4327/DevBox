import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/freeboard.css";
import Pagination from "../../components/Pagination";
import { getAllPosts } from "../../services/api-service";
import Button from "../../components/Button";
import { useUser } from "../../components/context/UserContext";
import UserContact from "../../components/UserContact";

const FreeBoardList = () => {
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
        // 글 번호를 기준으로 정렬 (내림차순)
        const sortedPosts = Array.isArray(data)
          ? data.sort((a, b) => b.id - a.id)
          : [];
        setPosts(sortedPosts);
      } catch (error) {
        setError("게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
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
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    // const hours = String(date.getHours()).padStart(2, "0");   시 분이 필요할시 추가
    // const minutes = String(date.getMinutes()).padStart(2, "0");  시 분이 필요할시 추가
    return ` ${year}-${month}-${day}`; //${hours}:${minutes} 시 분이 필요할시 추가
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
                        <UserContact
                          nickname={post.author}
                          nicknameStyle={{
                            fontSize: "14.4px",
                            color: "#666666",
                          }}
                        />
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

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          {user && (
            <Button
              text="글쓰기"
              icon="pen"
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

export default FreeBoardList;
