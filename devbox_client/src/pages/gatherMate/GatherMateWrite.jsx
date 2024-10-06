import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";

import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import WriteShort from "../../components/WriteShort";
import QuillEditor from "../../components/QuillEditor";
import WriteSelect from "../../components/WriteSelect";
import Swal from "sweetalert2";

function GatherMateWrite() {
  const { user, loading } = useUser(); // Context에서 유저 정보가져오기

  const [intro, setIntro] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [apply, setApply] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true);

  const navigate = useNavigate();

  // 로그인 상태를 확인
  useEffect(() => {
    if (!loading && !user) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
        icon: "warning",
        confirmButtonText: "확인",
      }).then(() => {
        navigate("/auth");
      });
    }
  }, [user, loading, navigate]);

  const saveData = async () => {
    if (!user) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인이 필요합니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    if (!title.trim()) {
      Swal.fire({
        title: "제목 입력 필요",
        text: "제목을 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    // quill -> html 제외 후 확인
    if (content.replace(/<[^>]*>?/gm, "").trim().length < 1) {
      Swal.fire({
        title: "내용 입력 필요",
        text: "내용을 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    const newGatherMate = {
      intro,
      title: title.trim(),
      content: content.trim(),
      apply,
      isRecruiting,
      datePosted: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://www.devback.shop/gathermate/write", {
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
      navigate(`/gathermate/detail/${data.id}`);

      setIntro("");
      setTitle("");
      setContent("");
      setApply("");
      setIsRecruiting(true);

      Swal.fire({
        title: "저장 성공",
        text: "글이 성공적으로 저장되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      Swal.fire({
        title: "저장 실패",
        text: "글 저장에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
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
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">모여라 메이트</h1>
          <p className="text-center pb-5 light-300">
            너! 나의 동료가 돼라!
            <br />
            BDIA에서 다양한 모임을 주최해보세요!
          </p>
          <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
            <div className="contact-form row">
              <WriteSelect
                titleTag="말머리"
                name="intro"
                value={intro || "말머리를 선택하세요"}
                onChange={(e) => setIntro(e.target.value)}
                options={["스터디", "공모전", "프로젝트", "식사", "기타"]}
              />

              <WriteShort
                type="text"
                titleTag="지원방법"
                name="apply"
                value={apply}
                onChange={(e) => setApply(e.target.value)}
              />
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
                    placeholder={`[모임 모집 내용 예시]\n- 모임 목적:\n- 모임 소개 및 개설 이유: \n- 지원 방법: 모임에 참여할 수 있는 방법을 남겨주세요.(ex 이메일, 오픈채팅방, 구글폼 등...)`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row pt-2">
          <div className="col-md-12 col-10 text-end">
            <Button text={"등록"} icon="pen" onClick={saveData} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default GatherMateWrite;
