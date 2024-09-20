import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';

const HiringWrite = () => {
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
            alert("로그인이 필요합니다.");
            navigate('/auth');
        } else if (user.role != "ROLE_ADMIN") {
            alert("권한이 없습니다.");
            navigate('/contest/list');
        }
    }, [user, navigate]);

    const saveData = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        const token = localStorage.getItem('accessToken');
        try {
            const url = 'http://localhost:8080/hiring/write';
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    company: company, area: area, job: job, career: career, imgUrl: imgUrl, wantedUrl: wantedUrl
                })
            });
            if (!response.ok) {
                throw new Error("서버에서 오류가 발생했습니다.");
            }
            const data = await response.json();
            if (data.code === 200) {
                alert('저장되었습니다.');
                navigate('/hiring/list');
            } else {
                alert('다시 입력해주세요.');
            }
        } catch (error) {
            console.error("저장 중 오류 발생 : ", error);
            alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">채용 공고 Write</h1>
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
                    <Button text={'저장하기'} onClick={saveData} />
                </div>
            </div>
        </section>
    );
};

export default HiringWrite;