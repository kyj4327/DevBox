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
  const [data, setData] = useState([]);

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
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">자유게시판</h2>
      <Button text={"작성하기"} onClick={toWrite} />
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <div className="list-group">
          {currentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/freeboard/detail/${post.id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{post.title}</h5>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </div>
              <p className="mb-1">{getTrimmedContent(post.content)}</p>
              <small>작성자: {post.author}</small>
              <div className="post-meta">
                <span>조회수: {post.views}</span> |
                <span>댓글: {post.commentCount}</span> {/* 댓글 수 표시 */}
              </div>  
            </Link>
          ))}
        </div>
      )}
      <Pagination pageData={pageData} handlePageChange={handlePageChange} />
    </div>
  );
};

export default FreeBoard;
