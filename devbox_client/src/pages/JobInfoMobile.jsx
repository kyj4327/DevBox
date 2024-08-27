import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const JobInfoMobile = () => {
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
                        <h1 className="banner-heading h2 pb-5 typo-space-line-center">모바일 개발자(Mobile)</h1>
                        <p className="banner-footer light-300">
                            모바일 개발자는 스마트폰, 태블릿 등 모바일 기기에서 실행되는 애플리케이션을 설계, 개발, 유지보수하는 역할을 담당하는 소프트웨어 개발자입니다.
                            이들은 iOS, Android와 같은 모바일 운영체제를 대상으로 애플리케이션을 개발하며, 사용자 경험을 최적화하기 위해 UI/UX 디자인을 구현하고, 성능을 최적화합니다.
                        </p>
                    </div>
                </div>
            </div>
            <section className="container py-5">
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">1. 모바일 애플리케이션 개발</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>네이티브 애플리케이션 개발 : iOS(Swift, Objective-C) 또는 Android(Java, Kotlin)를 사용하여 특정 플랫폼에 최적화된 네이티브 애플리케이션을 개발합니다.</li>
                            <li>크로스 플랫폼 애플리케이션 개발 : React Native, Flutter, Xamarin과 같은 프레임워크를 사용하여 한 번의 코드 작성으로 여러 플랫폼(iOS, Android)에서 실행 가능한 애플리케이션을 개발합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">2. UI/UX 디자인 구현</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>UI 개발 : 디자이너가 제공한 시안에 따라 사용자 인터페이스를 구현하고, 모바일 기기 화면 크기에 맞게 반응형 레이아웃을 구성합니다.</li>
                            <li>UX 최적화 : 애플리케이션의 사용성을 높이기 위해 사용자 경험(UX)을 고려한 설계와 최적화를 수행합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">3. 애플리케이션 성능 최적화</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>성능 분석 및 개선 : 애플리케이션의 성능을 모니터링하고, 렌더링 속도, 메모리 사용량, 배터리 효율성 등을 최적화합니다.</li>
                            <li>로딩 시간 단축 : 애플리케이션의 초기 로딩 시간을 줄이기 위해 리소스 관리 및 코드 최적화를 수행합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">4. API 연동 및 백엔드 통합</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>API 개발 및 연동 : RESTful API, GraphQL 등을 사용하여 백엔드 서버와 통신하고, 필요한 데이터를 가져오거나 전송합니다.</li>
                            <li>실시간 데이터 처리 : 실시간 데이터를 필요로 하는 애플리케이션(채팅, 실시간 위치 공유 등)에서 웹소켓 또는 다른 실시간 통신 방식을 구현합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">5. 데이터 관리 및 저장소 연동</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>로컬 데이터베이스 관리 : SQLite, Realm, Core Data 등의 로컬 데이터베이스를 사용하여 애플리케이션 내부 데이터를 관리합니다.</li>
                            <li>클라우드 스토리지 연동 : Firebase, AWS S3와 같은 클라우드 스토리지를 사용하여 데이터를 저장하고 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">6. 테스트 및 디버깅</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>유닛 테스트 및 통합 테스트 : 애플리케이션의 각 모듈이 의도한 대로 작동하는지 확인하기 위해 유닛 테스트 및 통합 테스트를 작성하고 수행합니다.</li>
                            <li>버그 수정 및 디버깅 : 애플리케이션에서 발생하는 버그를 식별하고, 이를 디버깅하여 수정합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">7. 애플리케이션 배포 및 유지보수</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>앱스토어 배포 : iOS App Store, Google Play Store 등 플랫폼별 앱스토어에 애플리케이션을 배포하고 관리합니다.</li>
                            <li>업데이트 및 유지보수 : 새로운 기능 추가 및 기존 기능 개선, 버그 수정 등을 위해 애플리케이션을 정기적으로 업데이트하고 유지보수합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">8. 보안 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터 보안 : 사용자 데이터를 안전하게 보호하기 위해 암호화, 인증 및 권한 관리 등의 보안 조치를 구현합니다.</li>
                            <li>취약점 분석 및 대응 : 애플리케이션의 보안 취약점을 분석하고, 발견된 문제에 대응하여 보안성을 강화합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">9. 버전 관리 및 협업</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>버전 관리 : Git과 같은 버전 관리 시스템을 사용하여 소스 코드를 관리하고, 팀원들과 협업합니다.</li>
                            <li>코드 리뷰 : 코드 품질을 유지하기 위해 팀원 간의 코드 리뷰를 진행하여 코드의 가독성, 유지보수성 등을 개선합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">10. 새로운 기술 및 트렌드 학습</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>기술 트렌드 파악 : 모바일 개발 기술 및 플랫폼의 최신 동향을 파악하고, 이를 프로젝트에 반영합니다.</li>
                            <li>새로운 기술 도입 : 필요에 따라 새로운 기술이나 프레임워크를 도입하여 개발 효율성을 높이고, 사용자 경험을 개선합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">관련 기술 스택</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>프로그래밍 언어 : Swift, Objective-C (iOS), Kotlin, Java (Android)</li>
                            <li>크로스플랫폼 프레임워크 : React Native, Flutter, Xamarin</li>
                            <li>백엔드 연동 : RESTful API, GraphQL, Firebase</li>
                            <li>데이터베이스 : SQLite, Core Data (iOS), Room (Android), Realm</li>
                            <li>테스트 도구 : XCTest, JUnit, Espresso, Appium</li>
                            <li>CI/CD 도구 : Jenkins, GitLab CI, Fastlane</li>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 ml-auto mr-auto pt-3 pb-4">
                        <p className="text-muted light-300">
                            모바일 개발자는 사용자와 가장 가까운 소프트웨어를 개발하며, 다양한 디바이스에서 안정적이고 매끄러운 사용자 경험을 제공하는 데 집중합니다.
                            이들은 애플리케이션의 설계부터 배포, 유지보수까지 전반적인 개발 과정을 관리하며, 사용자 피드백을 반영하여 지속적으로 애플리케이션을 개선합니다.
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

export default JobInfoMobile;