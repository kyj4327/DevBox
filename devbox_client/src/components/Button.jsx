const Button = ({ text, onClick }) => {
    return (
        <button type="submit" class="btn btn-secondary text-white px-md-4 px-2 py-md-3 py-1 radius-0 light-300"
            onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;