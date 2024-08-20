import { useLocation } from "react-router-dom";

const Banner = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    return (
        <div id="work_single_banner" class="bg-light w-100">
            <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                    <h1 class="banner-heading h2 pb-5 typo-space-line-center">{id}</h1>
                    <p class="banner-footer light-300">
                    AI / 클라우드 / 빅데이터 / 로봇으로의 기술혁신시대 IT 전문가가 되기 위한 국제공인 교육 및 라이센스 취득
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;