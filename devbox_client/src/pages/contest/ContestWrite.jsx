import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';
import InputScrollAndFocus from '../../components/InputScrollAndFocus';

const ContestWrite = () => {
    const domain = "http://localhost:8080";

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
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            }).then(() => {
                navigate('/auth');
            });
        } else if (user.role != "ROLE_ADMIN") {
            Swal.fire({
                icon: "error",
                title: "권한이 없습니다."
            }).then(() => {
                navigate('/contest/list');
            });
        }
    }, [user, navigate]);

    const saveData = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            });
            return;
        } else if (title.trim() === '') {
            InputScrollAndFocus("title", "공모명을 입력해주세요.");
            setTitle('');
        } else if (host.trim() === '') {
            InputScrollAndFocus("host", "주최/주관을 입력해주세요.");
            setHost('');
        } else if (target.trim() === '') {
            InputScrollAndFocus("target", "참가대상을 입력해주세요.");
            setTarget('');
        } else if (regStart === '') {
            InputScrollAndFocus("regStart", "접수시작 날짜를 입력해주세요.");
        } else if (regEnd === '') {
            InputScrollAndFocus("regEnd", "접수마감 날짜를 입력해주세요.");
        } else if (regEnd < regStart) {
            InputScrollAndFocus("regEnd", "마감일이 시작일보다 빠릅니다.");
            setRegEnd('');
        } else if (officialUrl.trim() === '') {
            InputScrollAndFocus("officialUrl", "홈페이지 주소를 입력해주세요.");
            setOfficialUrl('');
        } else if (imgUrl.trim() === '') {
            InputScrollAndFocus("imgUrl", "이미지 주소를 입력해주세요.");
            setImgUrl('');
        } else {
            const token = localStorage.getItem('accessToken');
            try {
                const url = `${domain}/contest/write`;
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title, officialUrl: officialUrl, imgUrl: imgUrl,
                        host: host, target: target, regStart: regStart, regEnd: regEnd
                    })
                });
                if (!response.ok) {
                    throw new Error("서버에서 오류가 발생했습니다.");
                }
                const data = await response.json();
                if (data.code === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "저장되었습니다."
                    }).then(() => {
                        navigate('/contest/list');
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "다시 입력해주세요."
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "저장 중 오류가 발생했습니다. 다시 시도해주세요."
                });
            }
        }
    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">공모전</h1>
                <p className="text-center pb-5 light-300">대회/공모전의 세부요강은 주최사의 기획에 의해 내용이 변경될 수 있으니, 주최사의 공고를 반드시 확인해 보시기 바랍니다.</p>
                <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                    <div className="contact-form row">
                        <WriteLong titleTag={'공모명'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <WriteLong titleTag={'주최/주관'} name={'host'} value={host} onChange={(e) => { setHost(e.target.value) }} />
                        <WriteLong titleTag={'참가대상'} name={'target'} value={target} onChange={(e) => { setTarget(e.target.value) }} />
                        <WriteShort type={'date'} titleTag={'접수시작'} name={'regStart'} value={regStart} onChange={(e) => { setRegStart(e.target.value) }} />
                        <WriteShort type={'date'} titleTag={'접수마감'} name={'regEnd'} value={regEnd} onChange={(e) => { setRegEnd(e.target.value) }} />
                        <WriteLong titleTag={'홈페이지 주소'} name={'officialUrl'} value={officialUrl} onChange={(e) => { setOfficialUrl(e.target.value) }} />
                        <WriteLong titleTag={'이미지 주소'} name={'imgUrl'} value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                    </div>
                </div>
            </div>
            <div className="form-row pt-2">
                <div className="col-md-12 col-10 text-end">
                    <Button text={'저장하기'} onClick={saveData} />
                </div>
            </div>
        </section >
    );
};

export default ContestWrite;