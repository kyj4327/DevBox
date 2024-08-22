import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav id="main_nav" className="navbar navbar-expand-lg navbar-light bg-white shadow">
            <div className="container d-flex justify-content-between align-items-center">
                <Link className="navbar-brand h1" to="/">
                    <i className='bx bx-buildings bx-sm text-dark'></i>
                    <span className="text-dark h4">Dev</span><span className="text-primary h4">Box</span>
                </Link>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler-success" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="navbar-toggler-success">
                    <div className="flex-fill mx-xl-5 mb-2">
                        <ul className="nav navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark">
                            <li className="nav-item">
                                <Link className="nav-link btn-outline-primary rounded-pill px-3" to="/bdia">BDIA</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn-outline-primary rounded-pill px-3" to="/notice">Notice</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn-outline-primary rounded-pill px-3" to="/information">Information</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn-outline-primary rounded-pill px-3" to="/community">Community</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn-outline-primary rounded-pill px-3" to="/faq">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar align-self-center d-flex">
                        <Link className="nav-link" to="#"><i className='bx bx-bell bx-sm bx-tada-hover text-primary'></i></Link>
                        <Link className="nav-link" to="#"><i className='bx bx-cog bx-sm text-primary'></i></Link>
                        <Link className="nav-link" to="#"><i className='bx bx-user-circle bx-sm text-primary'></i></Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;