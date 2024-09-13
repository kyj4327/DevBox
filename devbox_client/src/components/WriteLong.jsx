const WriteLong = ({ titleTag, name, value, onChange }) => {
    return (
        <div>
            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">{titleTag}</h2>
            <p className="worksingle-footer py-3 text-muted light-300">
                <div className="col-12">
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control form-control-lg light-300" id={name} name={name} placeholder={titleTag}
                            value={value} onChange={onChange} />
                        <label htmlFor="floatingsubject light-300">{titleTag}</label>
                    </div>
                </div>
            </p>
        </div>
    );
};

export default WriteLong;