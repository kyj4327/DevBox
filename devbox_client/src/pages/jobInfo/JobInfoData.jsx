import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const JobInfoData = () => {
    const navigate = useNavigate();
    const toList = () => {
        navigate('/jobinfo/list');
    };

    return (
        <div>

            <div id="work_single_banner" className="bg-light w-100">
                <div className="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div className="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 className="banner-heading h2 pb-5 typo-space-line-center">데이터 엔지니어링(Data Engineering)</h1>
                        <p className="banner-footer light-300">
                            데이터 엔지니어링은 데이터의 수집, 저장, 처리, 분석을 위한 인프라와 파이프라인을 설계, 구축, 관리하는 것을 전문으로 하는 분야입니다.
                            데이터 엔지니어는 다양한 소스에서 데이터를 수집하고, 이를 변환하여 분석 가능하고, 비즈니스에 유용한 형태로 저장하는 데 중점을 둡니다.
                            이를 통해 데이터 과학자, 분석가 및 기타 비즈니스 부서가 필요한 데이터를 신속하게 활용할 수 있도록 지원합니다.
                            이들은 대규모 데이터 시스템을 설계하고 최적화하는 것이 주된 역할이며, 데이터 파이프라인의 구축 및 최적화를 통해 데이터의 정확성과 가용성을 보장합니다.
                        </p>
                    </div>
                </div>
            </div>
            <section className="container py-5">
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">1. 데이터 파이프라인 설계 및 구축</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터 수집 및 통합 : 다양한 데이터 소스(API, 데이터베이스, 로그, IoT 센서 등)에서 데이터를 수집하고, 이를 통합하여 분석 가능한 형태로 변환합니다.</li>
                            <li>ETL 프로세스 설계 : 데이터의 추출(Extract), 변환(Transform), 적재(Load) 과정을 자동화하여 데이터를 효율적으로 처리하고 저장합니다.</li>
                            <li>실시간 데이터 처리 : 스트리밍 데이터를 처리할 수 있는 파이프라인을 구축하여 실시간 분석을 가능하게 합니다. 이를 위해 Apache Kafka, Apache Flink, Spark Streaming 등의 도구를 사용합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">2. 데이터베이스 및 데이터 웨어하우스 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터베이스 설계 및 최적화 : 관계형 및 비관계형 데이터베이스(MySQL, PostgreSQL, MongoDB 등)를 설계하고, 쿼리 성능을 최적화합니다.</li>
                            <li>데이터 웨어하우스 구축 : 대규모 데이터를 저장하고 분석할 수 있는 데이터 웨어하우스를 구축합니다. (예: Amazon Redshift, Google BigQuery, Snowflake)</li>
                            <li>데이터 모델링 : 데이터의 구조를 설계하고, 효율적인 쿼리를 위해 데이터 스키마를 최적화합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">3. 데이터 파이프라인의 자동화 및 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>워크플로우 자동화 : Apache Airflow, Luigi 등과 같은 도구를 사용하여 데이터 파이프라인의 워크플로우를 자동화하고, 일정에 따라 데이터 처리 작업을 관리합니다.</li>
                            <li>데이터 파이프라인 모니터링 : 데이터 파이프라인의 상태를 모니터링하고, 오류를 감지하고 해결하여 데이터의 일관성과 가용성을 유지합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">4. 데이터 품질 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터 검증 및 클렌징 : 데이터의 정확성과 일관성을 보장하기 위해 데이터 검증 및 클렌징 과정을 설정하고 자동화합니다.</li>
                            <li>데이터 무결성 유지 : 데이터 중복, 누락, 이상치를 감지하고 수정하여 데이터의 무결성을 유지합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">5. 데이터 보안 및 접근 제어</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터 보안 관리 : 민감한 데이터를 보호하기 위해 암호화, 접근 제어, 익명화 등의 보안 조치를 설정하고 관리합니다.</li>
                            <li>데이터 접근 제어 : 사용자의 역할에 따라 데이터에 대한 접근 권한을 설정하고 관리하여 데이터의 안전한 사용을 보장합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">6. 빅데이터 처리 및 분석 지원</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>분산 데이터 처리 : Hadoop, Spark 등 빅데이터 기술을 사용하여 대규모 데이터의 분산 처리 및 분석을 지원합니다.</li>
                            <li>데이터 레이크 구축 : 정형 및 비정형 데이터를 통합하고 저장할 수 있는 데이터 레이크를 구축하여 다양한 데이터 분석을 가능하게 합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">7. 클라우드 데이터 인프라 관리</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>클라우드 기반 데이터 서비스 관리 : AWS, Google Cloud, Azure와 같은 클라우드 플랫폼에서 제공하는 데이터 관련 서비스를 관리하고 최적화합니다. (예: AWS S3, Google Cloud Storage)</li>
                            <li>데이터 마이그레이션 : 온프레미스에서 클라우드로, 또는 클라우드 간의 데이터 마이그레이션을 계획하고 실행합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">8. 데이터 거버넌스 및 규정 준수</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터 정책 수립 : 데이터 관리와 관련된 정책 및 절차를 수립하고, 조직의 데이터 거버넌스를 강화합니다.</li>
                            <li>규정 준수 관리 : GDPR, CCPA 등의 데이터 관련 규정을 준수하기 위해 필요한 절차를 구현하고 관리합니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">9. 협업 및 문서화</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>팀 간 협업 : 데이터 분석가, 데이터 과학자, 비즈니스 팀 등과 협업하여 필요한 데이터를 제공하고, 분석 작업을 지원합니다.</li>
                            <li>데이터 파이프라인 문서화 : 데이터 파이프라인의 설계, 구축, 유지보수 과정을 문서화하여 팀 내 지식을 공유하고, 유지보수성을 높입니다.</li>
                        </p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">관련 기술 스택</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>데이터 파이프라인 도구 : Apache Airflow, Apache NiFi, Luigi</li>
                            <li>빅데이터 기술 : Apache Hadoop, Apache Spark, Flink</li>
                            <li>데이터베이스 : MySQL, PostgreSQL, MongoDB, Cassandra, Redis</li>
                            <li>데이터 웨어하우스 : Amazon Redshift, Google BigQuery, Snowflake</li>
                            <li>스트리밍 플랫폼 : Apache Kafka, AWS Kinesis, Apache Flume</li>
                            <li>클라우드 플랫폼 : AWS, Google Cloud Platform (GCP), Microsoft Azure</li>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 ml-auto mr-auto pt-3 pb-4">
                        <p className="text-muted light-300">
                            데이터 엔지니어는 조직 내 데이터 흐름의 원활한 운영을 보장하는 중요한 역할을 담당합니다.
                            이들은 데이터를 효율적으로 수집, 저장, 처리하여 데이터 분석과 비즈니스 인사이트 도출을 지원하며, 데이터의 품질과 보안을 유지하기 위해 다양한 기술과 도구를 활용합니다.
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

export default JobInfoData;