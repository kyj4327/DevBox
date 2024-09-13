import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const JobInfoCloud = () => {
    const navigate = useNavigate();
    const toList = () => {
        navigate('/jobinfo/list');
    };

    return (
        <div>
            <div id="work_single_banner" className="bg-light w-100">
                <div className="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div className="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 className="banner-heading h2 pb-5 typo-space-line-center">클라우드 엔지니어링(Cloud Engineering)</h1>
                        <p className="banner-footer light-300">
                            클라우드 엔지니어링은 클라우드 컴퓨팅 환경에서 인프라와 애플리케이션을 설계, 구축, 관리하는 것을 전문으로 하는 분야입니다.
                            클라우드 엔지니어는 조직이 퍼블릭, 프라이빗, 하이브리드 클라우드 환경에서 효율적으로 운영될 수 있도록
                            인프라를 설정하고, 최적화하며, 보안을 관리하고, 이를 통해 비용 효율성과 운영 효율성을 극대화하는 역할을 합니다.
                            이 직군은 AWS, Microsoft Azure, Google Cloud Platform(GCP) 등의 클라우드 플랫폼을 활용하여 다양한 서비스를 구축하고 운영합니다.
                        </p>
                    </div>
                </div>
            </div>
            <section className="container py-5">
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">1. 클라우드 인프라 설계 및 구축</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>인프라 아키텍처 설계 : 클라우드 환경에서 애플리케이션이 최적의 성능과 확장성을 갖추도록 인프라 아키텍처를 설계합니다.</li>
                            <li>인프라 구축 : 설계된 아키텍처에 따라 클라우드 인프라를 구축하고, 서버, 네트워크, 스토리지 등을 설정합니다.</li>
                            <li>자동화된 인프라 설정 : Terraform, CloudFormation과 같은 인프라 자동화 도구를 사용하여 인프라를 코드로 정의하고 자동으로 배포합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">2. 클라우드 보안 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>보안 설정 및 관리 : 클라우드 환경에서의 보안을 위해 가상 네트워크, 방화벽, IAM(Identity and Access Management) 설정 등을 관리합니다.</li>
                            <li>보안 모니터링 : 클라우드 리소스의 보안 상태를 모니터링하고, 잠재적인 위협을 사전에 방지하기 위한 대응책을 마련합니다.</li>
                            <li>규정 준수 및 보안 감사 : 조직이 준수해야 하는 규정에 따라 클라우드 환경을 설정하고, 정기적인 보안 감사를 수행합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">3. 리소스 관리 및 최적화</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>비용 관리 및 최적화 : 클라우드 리소스 사용량을 모니터링하고, 비용을 최적화하기 위해 리소스 사용 패턴을 분석하여 필요 없는 리소스를 정리하거나, 적절한 크기의 리소스로 조정합니다.</li>
                            <li>성능 최적화 : 애플리케이션의 성능을 높이기 위해 클라우드 리소스를 조정하고, 자동 확장 설정 등을 통해 성능을 최적화합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">4. 컨테이너화 및 오케스트레이션</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>컨테이너 관리 : Docker를 사용하여 애플리케이션을 컨테이너화하고, 이식성을 높이며, 일관된 실행 환경을 제공합니다.</li>
                            <li>오케스트레이션 관리 : Kubernetes, ECS, AKS와 같은 도구를 사용하여 컨테이너의 배포, 확장, 관리를 자동화합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">5. 클라우드 네트워크 설정</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>네트워크 설계 및 관리 : 클라우드 내에서 가상 네트워크(VPC, Subnet)를 설계하고, 네트워크 보안을 설정하며, 트래픽을 관리합니다.</li>
                            <li>VPN 및 연결 설정 : 온프레미스(사내) 시스템과 클라우드 시스템 간의 안전한 연결을 위해 VPN 또는 Direct Connect 등을 설정합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">6. 애플리케이션 배포 및 운영</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>애플리케이션 배포 : CI/CD 파이프라인을 구축하여 애플리케이션을 클라우드 환경에 지속적으로 통합하고 배포합니다.</li>
                            <li>운영 및 유지보수 : 배포된 애플리케이션의 운영을 모니터링하고, 문제 발생 시 신속하게 대응합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">7. 데이터베이스 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>클라우드 데이터베이스 설정 : 클라우드 기반의 데이터베이스(RDS, DynamoDB 등)를 설정하고, 데이터의 가용성 및 성능을 관리합니다.</li>
                            <li>백업 및 복구 : 데이터 손실에 대비하여 정기적인 백업을 설정하고, 필요 시 복구 작업을 수행합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">8. 클라우드 서비스 통합 및 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>서드파티 서비스 통합 : 클라우드 내에서 SaaS(Software as a Service) 및 다른 클라우드 서비스를 통합하여 조직의 요구사항을 충족시킵니다.</li>
                            <li>서비스 관리 : 클라우드에서 제공하는 다양한 서비스(서버리스, 데이터 분석 등)를 활용하여 솔루션을 개발하고 운영합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">9. 모니터링 및 로깅</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>클라우드 리소스 모니터링 : CloudWatch, Azure Monitor 등 클라우드 모니터링 도구를 사용하여 리소스의 상태를 실시간으로 모니터링합니다.</li>
                            <li>로그 분석 : 클라우드 환경에서 생성되는 로그 데이터를 수집, 분석하여 성능 문제나 보안 위협을 사전에 감지합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">10. 클라우드 마이그레이션</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>이그레이션 계획 및 실행 : 기존 온프레미스 시스템이나 다른 클라우드 환경에서 현재 클라우드 환경으로의 마이그레이션을 계획하고 실행합니다.</li>
                            <li>데이터 이전 : 데이터 손실 없이 안전하게 데이터를 이전하고, 마이그레이션 후 시스템 안정성을 확보합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">관련 기술 스택</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>클라우드 플랫폼 : AWS, Microsoft Azure, Google Cloud Platform (GCP)</li>
                            <li>인프라 자동화 도구 : Terraform, Ansible, CloudFormation, Pulumi</li>
                            <li>컨테이너 기술 : Docker, Kubernetes</li>
                            <li>데이터베이스 : Amazon RDS, Google Cloud SQL, Azure Cosmos DB</li>
                            <li>모니터링 도구 : AWS CloudWatch, Google Stackdriver, Azure Monitor</li>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 ml-auto mr-auto pt-3 pb-4">
                        <p className="text-muted light-300">
                            클라우드 엔지니어는 클라우드 환경에서 조직의 IT 인프라를 설계하고 최적화하는 중요한 역할을 맡고 있습니다.
                            이들은 클라우드 플랫폼의 다양한 서비스를 활용하여 안정적이고 확장 가능한 인프라를 구축하고, 이를 통해 비즈니스 목표를 달성할 수 있도록 지원합니다.
                        </p>
                    </div>
                </div>

                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'목록으로'} onClick={toList} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JobInfoCloud;