import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext"; // UserContext 사용
import Swal from "sweetalert2";

import "./NoticeList.css";

function NoticeList() {
  const { user } = useUser(); // UserContext -> user 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("제목&내용");
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  const navigate = useNavigate();
  const toWrite = () => {
    if (user) {
      navigate("/notice/write");
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인이 필요합니다.'
      }).then(() => {
        navigate("/notice/list");
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    let url = `https://www.devback.shop/notice/posts?page=${
      currentPage - 1
    }&size=10&sort=id,desc`;

    if (searchKeyword) {
      url = `https://www.devback.shop/notice/posts/search?keyword=${encodeURIComponent(
        searchKeyword
      )}&searchType=${encodeURIComponent(searchType)}&page=${
        currentPage - 1
      }&size=10&sort=id,desc`;
    }
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.posts && Array.isArray(result.posts)) {
        setData(result.posts);
        setTotalPages(result.totalPages || 0);
        setCurrentPage(result.currentPage + 1);

        // 페이지 그룹 계산
        const pageGroupSize = 10;
        const currentGroup = Math.floor(result.currentPage / pageGroupSize);
        const startPage = currentGroup * pageGroupSize + 1;
        const endPage = Math.min(
          (currentGroup + 1) * pageGroupSize,
          result.totalPages
        );

        setStartPage(startPage);
        setEndPage(endPage);
      } else {
        setData([]);
        setTotalPages(0);
      }
    } catch (error) {
      setData([]);
      setTotalPages(0);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    fetchData();
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    // 페이지 번호 업데이트
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // 페이지 번호가 유효하면 업데이트
    }
  };

  // 시간: 년월일시분
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSelectChange = (value) => {
    setSearchType(value); // 선택된 값을 상태로 저장
  };

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">공지사항</h1>
          <p className="text-center pb-5 light-300">
            공지 공지 공지사항입니다.
            <br />
          </p>
          <div className="row justify-content-center my-5"></div>

          {data.length > 0 ? (
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
                  {data.map((post) => (
                    <tr key={post.id} className="notice-item">
                      <td data-label="글 번호" className="notice-id">
                        {post.id}
                      </td>
                      <td data-label="제목" className="notice-title">
                        <Link to={`/notice/detail/${post.id}`}>
                          {post.title}
                        </Link>
                      </td>
                      <td data-label="작성자" className="notice-author">
                        {post.author}
                      </td>
                      <td data-label="작성일" className="notice-date">
                        {formatDateTime(post.createdAt)}
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
          <form onSubmit={handleSearch} className="mb-3 notice-search-form">
            <div className="notice-search-select-container">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="검색할 공지사항의 제목 또는 내용을 입력하세요"
                className="notice-search-input"
              />
            </div>
            <button type="submit" className="notice-search-button">
              검색
            </button>
          </form>

          {user?.role === "ROLE_ADMIN" && (
            <Button
              text={"글쓰기"}
              onClick={toWrite}
              className="notice-write-button"
              icon="pen"
            />
          )}
        </div>
      </section>

      <Pagination
        pageData={{
          currentPage: currentPage,
          totalPage: totalPages,
          startPage: startPage,
          endPage: endPage,
        }}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default NoticeList;
