import backend from '../assets/img/backend.png';
import frontend from '../assets/img/frontend.png';
import devops from '../assets/img/devops.png';
import cloud from '../assets/img/cloud.png';
import data from '../assets/img/data.webp';
import mobile from '../assets/img/mobile2.png';

const Basic = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '2em' }}>개발 직군 정보</h2>
            <section className="container py-5">
                <div className="row justify-content-center my-5">
                    <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                        <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 active" data-filter=".project" href="#">전체</a>
                        <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".business" href="#">부산</a>
                        <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">부산외</a>
                    </div>
                </div>
                <div className="row projects gx-lg-5">
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project marketing social business">
                        <div className="service-work overflow-hidden card mb-5 mx-5 m-sm-0">
                            <img className="card-img-top" src={backend} alt="제작자:IYIKON-Flaticon" />
                            <div className="card-body">
                                <h3 className="card-title light-300 text-dark">back-end</h3>
                                {/* <p className="card-text light-300 text-dark">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolor.
                                </p>
                                <span className="text-decoration-none text-primary light-300">
                                    Read more <i className='bx bxs-hand-right ms-1'></i>
                                </span> */}
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project graphic social">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src={frontend} alt="..." />
                            <div className="card-body">
                                <h3 className="card-title light-300 text-dark">front-end</h3>
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project marketing graphic business">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src={devops} alt="제작자:Freepik-Flaticon" />
                            <div className="card-body">
                                <h3 className="card-title light-300 text-dark">DevOps</h3>
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project social business">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src={cloud} alt="제작자:Freepik-Flaticon" />
                            <div className="card-body">
                                <h3 className="card-title light-300 text-dark">Cloud Engineering</h3>
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project marketing">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src={data} alt="..." />
                            <div className="card-body">
                                <h3 className="card-title light-300 text-dark">Data Engineering</h3>
                            </div>
                        </div>
                    </a>
                    <a href="work-single.html" className="col-sm-6 col-lg-4 text-decoration-none project marketing graphic">
                        <div className="service-work overflow-hidden card mx-5 mx-sm-0 mb-5">
                            <img className="card-img-top" src={mobile} alt="제작자:kliwir_art-Flaticon 제작자:Freepik-Flaticon" />
                            <div className="card-body">
                                <h3 className="card-title light-300 text-dark">Mobile</h3>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Basic;