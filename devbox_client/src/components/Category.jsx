import { Link } from "react-router-dom";

const Category = ({ text, isActive, onClick }) => {
    return (
        <Link className={`filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 ${isActive === text ? 'active' : ''}`}
            data-filter=".project"
            onClick={onClick}
        >{text}</Link>
    );
};

export default Category;