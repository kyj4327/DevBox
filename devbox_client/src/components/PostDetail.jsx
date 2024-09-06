import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuillEditor from "./QuillEditor"; // 게시글 작성 시 사용하는 QuillEditor 가져오기

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // 게시글 불러오기
    axios.get(`/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setTitle(response.data.title); // 불러온 게시글 제목 세팅
        setContent(response.data.content); // 불러온 게시글 내용 세팅
      })
      .catch((error) => {
        console.error("게시글 불러오기 실패:", error);
      });
  }, [id]);

  const handleUpdate = () => {
    const updatedPost = { title, content };
    axios.put(`/api/posts/${id}`, updatedPost)
      .then((response) => {
        setPost(response.data);
        setIsEditing(false); // 수정 완료 후 수정 모드 종료
      })
      .catch((error) => {
        console.error("게시글 수정 실패:", error);
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      {isEditing ? (
        <div>
          <h2>게시글 수정</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="form-control mb-3"
          />
          <QuillEditor
            value={content}
            onChange={setContent}
            height="300px"
            placeholder="내용을 입력하세요"
          />
          <button className="btn btn-primary mt-3" onClick={handleUpdate}>
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <button className="btn btn-secondary mt-3" onClick={() => setIsEditing(true)}>
            수정
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
