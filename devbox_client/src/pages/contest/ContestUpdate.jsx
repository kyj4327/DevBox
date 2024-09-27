import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';

const ContestUpdate = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [officialUrl, setOfficialUrl] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [host, setHost] = useState('');
    const [target, setTarget] = useState('');
    const [regStart, setRegStart] = useState('');
    const [regEnd, setRegEnd] = useState('');

    useEffect(() => {
        if (!user) {
            alert("로그인이 필요합니다.");
            navigate('/auth');
        } else if (user.role != "ROLE_ADMIN") {
            alert("권한이 없습니다.");
            navigate('/contest/list');
        }
    }, [user, navigate]);
    const token = localStorage.getItem('accessToken');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const contestId = search.get('contestId');
    useEffect(() => {
        async function get() {
            const url = `http://localhost:8080/contest/update?contestId=${contestId}`;
            const res = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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

    const inputFocus = (name) => {
        // alert(message);
        const element = document.getElementById(name);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
        }
    };

    const updateData = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        } else if (title.trim() === '') {
            inputFocus("title", "공모명을 입력해주세요.");
            setTitle('');
        } else if (host.trim() === '') {
            inputFocus("host", "주최/주관을 입력해주세요.");
            setHost('');
        } else if (target.trim() === '') {
            inputFocus("target", "참가대상을 입력해주세요.");
            setTarget('');
        } else if (regStart === '') {
            inputFocus("regStart", "접수시작 날짜를 선택해주세요.");
        } else if (regEnd === '') {
            inputFocus("regEnd", "접수마감 날짜를 선택해주세요.");
        } else if (regEnd < regStart) {
            alert("접수마감 날짜가 접수시작 날짜보다 이후여야 합니다.");
        } else if (officialUrl.trim() === '') {
            inputFocus("officialUrl", "공식 홈페이지 주소를 입력해주세요.");
            setOfficialUrl('');
        } else if (imgUrl.trim() === '') {
            inputFocus("imgUrl", "이미지 주소를 입력해주세요.");
            setImgUrl('');
        } else {
            try {
                const url = 'http://localhost:8080/contest/update';
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: contestId, title: title, officialUrl: officialUrl, imgUrl: imgUrl,
                        host: host, target: target, regStart: regStart, regEnd: regEnd
                    })
                });
                if (!response.ok) {
                    throw new Error("서버에서 오류가 발생했습니다.");
                }
                const data = await response.json();
                if (data.code === 200) {
                    alert('수정되었습니다.');
                    navigate('/contest/list');
                } else {
                    alert('다시 입력해주세요.');
                }
            } catch (error) {
                console.error("저장 중 오류 발생 : ", error);
                alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
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