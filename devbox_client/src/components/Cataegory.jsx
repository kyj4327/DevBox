const Category = ({ text, isActive, onClick }) => {
    return (
        <a className={`filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 ${isActive === text ? 'active' : ''}`}
            data-filter=".project" href=""
            onClick={onClick}
        >{text}</a>
    );
  };
  
  export default Category;