import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useUser } from '../../components/context/UserContext';

import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import WriteShort from "../../components/WriteShort";
import QuillEditor from "../../components/QuillEditor";
import WriteSelect from "../../components/WriteSelect";

function GatherMateWrite() {
  const { user } = useUser();  // Context에서 유저 정보가져오기
  const [intro, setIntro] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [apply, setApply] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true);


  const navigate = useNavigate();

  
 // 로그인 상태를 확인
 useEffect(() => {
  if (!user) {  // user가 없으면 로그인 페이지로 리다이렉트
    alert("로그인이 필요합니다.");
    navigate('/auth');
  }
}, [user, navigate]);

const saveData = async () => {
  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }

    const newGatherMate = {
      intro,
      title,
      content,
      apply,
      isRecruiting,
      datePosted: new Date().toISOString(),
    };
  
    try {
      const token = localStorage.getItem('accessToken');
  
      const response = await fetch("http://localhost:8080/gathermate/write", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newGatherMate),
      });
  
      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }
  
      const data = await response.json();
      navigate(`/gatherdetail/${data.id}`);
  
      setIntro("");
      setTitle("");
      setContent("");
      setApply("");
      setIsRecruiting(true);
  
      alert("글이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("글 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!user) {
    return <div>로그인 후 글쓰기가 가능합니다. <button onClick={() => navigate('/auth')}>로그인하기</button></div>;
  }
  // if (!isLoggedIn) {
  //   return <div>로그인 후 글쓰기가 가능합니다. <button onClick={() => navigate('/auth')}>로그인하기</button></div>;
  // }
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
                value={intro|| "말머리를 선택하세요"}
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
            <Button text={"저장하기"} onClick={saveData} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default GatherMateWrite;
