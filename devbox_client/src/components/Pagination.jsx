const Pagination = () => {
    return (
        <div className="row">
            <div className="btn-toolbar justify-content-center pb-4" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary text-white">Previous</button>
                </div>
                <div className="btn-group me-2" role="group" aria-label="Second group">
                    <button type="button" className="btn btn-light">1</button>
                </div>
                <div className="btn-group me-2" role="group" aria-label="Second group">
                    <button type="button" className="btn btn-secondary text-white">2</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                    <button type="button" className="btn btn-secondary text-white">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;