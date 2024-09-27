import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import QuillEditor from "../../components/QuillEditor";

function NoticeEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/notice/posts/${postId}`);
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);

      } catch (error) {
        console.error("글 불러오기 중 오류 발생:", error);
        alert("글을 불러오는데 실패했습니다.");
      }
    };

    fetchPost();
  }, [postId]);

  const toList = () => {
    navigate("/gatherlist");
  };
  
  const updateData = async () => {
    const updatedNotice = {
      title,
      content,
      dateUpdated: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:8080/notice/edit/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(updatedNotice),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("작성자가 아닙니다.");
        }
        throw new Error("글 수정에 실패했습니다.");
      }

      const data = await response.text();
      console.log("업데이트된 데이터:", data);

       alert(data.message || "글이 성공적으로 수정되었습니다.");
      navigate(`/notice/detail/${postId}`);
    } catch (error) {
      console.error("수정 실패:", error);
      alert(error.message || "글 수정에 실패했습니다.");
    }
  };


  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">모여라 메이트 게시글 수정</h1>
          <p className="text-center pb-5 light-300">
            글을 수정하고 업데이트하세요!
          </p>
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
                    placeholder={``}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row pt-2">

          <div className="col-md-12 col-10 text-end">
          <Button text={"목록으로"} onClick={toList}/>
          <Button text={"수정하기"} onClick={updateData} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NoticeEdit;