import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FreeBoard = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts'); // 서버에서 게시글 가져오기
                console.log('Posts fetched:', response.data); // 데이터 확인
                setPosts(response.data); // 상태 업데이트
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">FreeBoard</h2>
            <ul className="list-group mb-4">
                {currentPosts.length > 0 ? (
                    currentPosts.map(post => (
                        <li key={post.id} className="list-group-item">
                            <h5>{post.title}</h5>
                            <p>{post.content}</p>
                            <small>{new Date(post.date).toDateString()}</small>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">게시글이 없습니다.</li>
                )}
            </ul>

            {/* 페이지네이션 */}
            {posts.length > postsPerPage && (
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default FreeBoard;
