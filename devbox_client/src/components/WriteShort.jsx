const WriteShort = ({ type, titleTag, name, value, onChange }) => {
    return (
        <div class="col-lg-6 mb-4">
            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">{titleTag}</h2>
            <p class="worksingle-footer py-3 text-muted light-300">
                <div class="form-floating">
                    <input type={type} class="form-control form-control-lg light-300" id={name} name={name} placeholder={titleTag}
                        value={value} onChange={onChange} />
                    <label for="floatingsubject light-300">{titleTag}</label>
                </div>
            </p>
        </div>
    );
};

export default WriteShort;