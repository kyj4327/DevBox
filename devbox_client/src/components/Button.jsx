import './Button.css';

const Button = ({ text, icon, onClick }) => {
  return (
    <button type="submit" className="button_css border border-2" onClick={onClick}>
      <i className={`fas fa-${icon}`}></i> {text}
    </button>
  );
};

export default Button;