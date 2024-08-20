import { useLocation } from "react-router-dom";
import Banner from "./Banner";

const DetailBasic = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    return (
        <div>
            <Banner />
            <section class="container py-5">
                <div class="row justify-content-center pb-4">
                    <div class="col-lg-8">
                        <div id="templatemo-slide-link-target" class="card mb-3">
                            <img class="img-fluid border rounded" src="http://edu.busanit.or.kr/image/5f2b1ec7-c058-44fe-b720-68ad0a636129.png" alt="Card image cap" />
                        </div>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">과정요약</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>모집기간: 2024.07.29 ~ 2024.08.23</li>
                            <li>교육기간: 2024.08.26 ~ 2024.09.25</li>
                            <li>모집인원: {id}</li>
                            <li>링크: {id}</li>
                        </p>
                    </div>
                </div>
                <div className="buttom">
                    <button>수강 신청</button>
                    <button>목록</button>
                </div>
               
            
            </section>
        </div>
    );
};

export default DetailBasic;