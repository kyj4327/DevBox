import Header from '../components/Header';
import Footer from '../components/Footer';
import ListButton from '../components/ListButton';
import { useNavigate } from 'react-router-dom';

const JobInfoBack = () => {
    const navigate = useNavigate();
    const toList = () => {
        navigate('/jobinfo');
    };
    return (
        <div>
            <Header />
            <div id="work_single_banner" class="bg-light w-100">
                <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 class="banner-heading h2 pb-5 typo-space-line-center">백엔드(back-end)</h1>
                        <p class="banner-footer light-300">
                            백엔드 개발자는 웹 애플리케이션 또는 소프트웨어 시스템의 서버 측(백엔드)을 개발하고 유지보수하는 역할을 담당하는 개발자입니다.
                            사용자 인터페이스와 상호작용하는 프론트엔드와 달리, 백엔드는 사용자 인터페이스 뒤에서 동작하는 시스템의 핵심 로직을 설계하고 구현하며,
                            데이터베이스, 서버, 애플리케이션 로직 등을 관리합니다.
                        </p>
                    </div>
                </div>
            </div>
            <section class="container py-5">
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">1. 서버 관리 및 개발</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>서버 설정 및 관리 : 웹 애플리케이션이 실행될 서버 환경을 설정하고 최적화합니다. 서버의 성능, 보안, 안정성을 관리합니다.</li>
                            <li>서버 측 로직 개발 : 클라이언트의 요청을 처리하고 적절한 응답을 제공하는 서버 측 로직을 구현합니다. 이는 API, 인증, 권한 관리, 데이터 처리 등을 포함합니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">2. 데이터베이스 관리</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>데이터베이스 설계 및 구축 : 애플리케이션에 필요한 데이터 모델을 설계하고 데이터베이스를 구축합니다.</li>
                            <li>데이터베이스 최적화 : 데이터베이스 쿼리를 최적화하여 성능을 개선하고, 데이터 무결성을 유지합니다.</li>
                            <li>데이터베이스 관리 : 데이터베이스 백업, 복구, 마이그레이션 등을 수행합니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">3. API 개발 및 통합</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>RESTful API 및 GraphQL 개발 : 프론트엔드와 통신할 수 있는 API를 설계하고 구현합니다.</li>
                            <li>서드파티 서비스 통합 : 외부 서비스(API, 라이브러리 등)를 애플리케이션에 통합하여 기능을 확장합니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">4. 보안</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>보안 모니터링 및 관리 : 서버와 데이터의 보안을 유지하기 위한 방화벽, 암호화, 접근 제어 등을 설정하고 관리합니다.</li>
                            <li>취약점 분석 및 대응 : 잠재적인 보안 취약점을 분석하고, 보안 위협에 대응하는 방법을 구현합니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">5. 성능 최적화</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>코드 최적화 : 서버 응답 시간 단축, 리소스 사용량 감소 등의 성능 개선을 위해 코드 최적화를 진행합니다.</li>
                            <li>캐싱 전략 : 데이터의 중복 요청을 줄이기 위해 캐싱을 설정하고 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">6. 배포 및 유지보수</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>CI/CD 파이프라인 구축 : 애플리케이션의 지속적 통합 및 배포를 자동화하는 CI/CD 파이프라인을 설정하고 운영합니다.</li>
                            <li>애플리케이션 배포 : 새로운 버전의 애플리케이션을 안정적으로 배포하고, 버전 관리를 수행합니다.</li>
                            <li>모니터링 및 로그 관리 : 애플리케이션의 동작을 실시간으로 모니터링하고 로그를 분석하여 문제를 조기에 발견하고 해결합니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">7. 협업 및 문서화</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>기술 문서 작성 : 개발한 코드 및 시스템에 대한 문서를 작성하여 팀원 간의 지식을 공유하고, 유지보수성을 높입니다.</li>
                            <li>팀원과의 협업 : 프론트엔드 개발자, 디자이너, 프로젝트 매니저 등과 협업하여 프로젝트를 성공적으로 이끌어갑니다.</li>
                        </p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">관련 기술 스택</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>프로그래밍 언어 : Java, Python, Ruby, PHP, JavaScript (Node.js), Go 등</li>
                            <li>프레임워크 : Spring, Django, Express.js, Flask, Ruby on Rails 등</li>
                            <li>데이터베이스 : MySQL, PostgreSQL, MongoDB, Redis 등</li>
                            <li>기타 도구 : Docker, Kubernetes, Jenkins, Git 등</li>
                        </p>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-8 ml-auto mr-auto pt-3 pb-4">
                        <p class="text-muted light-300">
                            이처럼 백엔드 개발자는 웹 애플리케이션의 핵심적인 부분을 책임지며, 안정적이고 효율적인 시스템을 구축하기 위해 다양한 기술을 사용하고 많은 업무를 수행하므로, 고도의 기술력과 문제 해결 능력이 요구됩니다.
                        </p>
                    </div>
                </div>

                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <ListButton text={'목록으로'} onClick={toList} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default JobInfoBack;