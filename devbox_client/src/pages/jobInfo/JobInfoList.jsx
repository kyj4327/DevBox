import backend from '../../assets/img/backend.png';
import frontend from '../../assets/img/frontend.png';
import devops from '../../assets/img/devops.png';
import cloud from '../../assets/img/cloud.png';
import data from '../../assets/img/data.webp';
import mobile from '../../assets/img/mobile.png';

import JobInfo from '../../components/JobInfo';

const JobInfoList = () => {
    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">개발 직군 정보</h1>
                <p className="text-center pb-5 light-300">다양한 개발 직군에 대해서 알아봅시다.</p>
                <div className="row projects gx-lg-5">
                    <JobInfo jobinfo={'backend'} src={backend} alt={'제작자:IYIKON-Flaticon'} text={'back-end'} />
                    <JobInfo jobinfo={'frontend'} src={frontend} alt={'제작자: Freepik - Flaticon'} text={'front-end'} />
                    <JobInfo jobinfo={'devops'} src={devops} alt={'제작자:Freepik-Flaticon'} text={'DevOps'} />
                    <JobInfo jobinfo={'cloud'} src={cloud} alt={'제작자:Freepik-Flaticon'} text={'Cloud Engineering'} />
                    <JobInfo jobinfo={'data'} src={data} alt={''} text={'Data Engineering'} />
                    <JobInfo jobinfo={'mobile'} src={mobile} alt={'제작자: Freepik - Flaticon'} text={'Mobile'} />
                </div>
            </div>
        </section>
    );
};

export default JobInfoList;