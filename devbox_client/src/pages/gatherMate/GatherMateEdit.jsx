import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import WriteShort from "../../components/WriteShort";
import QuillEditor from "../../components/QuillEditor";
import WriteSelect from "../../components/WriteSelect";
import Swal from "sweetalert2";

function GatherMateEdit() {
  const [intro, setIntro] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [apply, setApply] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://devback.shop/gathermate/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setIntro(data.intro);
        setTitle(data.title);
        setContent(data.content);
        setApply(data.apply);
        setIsRecruiting(data.isRecruiting);
      } catch (error) {
        console.error("글 불러오기 중 오류 발생:", error);
        Swal.fire({
          title: "로드 실패",
          text: "글을 불러오는데 실패했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    };

    fetchPost();
  }, [postId]);

  const updateData = async () => {
    const updatedGatherMate = {
      intro,
      title,
      content,
      apply,
      isRecruiting,
      dateUpdated: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `https://devback.shop/gathermate/edit/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updatedGatherMate),
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("작성자가 아닙니다.");
        }
        throw new Error("글 수정에 실패했습니다.");
      }

      const data = await response.text();
      console.log("업데이트된 데이터:", data);

      Swal.fire({
        title: '수정 성공',
        text: data.message || "글이 수정되었습니다.",
        icon: 'success',
        confirmButtonText: '확인'
      }).then(() => {
        navigate(`/gathermate/detail/${postId}`);
      });
    } catch (error) {
      console.error("수정 실패:", error);
      Swal.fire({
        title: '수정 실패',
        text: error.message || "글 수정에 실패했습니다.",
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <div>
      <section className="container py-5">
        <div className="container py-4">
          <h1 className="h2 semi-bold-600 text-center mt-2">
            모여라 메이트 게시글 수정
          </h1>
          <p className="text-center pb-5 light-300">
            글을 수정하고 업데이트하세요!
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
        <div className="form-row py-2">
          <div className="col-md-12 col-10 d-flex justify-content-end">
            <Button text={"수정"} icon="edit" onClick={updateData} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default GatherMateEdit;
