import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Category from "../../components/Category";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../components/context/UserContext';  // UserContext 사용


import "./GatherMateList.css";

// 아이콘들
import modeCommentIcon from "../../assets/img/icons/modeComment.svg";
import modeFavoriteIcon from "../../assets/img/icons/modeFavorite.svg";
import modevisibilityIcon from "../../assets/img/icons/modevisibility.svg";

function GatherMateList() {
  const { user } = useUser();  // UserContext -> user 가져오기
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  const navigate = useNavigate();
  const toWrite = () => {
    if (user) {
      navigate("/gathermate/write");
    } else {
      alert("글을 작성하려면 로그인해야 합니다.");
      navigate("/gathermate/list"); 
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [category, currentPage]);

  const fetchData = async () => {
    let url = `http://127.0.0.1:8080/gathermate/posts?page=${
      currentPage - 1
    }&size=10&sort=id,desc`;
    if (searchKeyword) {
      url = `http://127.0.0.1:8080/gathermate/posts/search?keyword=${searchKeyword}&page=${
        currentPage - 1
      }&size=10&sort=id,desc`;
    }
    if (category !== "All") {
      url += `&category=${category}`;
    }

    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result.content || []);
      setTotalPages(result.totalPages || 0);

      // 페이지 그룹 계산
      const pageGroupSize = 10;
      const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
      const startPage = currentGroup * pageGroupSize + 1;
      const endPage = Math.min(
        (currentGroup + 1) * pageGroupSize,
        result.totalPages
      );

      setStartPage(startPage);
      setEndPage(endPage);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setTotalPages(0);
    }
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategory(e.target.textContent);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
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

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">모여라 메이트</h1>
          <p className="text-center pb-5 light-300">
            너! 나의 동료가 돼라!
            <br />
            BDIA에서 다양한 모임을 주최해보세요!
          </p>
          <div className="row justify-content-center my-5">
            <div className="filter-btns shadow-md rounded-pill text-center col-auto">
              <Category
                text={"All"}
                isActive={category}
                onClick={handleCategoryChange}
              />
              <Category
                text={"스터디"}
                isActive={category}
                onClick={handleCategoryChange}
              />
              <Category
                text={"공모전"}
                isActive={category}
                onClick={handleCategoryChange}
              />
              <Category
                text={"프로젝트"}
                isActive={category}
                onClick={handleCategoryChange}
              />
              <Category
                text={"식사"}
                isActive={category}
                onClick={handleCategoryChange}
              />
              <Category
                text={"기타"}
                isActive={category}
                onClick={handleCategoryChange}
              />
            </div>
          </div>
          <form onSubmit={handleSearch} className="mb-3">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
            <button type="submit">검색</button>
          </form>
          {data.length > 0 ? (
            <div className="post-list">
              {data.map((post) => (
                <div key={post.id} className="post-item">
                  <Link to={`/gathermate/detail/${post.id}`} className="post-link">
                    <div className="post-header">
                    <div className={`post-status ${post.recruiting ? 'post-status-recruiting' : 'post-status-completed'}`}>
          {post.recruiting ? "모집중" : "모집완료"}
        </div>
                      <h3 className="post-title">{post.title}</h3>
                    </div>

                    {/* 카테고리명 -> 해시태그 기능? */}
                    <div className="post-intro">
                      <span>#{post.intro}</span>
                    </div>

                    <div
                      className="post-meta"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* 왼쪽 작성자명, 시간 */}
                      <span className="post-info">
                        <span className="post-author" style={{ marginRight: "5px" }}>
                          {post.author} 
                        </span>
                        <span className="post-time">
                          {formatDateTime(post.createdAt)}
                        </span>
                      </span>

                      {/* 오른쪽 조회수, 추천수, 댓글수 */}
                      <div
                        className="post-interactions"
                        style={{ display: "flex", gap: "10px" }}
                      >
                        <span className="post-views">
                          <img
                            src={modevisibilityIcon}
                            alt="View Icon"
                            width="16"
                            height="16"
                          />
                          {post.views} 12
                        </span>
                        <span className="post-likes">
                          <img
                            src={modeFavoriteIcon}
                            alt="Like Icon"
                            width="16"
                            height="16"
                          />
                          {post.likes} 4
                        </span>
                        <span className="post-comment">
                          <img
                            src={modeCommentIcon}
                            alt="Comment Icon"
                            width="16"
                            height="16"
                          />
                          {post.comments} 3
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </div>
        <div className="form-row pt-2">
          <div className="col-md-12 col-10 text-end">
            <Button text={"작성하기"} onClick={toWrite} />
          </div>
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

export default GatherMateList;
