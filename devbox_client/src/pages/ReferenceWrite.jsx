import Header from '../components/Header';
import Footer from '../components/Footer';
import ListButton from '../components/ListButton';
import { useNavigate } from 'react-router-dom';

const ReferenceWrite = () => {
    const navigate = useNavigate();
    const toList = () => {
        navigate('/reference/list');
    };
    return (
        <div>
            <Header />
            <section className="container py-5">
                <div class="container py-5">
                    <h1 class="h2 semi-bold-600 text-center mt-2">추천해요 Write</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
                    <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <div class="row p-2">
                            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                <h3>Coolors</h3>
                            </div>
                            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                <li style={{ listStyle: 'none' }}>기타</li>
                                <li>색 조합 사이트</li>
                                <li>회원가입하면 사용자가 색 설정 가능</li>
                            </div>
                            <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                <a href="https://coolors.co/" class="btn rounded-pill px-4 btn-primary light-300" target='_blank'>Link</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <ListButton text={'저장하기'} onClick={toList} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ReferenceWrite;