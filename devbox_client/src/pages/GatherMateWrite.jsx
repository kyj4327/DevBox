import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill의 스타일시트
import Button from "../components/Button";
import WriteLong from "../components/WriteLong";
import WriteShort from "../components/WriteShort";
import QuillEditor from "../components/QuillEditor";
import WriteSelect from "../components/WriteSelect";

function GatherMateWrite() {
  const [apply, setApply] = useState("");
  const [intro, setIntro] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveData = () => {
    const newGatherMate = {
      title,
      content,
      apply,
    };

    // 여기에 데이터를 DB에 저장하는 로직을 추가합니다.
    console.log("저장할 데이터:", newGatherMate);

    // 입력 필드 초기화
    setTitle("");
    setContent("");
    setApply("");
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
          <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
            <div className="contact-form row">
              <WriteSelect
                titleTag="말머리"
                name="intro"
                value={intro}
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
                  {/* QuillEditor 컴포넌트를 사용하여 content 상태와 연동 */}
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
