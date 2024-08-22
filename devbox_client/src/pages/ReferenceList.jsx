import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const ReferenceList = () => {
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/reference/write');
    };
    return (
        <div>
            <Header />
            <section className="container py-5">
                <div class="container py-5">
                    <h1 class="h2 semi-bold-600 text-center mt-2">추천해요</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
                    <div className="row justify-content-center my-5">
                        <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 active" data-filter=".project" href="#">All</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".business" href="#">Web</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">DevOps</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Cloud</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Data</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Mobile</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Others</a>
                        </div>
                    </div>
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
                    <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <div class="row p-2">
                            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                <h3>News API</h3>
                            </div>
                            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                <li style={{ listStyle: 'none' }}>웹 개발</li>
                                <li>헤드라인 News 기사를 가져올 수 있는 API</li>
                                <li>카테고리, 언어, 나라별로 나눠져있어 다양하게 활용 가능</li>
                            </div>
                            <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                <a href="https://newsapi.org/" class="btn rounded-pill px-4 btn-primary light-300" target='_blank'>Link</a>
                            </div>
                        </div>
                    </div>
                    <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <div class="row p-2">
                            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                <h3>gitignore</h3>
                            </div>
                            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                <li style={{ listStyle: 'none' }}>기타</li>
                                <li>gitignore를 생성해주는 사이트</li>
                                <li>키워드만 입력하면 자동으로 생성해줌</li>
                            </div>
                            <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                <a href="https://www.toptal.com/developers/gitignore/" class="btn rounded-pill px-4 btn-primary light-300" target='_blank'>Link</a>
                            </div>
                        </div>
                    </div>
                    <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <div class="row p-2">
                            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                <h3>공공데이터포털</h3>
                                수정 삭제
                            </div>
                            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                <li style={{ listStyle: 'none' }}>웹 개발</li>
                                <li>공공기관이 만들어내는 모든 자료나 정보</li>
                                <li>무료 오픈 API 찾을 수 있음</li>
                            </div>
                            <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                <a href="https://www.data.go.kr/" class="btn rounded-pill px-4 btn-primary light-300" target='_blank'>Link</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'작성하기'} onClick={toWrite} />
                    </div>
                </div>
            </section>
            <Pagination />
            <Footer />
        </div>
    );
};

export default ReferenceList;