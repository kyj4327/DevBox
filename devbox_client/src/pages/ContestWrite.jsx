import Header from '../components/Header';
import WriteLong from '../components/WriteLong';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ContestWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [officialUrl, setOfficialUrl] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [host, setHost] = useState('');
    const [target, setTarget] = useState('');
    const [regStart, setRegStart] = useState('');
    const [regEnd, setRegEnd] = useState('');

    const saveData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://127.0.0.1:8080/contest/write';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ title: title, officialUrl: officialUrl, imgUrl: imgUrl, host: host, target: target, regStart: regStart, regEnd: regEnd })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('글 작성 완료');
                navigate('/contest/list');
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
                    <h1 class="h2 semi-bold-600 text-center mt-2">공모전 Write</h1>
                    <p class="text-center pb-5 light-300">대회/공모전의 세부요강은 주최사의 기획에 의해 내용이 변경될 수 있으니, 주최사의 공고를 반드시 확인해 보시기 바랍니다.</p>
                    <div class="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <div class="contact-form row">
                            <WriteLong titleTag={'공모명'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            <WriteLong titleTag={'주최/주관'} name={'host'} value={host} onChange={(e) => { setHost(e.target.value) }} />
                            <WriteLong titleTag={'참가대상'} name={'target'} value={target} onChange={(e) => { setTarget(e.target.value) }} />
                            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">접수기간</h2>
                            <p class="worksingle-footer py-3 text-muted light-300" style={{ display: 'flex' }}>
                                <div class="col-lg-6 mb-4">
                                    <div class="form-floating">
                                        <input type="date" class="form-control form-control-lg light-300" id="regStart" name="regStart" placeholder="시작"
                                            value={regStart} onChange={(e) => { setRegStart(e.target.value) }} />
                                        <label for="floatingsubject light-300">시작</label>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-4">
                                    <div class="form-floating">
                                        <input type="date" class="form-control form-control-lg light-300" id="regEnd" name="regEnd" placeholder="마감"
                                            value={regEnd} onChange={(e) => { setRegEnd(e.target.value) }} />
                                        <label for="floatingsubject light-300">마감</label>
                                    </div>
                                </div>
                            </p>
                            <WriteLong titleTag={'공식 홈페이지 주소'} name={'officialUrl'} value={officialUrl} onChange={(e) => { setOfficialUrl(e.target.value) }} />
                            <WriteLong titleTag={'이미지 주소'} name={'imgUrl'} value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                        </div>
                    </div>
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'저장하기'} onClick={saveData} />
                    </div>
                </div>
            </section >
            <Footer />
        </div >
    );
};

export default ContestWrite;