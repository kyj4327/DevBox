const WriteLong = ({ titleTag, name, value, onChange, contentDelete, onDelete, wordCount }) => {
    return (
        <div>
            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">
                {titleTag}
                {
                    contentDelete ?
                        <button type="button" className="btn px-4 light-300 border border-2"
                            style={{ marginLeft: '1rem', borderRadius: '10px' }} onClick={onDelete}>
                            <i className="fa-regular fa-trash-can"></i> 삭제
                        </button>
                        : ''
                }
            </h2>
            <p className="worksingle-footer py-3 text-muted light-300">
                <div className="col-12">
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control form-control-lg light-300" id={name} name={name} placeholder={titleTag}
                            value={value} onChange={onChange} />
                        <label htmlFor="floatingsubject light-300">{titleTag}</label>
                    </div>
                    {/* wordCount가 초과되었을 때만 p 태그 출력 */}
                    {value.length > wordCount && (
                        <p className="text-danger">최대 {wordCount}자까지 작성 가능합니다.</p>
                    )}
                </div>
            </p>
        </div>
    );
};

export default WriteLong;