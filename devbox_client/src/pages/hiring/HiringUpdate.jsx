import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';
import InputScrollAndFocus from '../../components/InputScrollAndFocus';

const HiringUpdate = () => {
    const domain = "http://localhost:8080";

    const { user } = useUser();
    const navigate = useNavigate();

    const [company, setCompany] = useState('');
    const [area, setArea] = useState('');
    const [job, setJob] = useState('');
    const [career, setCareer] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [wantedUrl, setWantedUrl] = useState('');

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
                navigate('/hiring/list');
            });
        }
    }, [user, navigate]);
    const token = localStorage.getItem('accessToken');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const hiringId = search.get('hiringId');
    useEffect(() => {
        async function get() {
            const url = `${domain}/hiring/update?hiringId=${hiringId}`;
            const res = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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

    const updateData = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            });
            return;
        } else if (company.trim() === '') {
            InputScrollAndFocus("company", "회사명을 입력해주세요.");
            setCompany('');
        } else if (area.trim() === '') {
            InputScrollAndFocus("area", "지역을 입력해주세요.");
            setArea('');
        } else if (job.trim() === '') {
            InputScrollAndFocus("job", "직군/직무를 입력해주세요.");
            setJob('');
        } else if (career.trim() === '') {
            InputScrollAndFocus("career", "경력을 입력해주세요.");
            setCareer('');
        } else if (imgUrl.trim() === '') {
            InputScrollAndFocus("imgUrl", "이미지 주소를 입력해주세요.");
            setImgUrl('');
        } else if (wantedUrl.trim() === '') {
            InputScrollAndFocus("wantedUrl", "원티드 주소를 입력해주세요.");
            setWantedUrl('');
        } else {
            const token = localStorage.getItem('accessToken');
            try {
                const url = `${domain}/hiring/update`;
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: hiringId, company: company, area: area, job: job, career: career, imgUrl: imgUrl, wantedUrl: wantedUrl
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
                        navigate('/hiring/list');
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
        }
    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">채용 공고</h1>
                <p className="text-center pb-5 light-300">더 다양한 채용 정보를 알고 싶다면 5층 취업 상담실을 방문해주세요.</p>
                <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                    <div className="contact-form row">
                        <WriteShort type={'text'} titleTag={'회사명'} name={'company'} value={company} onChange={(e) => { setCompany(e.target.value) }} />
                        <WriteShort type={'text'} titleTag={'지역'} name={'area'} value={area} onChange={(e) => { setArea(e.target.value) }} />
                        <WriteShort type={'text'} titleTag={'직군/직무'} name={'job'} value={job} onChange={(e) => { setJob(e.target.value) }} />
                        <WriteShort type={'text'} titleTag={'경력'} name={'career'} value={career} onChange={(e) => { setCareer(e.target.value) }} />
                        <WriteLong titleTag={'이미지 주소'} name={'imgUrl'} value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                        <WriteLong titleTag={'원티드 주소'} name={'wantedUrl'} value={wantedUrl} onChange={(e) => { setWantedUrl(e.target.value) }} />
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

export default HiringUpdate;