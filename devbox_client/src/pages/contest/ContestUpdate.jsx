import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';
import InputScrollAndFocus from '../../components/InputScrollAndFocus';

const ContestUpdate = () => {
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
    const token = localStorage.getItem('accessToken');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const contestId = search.get('contestId');
    useEffect(() => {
        async function get() {
            const url = `${domain}/contest/update?contestId=${contestId}`;
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

    const validateFields = () => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            });
            return false;
        } else if (title.trim() === '') {
            InputScrollAndFocus("title", "공모명을 입력해주세요.");
            setTitle('');
            return false;
        } else if (host.trim() === '') {
            InputScrollAndFocus("host", "주최/주관을 입력해주세요.");
            setHost('');
            return false;
        } else if (target.trim() === '') {
            InputScrollAndFocus("target", "참가대상을 입력해주세요.");
            setTarget('');
            return false;
        } else if (regStart === '') {
            InputScrollAndFocus("regStart", "접수시작 날짜를 입력해주세요.");
            return false;
        } else if (regEnd === '') {
            InputScrollAndFocus("regEnd", "접수마감 날짜를 입력해주세요.");
            return false;
        } else if (regEnd < regStart) {
            InputScrollAndFocus("regEnd", "마감일이 시작일보다 빠릅니다.");
            // InputScrollAndFocus("regEnd", "접수마감 날짜가 접수시작 날짜보다 이후여야 합니다.");
            setRegEnd('');
            return false;
        } else if (officialUrl.trim() === '') {
            InputScrollAndFocus("officialUrl", "홈페이지 주소를 입력해주세요.");
            setOfficialUrl('');
            return false;
        } else if (imgUrl.trim() === '') {
            InputScrollAndFocus("imgUrl", "이미지 주소를 입력해주세요.");
            setImgUrl('');
            return false;
        }
        return true;
    };

    const updateData = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const url = `${domain}/contest/update`;
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
                Swal.fire({
                    icon: "success",
                    title: "수정되었습니다."
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
                title: "수정 중 오류가 발생했습니다. 다시 시도해주세요."
            });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            const result = await Swal.fire({
                title: "수정하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "수정",
                confirmButtonColor: "#3085d6",
                cancelButtonText: "취소",
                cancelButtonColor: "#d33",
            });
            if (result.isConfirmed) {
                updateData();
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
                    <Button text={'수정하기'} onClick={handleUpdate} />
                </div>
            </div>
        </section>
    );
};

export default ContestUpdate;