import Header from '../components/Header';
import WriteLong from '../components/WriteLong';
import WriteShort from '../components/WriteShort';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HiringUpdate = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState('');
    const [area, setArea] = useState('');
    const [job, setJob] = useState('');
    const [career, setCareer] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [wantedUrl, setWantedUrl] = useState('');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const hiringId = search.get('hiringId');
    useEffect(() => {
        async function get() {
            const url = `http://127.0.0.1:8080/hiring/update?hiringId=${hiringId}`;
            const res = await fetch(url);
            const data = await res.json();
            setCompany(data.company);
            setArea(data.area);
            setJob(data.job);
            setCareer(data.career);
            setImgUrl(data.imgUrl);
            setWantedUrl(data.wantedUrl);
        }
        get();
    }, []);

    const updateData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://127.0.0.1:8080/hiring/update';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id: hiringId, company: company, area: area, job: job, career: career, imgUrl: imgUrl, wantedUrl: wantedUrl })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('글 수정 완료');
                navigate('/hiring/list');
            } else {
                alert('다시 입력해주세요.');
            }
        }
        send();
    };

    return (
        <div>
            <Header />
            <section className="container py-5">
                <div class="container py-5">
                    <h1 class="h2 semi-bold-600 text-center mt-2">채용 공고 Update</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
                    <div class="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <div class="contact-form row" method="post" action="#" role="form">
                            <WriteShort type={'text'} titleTag={'회사명'} name={'company'} value={company} onChange={(e) => { setCompany(e.target.value) }} />
                            <WriteShort type={'text'} titleTag={'지역'} name={'area'} value={area} onChange={(e) => { setArea(e.target.value) }} />
                            <WriteShort type={'text'} titleTag={'직군/직무'} name={'job'} value={job} onChange={(e) => { setJob(e.target.value) }} />
                            <WriteShort type={'text'} titleTag={'경력'} name={'career'} value={career} onChange={(e) => { setCareer(e.target.value) }} />
                            <WriteLong titleTag={'이미지 주소'} name={'imgUrl'} value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                            <WriteLong titleTag={'원티드 주소'} name={'wantedUrl'} value={wantedUrl} onChange={(e) => { setWantedUrl(e.target.value) }} />
                        </div>
                    </div>
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'수정하기'} onClick={updateData} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HiringUpdate;