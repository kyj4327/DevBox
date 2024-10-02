const WriteShort = ({ type, titleTag, name, value, onChange, wordCount }) => {
    return (
        <div className="col-lg-6">
            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>{titleTag}</h2>
            <p className="worksingle-footer py-3 text-muted light-300">
                <div className="col-12">
                    <div className="form-floating mb-4">
                        <input type={type} className="form-control form-control-lg light-300" id={name} name={name} placeholder={titleTag}
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

export default WriteShort;