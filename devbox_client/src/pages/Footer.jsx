const Footer = () => {
    return (
        <footer className="bg-secondary pt-4">
            <div className="container">
                <div className="row py-4">
                    <div className="col-lg-3 col-12 align-left">
                        <a className="navbar-brand" href="index.html">
                            <i className='bx bx-buildings bx-sm text-light'></i>
                            <span className="text-light h5">Dev</span> <span className="text-light h5 semi-bold-600">Box</span>
                        </a>
                        <p className="text-light my-lg-4 my-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut.
                        </p>
                        <ul className="list-inline footer-icons light-300">
                            <li className="list-inline-item m-0">
                                <a className="text-light" target="_blank" href="http://facebook.com/">
                                    <i className='bx bxl-facebook-square bx-md'></i>
                                </a>
                            </li>
                            <li className="list-inline-item m-0">
                                <a className="text-light" target="_blank" href="https://www.linkedin.com/">
                                    <i className='bx bxl-linkedin-square bx-md'></i>
                                </a>
                            </li>
                            <li className="list-inline-item m-0">
                                <a className="text-light" target="_blank" href="https://www.whatsapp.com/">
                                    <i className='bx bxl-whatsapp-square bx-md'></i>
                                </a>
                            </li>
                            <li className="list-inline-item m-0">
                                <a className="text-light" target="_blank" href="https://www.flickr.com/">
                                    <i className='bx bxl-flickr-square bx-md'></i>
                                </a>
                            </li>
                            <li className="list-inline-item m-0">
                                <a className="text-light" target="_blank" href="https://www.medium.com/">
                                    <i className='bx bxl-medium-square bx-md' ></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">Our Company</h2>
                        <ul className="list-unstyled text-light light-300">
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="index.html">BDIA</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="about.html">Notice</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="work.html">Information</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="pricing.html">Community</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="contact.html">FAQ</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">Our Works</h2>
                        <ul className="list-unstyled text-light light-300">
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="#">Branding</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="#">Business</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="#">Marketing</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="#">Social Media</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="#">Digital Solution</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bxs-chevron-right bx-xs'></i><a className="text-decoration-none text-light py-1" href="#">Graphic</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 my-sm-0 mt-4">
                        <h2 className="h4 pb-lg-3 text-light light-300">For Client</h2>
                        <ul className="list-unstyled text-light light-300">
                            <li className="pb-2">
                                <i className='bx-fw bx bx-phone bx-xs'></i><a className="text-decoration-none text-light py-1" href="tel:010-020-0340">010-020-0340</a>
                            </li>
                            <li className="pb-2">
                                <i className='bx-fw bx bx-mail-send bx-xs'></i><a className="text-decoration-none text-light py-1" href="mailto:info@company.com">info@company.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-100 bg-primary py-3">
                <div className="container">
                    <div className="row pt-2">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-lg-start text-center text-light light-300">
                                © Copyright 2021 Dev Box Company. All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-lg-end text-center text-light light-300">
                                Designed by <a rel="sponsored" className="text-decoration-none text-light" href="https://templatemo.com/" target="_blank"><strong>TemplateMo</strong></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;