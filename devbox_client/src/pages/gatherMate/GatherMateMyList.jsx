import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Category from "../../components/Category";
import SearchSelect from "../../components/SearchSelect";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext"; // UserContext 사용
import Swal from "sweetalert2";

import "./GatherMateList.css";

// 아이콘들
import modeCommentIcon from "../../assets/img/icons/modeComment.svg";
import modeFavoriteIcon from "../../assets/img/icons/modeFavorite.svg";
import modevisibilityIcon from "../../assets/img/icons/modevisibility.svg";

function GatherMateMyList() {
  const { user } = useUser(); // UserContext -> user 가져오기
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0); // 총 게시글 개수 추가
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("제목&내용");
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  const navigate = useNavigate();
  const toWrite = () => {
    if (user) {
      navigate("/gathermate/write");
    } else {
      Swal.fire({
        icon: 'warning',
        title: '로그인 필요',
        text: '글을 작성하려면 로그인해야 합니다.',
        confirmButtonText: '확인'
      }).then(() => {
        navigate("/gathermate/list");
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, currentPage]); // searchKeyword와 searchType 추가

  const fetchData = async () => {
    let url = `https://devback.shop/gathermate/myposts?page=${
      currentPage - 1
    }&size=5&sort=id,desc`;

    if (searchKeyword) {
      url = `https://devback.shop/gathermate/myposts/search?keyword=${encodeURIComponent(
        searchKeyword
      )}&searchType=${encodeURIComponent(searchType)}&page=${
        currentPage - 1
      }&size=10&sort=id,desc`;
    }

    if (category !== "All" && !searchKeyword) {
      url += `&category=${encodeURIComponent(category)}`;
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
      setData(result.content || []);
      setTotalPages(result.totalPages || 0);
      setTotalPosts(result.totalPosts || 0); // 총 게시글 개수 설정

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
      setTotalPosts(0); // 에러 시 총 게시글 개수도 초기화
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

  const handleSelectChange = (value) => {
    setSearchType(value); // 선택된 값을 상태로 저장
  };

  return (
    <div className="mypage-content__wrapper">
      {/* <section className="container py-5"> */}
        {/* <div className="container py-5"> */}
          <div className="mypage-content__title-wrapper">
            <h5 className="mypage-content__title">모여라 메이트_내가 쓴 글</h5>
          </div>

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
          <form onSubmit={handleSearch} className="mb-3 search-form">
            <div className="search-select-container">
              <SearchSelect
                options={["내용 & 제목", "작성자"]} // 드롭다운 옵션
                value={searchType} // 현재 선택된 값
                onChange={handleSelectChange} // 값이 변경되면 호출
              />

              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="search-input"
              />
            </div>

            <button type="submit" className="search-button">
              검색
            </button>
          </form>
          {data.length > 0 ? (
            <div className="post-list">
              {data.map((post) => (
                <div key={post.id} className="post-item">
                  <Link
                    to={`/gathermate/detail/${post.id}`}
                    className="post-link"
                  >
                    <div className="post-header">
                      <div
                        className={`post-status ${
                          post.isRecruiting
                            ? "post-status-recruiting"
                            : "post-status-completed"
                        }`}
                      >
                        {post.isRecruiting ? "모집중" : "모집완료"}
                      </div>
                      <h3 className="post-title">
                        {post.title}
                        {post.commentCount > 0 && (
                          <span className="comment-count">
                            {" "}
                            [{post.commentCount}]
                          </span>
                        )}
                      </h3>
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
                        <span
                          className="post-author"
                          style={{ marginRight: "5px" }}
                        >
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
                          {post.views}
                        </span>
                        <span className="post-likes">
                          <img
                            src={modeFavoriteIcon}
                            alt="Like Icon"
                            width="16"
                            height="16"
                          />
                          {post.likeCount}
                        </span>
                        <span className="post-comment">
                          <img
                            src={modeCommentIcon}
                            alt="Comment Icon"
                            width="16"
                            height="16"
                          />
                          {post.commentCount}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>작성한 글이 없습니다.</p> // 메시지 수정
          )}
        {/* </div> */}
        {/* <div className="form-row pt-2">
          <div className="col-md-12 col-10 text-end">
            <Button text={"작성하기"} onClick={toWrite} />
          </div>
        </div> */}
      {/* </section> */}
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
export default GatherMateMyList;
