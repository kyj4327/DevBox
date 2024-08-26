import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState(1); // 예시로 1로 설정

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/posts', {
                title,
                content,
                authorId,
                date: new Date().toISOString()
            });
            console.log('Post created:', response.data);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea
                        className="form-control"
                        id="content"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="authorId" className="form-label">작성자 ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="authorId"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">작성하기</button>
            </form>
        </div>
    );
};

export default PostForm;
