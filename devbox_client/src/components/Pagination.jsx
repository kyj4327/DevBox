import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (!currentPage || !totalPages || typeof onPageChange !== 'function') {
        return null; // 필요한 props가 없으면 아무것도 렌더링하지 않음
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="btn-toolbar justify-content-center pb-4" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                    <button
                        type="button"
                        className="btn btn-secondary text-white"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Second group">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            type="button"
                            className={`btn ${currentPage === number ? 'btn-primary' : 'btn-light'}`}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                <div className="btn-group" role="group" aria-label="Third group">
                    <button
                        type="button"
                        className="btn btn-secondary text-white"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;