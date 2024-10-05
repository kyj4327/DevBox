import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";

import "react-quill/dist/quill.snow.css";

import Swal from "sweetalert2";
import profilePic from "../../assets/img/profilePic.png";
import UserContact from "../../components/UserContact";

function GreetingWrite({ onPostCreated }) {
  const { user, loading } = useUser(); // Context에서 유저 정보가져오기

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  // 로그인 상태를 확인
  useEffect(() => {
    if (!loading && !user) {
      // user가 없으면 로그인 페이지로 리다이렉트
      Swal.fire({
        icon: "warning",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
    }
  }, [user, loading]);

  const saveData = async () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
      });
      return;
    }

    // quill -> html 제외 후 확인
    if (content.replace(/<[^>]*>?/gm, "").trim().length < 1) {
      Swal.fire({
        icon: "warning",
        title: "내용 입력 필요",
        text: "내용을 입력해주세요.",
      });
      return;
    }

    const newGatherMate = {
      content: content.trim(),

      datePosted: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://devback.shop/greeting/write", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newGatherMate),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const data = await response.json();

      setContent("");

      Swal.fire({
        icon: "success",
        title: "작성 완료",
        text: "가입인사가 작성되었습니다.",
      }); // 부모 컴포넌트의 fetchData 함수 호출하여 리스트 갱신
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      Swal.fire({
        icon: "error",
        title: "저장 실패",
        text: "글 저장에 실패했습니다. 다시 시도해주세요.",
      });
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
      <h1 className="h5 semi-bold-600 text mt-2">가입인사</h1>
      <div className="author-info d-flex align-items-center">
        <img src={profilePic} alt="profile" className="profile-image me-2" />
        <div className="author-details d-flex flex-column">
          <span className="post-author fw-bold">
            <UserContact
              nickname={user.nickname}
              nicknameStyle={{
                fontSize: "16px",
                color: "#212529",
                fontWeight: "bold",
              }}
            />
          </span>
          <span className="post-field">{user.field}</span>
        </div>
      </div>
      <div className="contact-form row">
        <div className="col-lg-12 mb-4">
          <div className="form-floating position-relative">
            <textarea
              className="form-control"
              placeholder="자기 자신을 표현하고 반갑게 인사해봐요!"
              style={{ height: "150px", paddingRight: "100px" }} // 공간 확보
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {/* 버튼을 textarea 오른쪽에 위치시키기 */}
            <button
              type="button"
              className="btn btn-primary greeting-save-button"
              onClick={saveData}
              aria-label="글 저장하기"
            >
              등록
            </button>
          </div>
        </div>
        <hr />
      </div>
      {/* </section> */}
    </div>
  );
}

export default GreetingWrite;
