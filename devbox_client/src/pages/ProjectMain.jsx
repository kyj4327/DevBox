import backend from '../assets/img/backend.png';
import frontend from '../assets/img/frontend.png';
import devops from '../assets/img/devops.png';
import cloud from '../assets/img/cloud.png';
import data from '../assets/img/data.webp';
import mobile from '../assets/img/mobile.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ProjectMain = (props) => {
    const navigate = useNavigate();
    console.log(props.list);

    return (

        <div>
            <h2 style={{ textAlign: 'center', marginTop: '2em' }}>프로젝트 자랑 게시판</h2>
            <section className="container py-5">

                <div className="row projects gx-lg-5">
                    {props.list && props.list.map((pro) => (

                        <a key={pro.id} href={`/project/detail?id=${pro.id}`} className="col-sm-6 col-lg-4 text-decoration-none project marketing social business">
                            <div className="service-work overflow-hidden card mb-4 mx-2 ">
                                <div className="card-body">
                                    <h3 className="card-title light-300 text-dark text-center">{pro.title}</h3>
                                    <h4 className="card-title light-300 text-dark text-center">{pro.name}</h4>

                                </div>
                            </div>
                        </a>
                    ))}
                    <div className="form-row pt-5">
                        <div className="col-md-12 col-10 text-end">
                            <Button text={'글쓰기'} onClick={() => { navigate('/project/write') }} />
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
};

export default ProjectMain;