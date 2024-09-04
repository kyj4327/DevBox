import "./WriteSelect.css"; 

const WriteSelect = ({ titleTag, name, value, onChange, options }) => {
  return (
    <div className="col-lg-6 mb-4">

      <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">
        {titleTag}
      </h2>
      <p className="worksingle-footer py-3 text-muted light-300">

        <div className="form-floating">
          {/* 고유한 클래스 이름 custom-select 추가 */}
          <select
            className="form-control form-control-lg light-300 custom-select"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          >
            <option value="" disabled>
              말머리를 클릭해서 선택하세요
            </option>
            {options &&
              options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <label htmlFor={name} className="light-300"></label>
        </div>
      </p>
    </div>
  );
};

export default WriteSelect;
