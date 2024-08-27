import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const JobInfoFront = () => {
    const navigate = useNavigate();
    const toList = () => {
        navigate('/jobinfo/list');
    };
    return (
        <div>
            <Header />
            <div id="work_single_banner" className="bg-light w-100">
                <div className="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div className="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 className="banner-heading h2 pb-5 typo-space-line-center">프론트엔드(front-end)</h1>
                        <p className="banner-footer light-300">
                            프론트엔드 개발자는 웹 애플리케이션 또는 웹 사이트의 사용자 인터페이스(UI)를 개발하고 유지보수하는 역할을 담당하는 개발자입니다.
                            이들은 사용자와 직접 상호작용하는 부분을 설계하고 구현하며, 사용자 경험(UX)을 최적화하는데 중요한 역할을 합니다.
                            즉, 사용자가 화면에서 직접 보는 웹페이지의 구조, 디자인, 애니메이션, 반응형 기능 등을 구현하는 역할을 합니다.
                            주로 HTML, CSS, JavaScript와 같은 웹 기술을 사용하여 시각적인 요소와 인터랙션을 개발합니다.
                        </p>
                    </div>
                </div>
            </div>
            <section className="container py-5">
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">1. UI/UX 개발</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>디자인 구현 : 디자이너가 만든 시안을 웹 페이지로 구현합니다. HTML, CSS, JavaScript 등을 사용하여 정적 및 동적 콘텐츠를 만듭니다.</li>
                            <li>반응형 웹 디자인 : 다양한 기기(데스크탑, 태블릿, 모바일)에서 일관된 사용자 경험을 제공하기 위해 반응형 웹 디자인을 구현합니다.</li>
                            <li>애니메이션 및 인터랙션:사용자 경험을 개선하기 위해 애니메이션 효과나 동적 인터랙션을 구현합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">2. 프론트엔드 로직 및 상태 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>JavaScript 로직 구현 : 사용자 인터페이스의 동적 동작을 구현합니다. 예를 들어, 사용자 입력에 따른 폼 검증, 이벤트 처리 등을 포함합니다.</li>
                            <li>상태 관리 : Redux, MobX, Vuex와 같은 상태 관리 라이브러리를 사용하여 애플리케이션의 상태를 일관성 있게 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">3. API 연동</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>백엔드와의 통신 : 프론트엔드에서 필요한 데이터를 백엔드 API를 통해 가져오고, 해당 데이터를 UI에 반영합니다. 이를 위해 Ajax, Fetch API, Axios와 같은 기술을 사용합니다.</li>
                            <li>데이터 처리 및 변환 : 백엔드로부터 받은 데이터를 필요에 따라 변환하고 처리하여 UI에 적절히 표시합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">4. 성능 최적화</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>코드 최적화 : 웹 페이지의 로딩 속도 및 반응 속도를 개선하기 위해 코드의 효율성을 높이고, 불필요한 리소스 사용을 줄입니다.</li>
                            <li>리소스 관리 : 이미지, CSS, JavaScript 파일의 크기를 최적화하고, 필요한 경우 Lazy Loading과 같은 기법을 사용하여 성능을 개선합니다.</li>
                            <li>브라우저 호환성 : 다양한 브라우저 환경에서 일관된 성능과 UI를 제공하기 위해 크로스 브라우징 문제를 해결합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">5. 테스트 및 디버깅</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>UI 테스트 : 사용자 인터페이스가 의도한 대로 동작하는지 확인하기 위해 다양한 테스트(유닛 테스트, E2E 테스트)를 수행합니다.</li>
                            <li>디버깅 : 브라우저 개발자 도구 등을 사용하여 UI의 버그나 문제를 찾아 해결합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">6. 버전 관리 및 협업</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>Git 사용 : 코드의 버전 관리를 위해 Git을 사용하고, 팀원들과 협업하여 코드를 통합 및 관리합니다.</li>
                            <li>코드 리뷰 : 팀원 간의 코드 리뷰를 통해 코드 품질을 높이고, 문제를 사전에 방지합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">7. 디자인 시스템 및 컴포넌트 라이브러리 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>재사용 가능한 컴포넌트 개발 : 효율적인 개발을 위해 재사용 가능한 UI 컴포넌트를 설계하고 구현합니다.</li>
                            <li>디자인 시스템 관리 : 일관된 사용자 경험을 위해 색상, 타이포그래피, 버튼 스타일 등의 디자인 시스템을 정의하고 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">8. 문서화</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>기술 문서 작성 : 개발한 UI 컴포넌트, 사용된 라이브러리, 애플리케이션 구조 등에 대한 문서를 작성하여 유지보수성과 협업 효율을 높입니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">관련 기술 스택</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>프로그래밍 언어 : HTML, CSS, JavaScript</li>
                            <li>프레임워크 및 라이브러리 : React, Vue.js, Angular, Svelte</li>
                            <li>CSS 프레임워크 : Bootstrap, Tailwind CSS</li>
                            <li>빌드 도구 : Webpack, Babel, Vite</li>
                            <li>버전 관리 : Git, GitHub, GitLab</li>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 ml-auto mr-auto pt-3 pb-4">
                        <p className="text-muted light-300">
                            프론트엔드 개발자는 사용자와 가장 가까운 부분을 담당하며, 사용자 경험을 최적화하고 시각적 완성도를 높이는 역할을 합니다.
                            이들은 디자인과 기술을 결합하여 사용자에게 매끄럽고 직관적인 인터페이스를 제공합니다.
                        </p>
                    </div>
                </div>

                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'목록으로'} onClick={toList} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default JobInfoFront;