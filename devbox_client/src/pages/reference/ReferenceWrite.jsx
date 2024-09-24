import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import WriteSelect from '../../components/WriteSelect';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';

const ReferenceWrite = () => {
    const { user } = useUser(); // Context에서 유저 정보 가져오기
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [selectJob, setSelectJob] = useState('');
    const [link, setLink] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [content3, setContent3] = useState('');
    const [content4, setContent4] = useState('');
    const [content5, setContent5] = useState('');

    // 로그인 상태 확인
    useEffect(() => {
        if (!user) {
            alert("로그인이 필요합니다.");
            navigate('/auth');
        }
    }, [user, navigate]);

    const inputFocus = (name) => {
        // alert(message); // alert 표시
        const element = document.getElementById(name); // id로 요소를 찾음
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 스크롤 이동
            element.focus(); // 해당 input에 focus
        }
    };

    const saveData = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        } else if (title.trim() === '') {
            inputFocus("title", "제목을 입력해주세요.");
            setTitle('');
        } else if (selectJob === '') {
            window.scrollTo(0, 0);
        } else if (link.trim() === '') {
            inputFocus("link", "사이트 주소를 입력해주세요.");
            setLink('');
        } else if (content1.trim() === '') {
            inputFocus("content1", "내용1을 입력해주세요.");
            setContent1('');
        } else if (content2.trim() === '') {
            inputFocus("content2", "내용2를 입력해주세요.");
            setContent2('');
        } else {
            const token = localStorage.getItem('accessToken');
            try {
                const url = 'http://localhost:8080/reference/write';
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title, selectJob: selectJob, link: link,
                        content1: content1, content2: content2, content3: content3.trim(), content4: content4.trim(), content5: content5.trim()
                    })
                });
                if (!response.ok) {
                    throw new Error("서버에서 오류가 발생했습니다.");
                }
                const data = await response.json();
                if (data.code === 200) {
                    alert('저장되었습니다.');
                    navigate('/reference/list');
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
                <h1 className="h2 semi-bold-600 text-center mt-2">추천해요 Write</h1>
                <p className="text-center pb-5 light-300">아래와 같은 형식으로 게시됩니다. 참고해주세요!</p>
                <div className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5" style={{ marginBottom: '3rem' }}>
                    <div className="row p-2">
                        <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                            <h3>제목</h3>
                        </div>
                        <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                            <li style={{ listStyle: 'none' }}>카테고리</li>
                            <li>내용1 (필수)</li>
                            <li>내용2 (필수)</li>
                            <li>내용3 (선택)</li>
                            <li>내용4 (선택)</li>
                            <li>내용5 (선택)</li>
                        </div>
                        <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                            <span className="btn rounded-pill px-4 btn-primary light-300" style={{ cursor: 'default' }}>Link</span>
                        </div>
                    </div>
                </div>
                <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                    <div className="contact-form row">
                        <WriteShort type={'text'} titleTag={'제목'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <WriteSelect titleTag="카테고리" name="intro"
                            value={selectJob || "카테고리를 선택해주세요."} onChange={(e) => setSelectJob(e.target.value)}
                            options={["Web", "DevOps", "Cloud", "Data", "Mobile", "Others"]} />
                        <WriteLong titleTag={'사이트 주소'} name={'link'} value={link} onChange={(e) => { setLink(e.target.value) }} />
                        <WriteLong titleTag={'내용1 (필수)'} name={'content1'} value={content1} onChange={(e) => { setContent1(e.target.value) }} />
                        <WriteLong titleTag={'내용2 (필수)'} name={'content2'} value={content2} onChange={(e) => { setContent2(e.target.value) }} />
                        <WriteLong titleTag={'내용3 (선택)'} name={'content3'} value={content3} onChange={(e) => { setContent3(e.target.value) }} />
                        <WriteLong titleTag={'내용4 (선택)'} name={'content4'} value={content4} onChange={(e) => { setContent4(e.target.value) }} />
                        <WriteLong titleTag={'내용5 (선택)'} name={'content5'} value={content5} onChange={(e) => { setContent5(e.target.value) }} />
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

export default ReferenceWrite;
