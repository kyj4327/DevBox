import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill의 기본 스타일시트

// Quill 에디터 설정을 위한 컴포넌트
function QuillEditor({ value, onChange, height, placeholder}) {
  // Quill 모듈과 포맷을 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "formula"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "formula",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={{ height }}
      placeholder={placeholder}
    />
  );
}

export default QuillEditor;