import Header from '../components/Header';
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
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="company" name="company" placeholder="회사명"
                                        value={company} onChange={(e) => { setCompany(e.target.value) }} />
                                    <label for="floatingname light-300">회사명</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="area" name="area" placeholder="지역"
                                        value={area} onChange={(e) => { setArea(e.target.value) }} />
                                    <label for="floatingemail light-300">지역</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="job" name="job" placeholder="직군/직무"
                                        value={job} onChange={(e) => { setJob(e.target.value) }} />
                                    <label for="floatingphone light-300">직군/직무</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="career" name="career" placeholder="경력"
                                        value={career} onChange={(e) => { setCareer(e.target.value) }} />
                                    <label for="floatingphone light-300">경력</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control form-control-lg light-300" id="imgUrl" name="imgUrl" placeholder="이미지 주소"
                                        value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                                    <label for="floatingsubject light-300">이미지 주소</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control form-control-lg light-300" id="wantedUrl" name="wantedUrl" placeholder="원티드 주소"
                                        value={wantedUrl} onChange={(e) => { setWantedUrl(e.target.value) }} />
                                    <label for="floatingsubject light-300">원티드 주소</label>
                                </div>
                            </div>
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