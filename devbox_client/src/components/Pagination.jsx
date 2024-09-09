import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="row">
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
                {[...Array(totalPages).keys()].map((number) => (
                    <div key={number + 1} className="btn-group me-2" role="group" aria-label="Page number group">
                        <button
                            type="button"
                            className={`btn ${currentPage === number + 1 ? 'btn-secondary text-white' : 'btn-light'}`}
                            onClick={() => onPageChange(number + 1)}
                        >
                            {number + 1}
                        </button>
                    </div>
                ))}
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