import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Pagination from "../../components/Pagination";
import SearchSelect from "../../components/SearchSelect";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";
import BoardComments from "../../components/BoardComments";

import profilePic from "../../assets/img/profilePic.png";
import Swal from "sweetalert2";

import "./GreetingList.css";

// 아이콘들
import modeCommentIcon from "../../assets/img/icons/modeComment.svg";
import GreetingWrite from "./GreetingWrite";
import UserContact from "../../components/UserContact";

function GreetingList() {
  const { user } = useUser(); // UserContext -> user 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("제목&내용");
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const [expandedPostId, setExpandedPostId] = useState(null);

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };


  const navigate = useNavigate();
  const toWrite = () => {
    if (user) {
      navigate("/greeting/write");
    } else {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다."
      });
      navigate("/greeting/list");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    let url = `https://www.devback.shop/greeting/posts?page=${
      currentPage - 1
    }&size=10&sort=id,desc`;

    if (searchKeyword) {
      url = `https://www.devback.shop/greeting/posts/search?keyword=${encodeURIComponent(
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

  // 게시글 삭제 함수
  const deletePost = async (postId) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "삭제하시겠습니까?",
      text: "삭제 후에는 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#d33",
      cancelButtonText: "취소",
      cancelButtonColor: "#3085d6"
    });

    if (!confirmed.isConfirmed) return;

    try {
      const response = await fetch(
        `https://www.devback.shop/greeting/delete/${postId}`,
        {
          method: "DELETE", // 삭제 요청
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("작성자가 아닙니다.");
        }
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      Swal.fire({
        icon: "success",
        title: "삭제되었습니다."
      });
      fetchData(); // 삭제 후 리스트 갱신
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "삭제 중 오류가 발생했습니다.",
        text: error.message || "다시 시도해 주세요.",
      });
    }
  };

  const handlePostCreated = () => {
    setCurrentPage(1); // 페이지를 첫 페이지로 리셋
    fetchData(); // 데이터를 다시 가져옴
  };

  // 게시글 수정 시작 함수
  const startEditing = (postId, content) => {
    setEditingPostId(postId);
    setEditingContent(content);
  };

  // 편집 취소 함수
  const cancelEditing = () => {
    setEditingPostId(null);
    setEditingContent("");
  };

  // 수정된 게시글 저장 함수
  const saveEditedPost = async (postId) => {
    const updatedPost = {
      content: editingContent,
      dateUpdated: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `https://www.devback.shop/greeting/edit/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("작성자가 아닙니다.");
        }
        throw new Error("글 수정에 실패했습니다.");
      }

      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "수정되었습니다."
      });

      // 리스트에서 해당 게시글 업데이트
      setData((prevData) =>
        prevData.map((post) =>
          post.id === postId ? { ...post, content: editingContent } : post
        )
      );

      setEditingPostId(null);
      setEditingContent("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "수정 중 오류가 발생했습니다.",
        text: error.message || "다시 시도해 주세요.",
      });
    }
  };

  return (
    <div>
      <section className="container py-5">
        {/* <section className="container py-5" style={{ padding: "0px 0px" }}> */}
        <div className="container-inner py-5">
        <h1 className="h2 semi-bold-600 text-center mt-2">가입인사</h1>
        <p className="text-center pb-5 light-300">
          DevBox에 오신 것을 환영합니다.
          <br />
          BDIA 커뮤니티에 자신을 소개해보세요!
        </p>

        {user && <GreetingWrite onPostCreated={handlePostCreated} />}

        {data.length > 0 ? (
          <div className="post-list">
            {data.map((post) => (
              <div key={post.id} className="post-item">
                <div key={post.id} className="row p-2">
                  {editingPostId === post.id ? (
                    // 편집 모드일 때 렌더링
                    <div className="editing-form">
                      {/* Header */}
                      <div className="post-header d-flex justify-content-between align-items-center mb-2">
                        <div className="author-info d-flex align-items-center">
                          <img
                            src={profilePic}
                            alt="profile"
                            className="profile-image me-2"
                          />
                          <div className="author-details d-flex flex-column">
                            <span className="post-author fw-bold">
                              <UserContact
                                nickname={post.author}
                                nicknameStyle={{
                                  fontSize: "16px",
                                  color: "#212529",
                                  fontWeight: "bold",
                                }}
                              />
                            </span>
                            <span className="post-field">{post.field}</span>
                          </div>
                        </div>
                        <span className="post-time text-muted">
                          {formatDateTime(post.createdAt)}
                        </span>
                      </div>

                      {/* 수정 폼 */}
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="form-control"
                        style={{ height: "90px" }} // 높이를 200px로 설정

                      />

                      {/* 수정품 내부 저장 및 취소 버튼 */}
                      <div
                        className="greeting-edit-edit-actions"
                        style={{
                          marginTop: "15px",
                        }}
                      >
                        <span
                          className="greeting-edit-link me-2"
                          onClick={() => saveEditedPost(post.id)}
                        >
                          저장
                        </span>
                        <span
                          className="action-separator"
                          style={{
                            marginRight: "8px",
                          }}
                        >
                          |
                        </span>
                        <span
                          className="greeting-edit-link me-2"
                          onClick={cancelEditing}
                        >
                          취소
                        </span>
                      </div>
                    </div>
                  ) : (
                    // 일반 모드일 때 렌더링

                    <div className="greeting-post-link text-decoration-none text-dark">
                      {/* 작성자 정보 */}
                      <div className="post-header d-flex justify-content-between align-items-center mb-2">
                        <div className="author-info d-flex align-items-center">
                          <img
                            src={profilePic}
                            alt="profile"
                            className="profile-image me-2"
                          />
                          <div className="author-details d-flex flex-column">
                            <span className="post-author fw-bold">
                              <UserContact
                                nickname={post.author}
                                nicknameStyle={{
                                  fontSize: "16px",
                                  color: "#212529",
                                  fontWeight: "bold",
                                }}
                              />
                            </span>
                            <span className="post-field">{post.field}</span>
                          </div>
                        </div>
                        <span className="post-time text-muted">
                          {formatDateTime(post.createdAt)}
                        </span>
                      </div>
                      <hr />

                      {/* 내용 */}
                      <div className="post-content mb-2">
                        <div
                          className="text-muted light-300"
                          style={{
                            color: "black !important",
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            marginBottom: "30px",
                          }}
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </div>

                      {/* 댓글 수 */}
                      <div className="post-footer d-flex justify-content-between align-items-center">
                        <div
                          className="comment-section d-flex align-items-center"
                          onClick={() => toggleComments(post.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={modeCommentIcon}
                            alt="Comment Icon"
                            width="16"
                            height="16"
                            className="me-1"
                          />
                          <span className="greeting-post-comment">
                            댓글: {post.commentCount}
                          </span>
                        </div>
                        {/* 작성자일 경우 수정/삭제 버튼 표시 */}
                        {user && post.author === user.nickname && (
                          <div className="greeting-post-actions">
                            <span
                              className="greeting-edit-link me-2"
                              onClick={() =>
                                startEditing(post.id, post.content)
                              }
                            >
                              수정
                            </span>
                            <span
                              className="action-separator"
                              style={{
                                marginRight: "8px",
                              }}
                            >
                              |
                            </span>
                            <span
                              className="greeting-delete-link me-2"
                              onClick={() => deletePost(post.id)}
                            >
                              삭제
                            </span>
                          </div>
                        )}
                      </div>
                      {expandedPostId === post.id && (
                        <div className="comments-container mt-3 p-2">
                          <div className="row justify-content-center">
                            <div className="col-12">
                              <BoardComments
                                postId={post.id}
                                boardType="greeting"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data text-center">데이터가 없습니다.</p>
        )}
        </div>
      </section>

      <form
        onSubmit={handleSearch}
        className="search-form mb-3 d-flex justify-content-center"
        style={{ minHeight: "50px" }}
      >
        <div className="search-select-container">
          <SearchSelect
            options={["제목&내용", "작성자"]}
            value={searchType}
            onChange={handleSelectChange}
          />

          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="greeting-search-input"
            style={{width:"500px"}}
          />
        </div>

        <button type="submit" className="search-button">
          검색
        </button>
      </form>

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

export default GreetingList;
