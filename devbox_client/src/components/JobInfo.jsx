import { Link } from "react-router-dom";

const JobInfo = ({ jobinfo, src, alt, text }) => {
    return (
        <Link to={`/jobinfo/${jobinfo}`} className="col-sm-6 col-lg-4 text-decoration-none">
            <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                <img className="card-img-top" src={src} alt={alt} />
                <div className="card-body">
                    <h3 className="card-title light-300 text-dark">{text}</h3>
                </div>
            </div>
        </Link>
    );
};

export default JobInfo;