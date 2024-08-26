const Pagination = (props) => {
    const pageData = props.pageData;

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= pageData.totalPage) {
            props.handlePageChange(pageNumber);
        }
    };

    return (
        <div className="row">
            <div className="btn-toolbar justify-content-center pb-4" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                    <button
                        type="button"
                        className="btn btn-secondary text-white"
                        onClick={() => handlePageChange(pageData.currentPage - 1)}
                        disabled={pageData.currentPage === 1}
                    >
                        Previous
                    </button>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Second group">
                    {Array.from({ length: pageData.endPage - pageData.startPage + 1 }, (_, index) => (
                        <button
                            key={pageData.startPage + index}
                            type="button"
                            className={`btn ${pageData.currentPage === pageData.startPage + index ? 'btn-primary' : 'btn-light'}`}
                            onClick={() => handlePageChange(pageData.startPage + index)}
                        >
                            {pageData.startPage + index}
                        </button>
                    ))}
                </div>

                <div className="btn-group" role="group" aria-label="Third group">
                    <button
                        type="button"
                        className="btn btn-secondary text-white"
                        onClick={() => handlePageChange(pageData.currentPage + 1)}
                        disabled={pageData.currentPage === pageData.totalPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
