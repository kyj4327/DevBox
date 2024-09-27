import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";

import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import QuillEditor from "../../components/QuillEditor";

function NoticeWrite() {
  const { user, loading } = useUser();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  // 로그인 상태를 확인
  useEffect(() => {
    if (!loading && user && user.role !== "ROLE_ADMIN") {
      alert("권한이 없습니다.");
      navigate("/notice/list");
    }
  }, [user, navigate]);

  const saveData = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newNotice = {
      title,
      content,
      datePosted: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8080/notice/write", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newNotice),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const data = await response.json();
      navigate(`/notice/detail/${data.id}`);

      setTitle("");
      setContent("");

      alert("공지사항을 저장되었습니다.");
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("글 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return (
      <div>
        로그인 후 글쓰기가 가능합니다.{" "}
        <button onClick={() => navigate("/auth")}>로그인하기</button>
      </div>
    );
  }

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">공지사항</h1>
          <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
            <div className="contact-form row">
              <WriteLong
                titleTag={"제목"}
                name={"title"}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">
                내용
              </h2>
              <div className="col-lg-12 mb-4">
                <div className="form-floating">
                  <QuillEditor
                    value={content}
                    onChange={setContent}
                    height="450px"
                    placeholder={`공지사항 내용 입력란`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row pt-2">
          <div className="col-md-12 col-10 text-end">
            {/* 권한이 있을 때만 저장 버튼 렌더링 */}
            {user.role === "ROLE_ADMIN" && (
              <Button text={"저장하기"} onClick={saveData} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NoticeWrite;