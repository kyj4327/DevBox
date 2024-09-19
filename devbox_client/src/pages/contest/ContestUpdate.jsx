import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ContestUpdate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [officialUrl, setOfficialUrl] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [host, setHost] = useState('');
    const [target, setTarget] = useState('');
    const [regStart, setRegStart] = useState('');
    const [regEnd, setRegEnd] = useState('');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const contestId = search.get('contestId');
    useEffect(() => {
        async function get() {
            const url = `http://localhost:8080/contest/update?contestId=${contestId}`;
            const res = await fetch(url);
            const data = await res.json();
            setTitle(data.title);
            setOfficialUrl(data.officialUrl);
            setImgUrl(data.imgUrl);
            setHost(data.host);
            setTarget(data.target);
            setRegStart(data.regStart);
            setRegEnd(data.regEnd);
        }
        get();
    }, []);

    const updateData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://localhost:8080/contest/update';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id: contestId, title: title, officialUrl: officialUrl, imgUrl: imgUrl, host: host, target: target, regStart: regStart, regEnd: regEnd })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('수정되었습니다.');
                navigate('/contest/list');
            } else {
                alert('다시 입력해주세요.');
            }
        }
        send();
    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">공모전 Update</h1>
                <p className="text-center pb-5 light-300">대회/공모전의 세부요강은 주최사의 기획에 의해 내용이 변경될 수 있으니, 주최사의 공고를 반드시 확인해 보시기 바랍니다.</p>
                <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                    <div className="contact-form row">
                        <WriteLong titleTag={'공모명'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <WriteLong titleTag={'주최/주관'} name={'host'} value={host} onChange={(e) => { setHost(e.target.value) }} />
                        <WriteLong titleTag={'참가대상'} name={'target'} value={target} onChange={(e) => { setTarget(e.target.value) }} />
                        <WriteShort type={'date'} titleTag={'접수시작'} name={'regStart'} value={regStart} onChange={(e) => { setRegStart(e.target.value) }} />
                        <WriteShort type={'date'} titleTag={'접수마감'} name={'regEnd'} value={regEnd} onChange={(e) => { setRegEnd(e.target.value) }} />
                        <WriteLong titleTag={'공식 홈페이지 주소'} name={'officialUrl'} value={officialUrl} onChange={(e) => { setOfficialUrl(e.target.value) }} />
                        <WriteLong titleTag={'이미지 주소'} name={'imgUrl'} value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                    </div>
                </div>
            </div>
            <div className="form-row pt-2">
                <div className="col-md-12 col-10 text-end">
                    <Button text={'수정하기'} onClick={updateData} />
                </div>
            </div>
        </section>
    );
};

export default ContestUpdate;