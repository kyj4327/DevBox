import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, createPost, updatePost } from "../../services/api-service";
import { useUser } from "../../components/context/UserContext";
import Button from "../../components/Button";
import WriteLong from "../../components/WriteLong";
import WriteShort from "../../components/WriteShort";
import QuillEditor from "../../components/QuillEditor";
import "../../assets/css/freeboard.css";
import profilePic from "../../assets/img/profilePic.png";

const FreeBoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useUser(); // 유저 정보 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      // user가 없으면 로그인 페이지로 리다이렉트
      alert("로그인이 필요합니다.");
      navigate("/auth");
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
          console.error("게시글을 불러오는 데 실패했습니다.", error);
          setError("게시글을 불러오는 데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }
      const postData = { title, content, author: user.nickname };
      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      navigate("/freeboard/list");
    } catch (error) {
      console.error("게시글 저장에 실패했습니다.", error);
      setError(error.message || "게시글 저장에 실패했습니다.");
      if (error.message === "User not authenticated") {
        // 사용자 재인증 로직 (예: 로그인 페이지로 리다이렉트)
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
              <WriteShort
                type="text"
                titleTag="작성자"
                name="author"
                value={user ? user.nickname : ""} // 현재 로그인한 사용자의 닉네임
                readOnly
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
              text={id ? "수정하기" : "작성하기"}
              onClick={handleSubmit}
              className="btn-freeboard-write"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeBoardDetail;
