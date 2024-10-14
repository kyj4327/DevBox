import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, createPost, updatePost } from "../../services/api-service";
import { useUser } from "../../components/context/UserContext";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import QuillEditor from "../../components/QuillEditor";
import Swal from "sweetalert2";
import "../../assets/css/freeboard.css";

const FreeBoardWrite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요합니다."
      }).then(() => {
        navigate("/auth");
      });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const data = await getPost(id);
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "글을 불러오는데 실패했습니다."
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const validateForm = () => {
    if (!title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "제목을 입력해 주세요."
      });
      return false;
    }
    const strippedContent = stripHtml(content).trim();
    if (strippedContent.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "내용을 입력해 주세요."
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }
      const postData = { title, content, userId: user.id };
      let newPostId;
      if (id) {
        await updatePost(id, postData);
        newPostId = id;
      } else {
        const response = await createPost(postData);
        newPostId = response.id;
      }
      Swal.fire({
        icon: "success",
        title: id
        ? "수정되었습니다."
        : "저장되었습니다.",
      }).then(() => {
        navigate(`/freeboard/detail/${newPostId}`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "저장 중 오류가 발생했습니다."
      });
      if (error.message === "User not authenticated") {
        navigate("/auth");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <section className="container py-5">
        <div className="container py-5">
          <h1 className="h2 semi-bold-600 text-center mt-2">
            {id ? "게시글 수정" : "새 게시글 작성"}
          </h1>
          <p className="text-center pb-5 light-300">
            자유롭게 의견을 나누어 보세요!
          </p>
          <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
            <div className="contact-form row">
              <input
                type="hidden"
                name="author"
                value={user ? user.nickname : ""}
              />
              <WriteLong
                titleTag="제목"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                    placeholder="내용을 입력하세요."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row pt-2">
          <div className="col-md-12 col-10 text-end">
            <Button
              text={id ? "수정" : "등록"}
              icon={id ? "edit" : "pen"}
              onClick={handleSubmit}
              className="btn-freeboard-write"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeBoardWrite;