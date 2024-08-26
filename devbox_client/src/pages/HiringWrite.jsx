import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HiringWrite = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState('');
    const [area, setArea] = useState('');
    const [job, setJob] = useState('');
    const [career, setCareer] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [wantedUrl, setWantedUrl] = useState('');

    const saveData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://127.0.0.1:8080/hiring/write';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ company: company, area: area, job: job, career: career, imgUrl: imgUrl, wantedUrl: wantedUrl })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('글 작성 완료');
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
                    <h1 class="h2 semi-bold-600 text-center mt-2">채용 공고 Write</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>

                    <div class="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <form class="contact-form row" method="post" action="#" role="form">
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="company" name="company" placeholder="회사명" />
                                    <label for="floatingname light-300">회사명</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="area" name="area" placeholder="지역" />
                                    <label for="floatingemail light-300">지역</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="job" name="job" placeholder="직군/직무" />
                                    <label for="floatingphone light-300">직군/직무</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control form-control-lg light-300" id="career" name="career" placeholder="경력" />
                                    <label for="floatingphone light-300">경력</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control form-control-lg light-300" id="imgUrl" name="imgUrl" placeholder="이미지 주소" />
                                    <label for="floatingsubject light-300">이미지 주소</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control form-control-lg light-300" id="wantedUrl" name="wantedUrl" placeholder="원티드 주소" />
                                    <label for="floatingsubject light-300">원티드 주소</label>
                                </div>
                            </div>
                            {/* <div class="col-12">
                                <div class="form-floating mb-3">
                                    <textarea class="form-control light-300" rows="8" placeholder="Message" id="floatingtextarea"></textarea>
                                    <label for="floatingtextarea light-300">Message</label>
                                </div>
                            </div> */}
                        </form>
                    </div>

                    {/* <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <div class="row p-2">
                            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                <input type='text' id='title' name='title'
                                    value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                <li style={{ listStyle: 'none' }}>
                                    <label>
                                        <input type="radio" name='selectJob'
                                            value='Web' onChange={(e) => { setSelectJob(e.target.value) }} /> Web
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }}
                                            value='DevOps' onChange={(e) => { setSelectJob(e.target.value) }} /> DevOps
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }}
                                            value='Cloud' onChange={(e) => { setSelectJob(e.target.value) }} /> Cloud
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }}
                                            value='Data' onChange={(e) => { setSelectJob(e.target.value) }} /> Data
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }}
                                            value='Mobile' onChange={(e) => { setSelectJob(e.target.value) }} /> Mobile
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }}
                                            value='Others' onChange={(e) => { setSelectJob(e.target.value) }} /> Others
                                    </label>
                                </li>
                                <li>
                                    <input type='text' id='content1' name='content1'
                                        value={content1} onChange={(e) => { setContent1(e.target.value) }} />
                                </li>
                                <li>
                                    <input type='text' id='content2' name='content2'
                                        value={content2} onChange={(e) => { setContent2(e.target.value) }} />
                                </li>
                            </div>
                            <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                url : <input type='text' id='link' name='link'
                                    value={link} onChange={(e) => { setLink(e.target.value) }} />
                            </div>
                        </div>
                    </div> */}

                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'저장하기'} onClick={saveData} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HiringWrite;