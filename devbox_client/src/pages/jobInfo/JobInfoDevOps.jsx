import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const JobInfoDevOps = () => {
    const navigate = useNavigate();
    const toList = () => {
        navigate('/jobinfo/list');
    };

    return (
        <div>
            <div id="work_single_banner" className="bg-light w-100">
                <div className="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div className="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 className="banner-heading h2 pb-5 typo-space-line-center">데브옵스(DevOps)</h1>
                        <p className="banner-footer light-300">
                            데브옵스 개발자는 소프트웨어 개발(Development)과 IT 운영(Operations)을 통합하고 자동화하여
                            소프트웨어 개발 주기의 속도, 효율성, 안정성을 높이는 역할을 담당하는 전문가입니다.
                            이들은 코드 배포, 인프라 관리, 자동화, 모니터링 등 다양한 업무를 수행합니다.
                            데브옵스는 개발과 운영 사이의 장벽을 허물고 협업을 강화하는 것을 목표로 하며,
                            이를 통해 지속적인 통합(CI) 및 지속적인 배포(CD)를 구현하여 더 빠르고 안정적인 소프트웨어 배포를 가능하게 합니다.
                        </p>
                    </div>
                </div>
            </div>
            <section className="container py-5">
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">1. CI/CD 파이프라인 구축 및 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>지속적 통합(CI) : 개발자가 코드를 커밋할 때마다 자동으로 빌드, 테스트, 통합되도록 설정하여 코드 품질을 유지합니다. Jenkins, GitLab CI, CircleCI와 같은 도구를 사용합니다.</li>
                            <li>지속적 배포(CD) : 코드가 테스트를 통과하면 자동으로 프로덕션 환경에 배포되도록 설정하여 배포 과정을 자동화하고 신속하게 합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">2. 인프라 관리 및 자동화</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>인프라 구축 및 유지보수 : 서버, 네트워크, 데이터베이스 등의 인프라를 설정하고 관리합니다.</li>
                            <li>인프라 자동화 : Terraform, Ansible, Chef, Puppet과 같은 인프라 자동화 도구를 사용하여 인프라를 코드로 관리(IaC, Infrastructure as Code)합니다.</li>
                            <li>클라우드 인프라 관리 : AWS, Azure, Google Cloud와 같은 클라우드 서비스의 인프라를 설정하고 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">3. 모니터링 및 로깅</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>애플리케이션 및 서버 모니터링 : Prometheus, Grafana, Nagios와 같은 도구를 사용하여 시스템의 성능, 가용성, 리소스 사용량 등을 모니터링합니다.</li>
                            <li>로그 관리 및 분석 : ELK(Stack), Splunk 등의 도구를 사용하여 애플리케이션과 시스템의 로그를 수집하고 분석하여 문제를 조기에 발견하고 해결합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">4. 컨테이너화 및 오케스트레이션</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>컨테이너 관리 : Docker를 사용하여 애플리케이션을 컨테이너화하여 이식성을 높이고, 일관된 실행 환경을 제공합니다.</li>
                            <li>컨테이너 오케스트레이션 : Kubernetes, Docker Swarm 등의 도구를 사용하여 컨테이너의 배포, 확장, 관리를 자동화합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">5. 보안 및 규정 준수</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>보안 자동화 : 인프라와 애플리케이션에 대한 보안 정책을 자동화하고, CI/CD 파이프라인에 보안 테스트를 통합하여 보안 위협을 사전에 방지합니다.</li>
                            <li>접근 관리 및 인증 : 시스템과 데이터에 대한 접근 권한을 관리하고, 인증 및 권한 부여를 설정하여 보안을 강화합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">6. 성능 최적화 및 문제 해결</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>성능 모니터링 및 최적화 : 시스템의 성능 병목 현상을 식별하고, 최적화를 통해 성능을 개선합니다.</li>
                            <li>문제 해결 : 시스템이나 애플리케이션에서 발생하는 문제를 빠르게 분석하고 해결합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">7. 자동화 스크립트 및 도구 개발</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>자동화 스크립트 작성 : 반복적인 작업을 자동화하기 위해 Bash, Python, PowerShell 등의 스크립팅 언어를 사용하여 자동화 스크립트를 작성합니다.</li>
                            <li>도구 및 플러그인 개발 : DevOps 프로세스를 지원하기 위한 맞춤형 도구나 플러그인을 개발하여 팀의 효율성을 높입니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">8. 협업 및 커뮤니케이션</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>팀 간 협업 강화 : 개발, QA, 운영 팀 간의 협업을 촉진하여 전체 소프트웨어 개발 주기의 효율성을 높입니다.</li>
                            <li>문화 구축 : DevOps 문화를 팀 내에 전파하고, 지속적인 개선을 장려합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">9. 배포 및 릴리즈 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>버전 관리 및 릴리즈:소프트웨어의 버전을 관리하고, 안정적인 릴리즈를 계획하고 실행합니다.</li>
                            <li>롤백 및 재배포:문제가 발생한 배포를 신속하게 롤백하고, 재배포 과정을 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">관련 기술 스택</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>CI/CD 도구 : Jenkins, GitLab CI, CircleCI</li>
                            <li>클라우드 플랫폼 : AWS, Google Cloud, Azure</li>
                            <li>컨테이너 기술 : Docker, Kubernetes</li>
                            <li>자동화 도구 : Ansible, Terraform, Puppet, Chef</li>
                            <li>모니터링 도구 : Prometheus, Grafana, ELK Stack</li>
                            <li>버전 관리 : Git, GitHub, GitLab</li>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 ml-auto mr-auto pt-3 pb-4">
                        <p className="text-muted light-300">
                            데브옵스 개발자는 조직 내에서 개발팀과 운영팀의 경계를 허물고, 자동화와 효율적인 협업을 통해 빠르고 안정적인 소프트웨어 배포를 가능하게 하는 중요한 역할을 담당합니다.
                            이들은 다양한 도구와 기술을 사용하여 소프트웨어의 전체 수명 주기를 관리하며, 시스템의 복잡성을 관리하고, 지속적으로 개선하는 문화를 구축합니다.
                        </p>
                    </div>
                </div>

                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'목록'} icon="list" onClick={toList} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JobInfoDevOps;