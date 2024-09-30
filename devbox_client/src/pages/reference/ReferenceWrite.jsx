import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import WriteSelect from '../../components/WriteSelect';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';
import InputScrollAndFocus from '../../components/InputScrollAndFocus';

const ReferenceWrite = () => {
    const domain = "http://localhost:8080";

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

    const [visibleContents, setVisibleContents] = useState(0); // 현재 추가된 내용의 수를 관리하는 상태
    // 내용 추가 버튼을 클릭했을 때 호출되는 함수
    const handleAddContent = () => {
        setVisibleContents(visibleContents + 1); // 누를 때마다 visibleContents 값을 증가시켜 표시할 내용의 수를 늘림
    };
    // 내용 삭제 버튼을 클릭했을 때 호출되는 함수
    const handleRemoveContent = (contentNumber) => {
        if (contentNumber === 3) {
            setContent3('');
        } else if (contentNumber === 4) {
            setContent4('');
        } else if (contentNumber === 5) {
            setContent5('');
        }
        setVisibleContents(visibleContents - 1); // visibleContents 값을 줄여서 내용 필드를 숨김
    };

    // 로그인 상태 확인
    useEffect(() => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "로그인이 필요합니다."
            }).then(() => {
                navigate('/auth');
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
            InputScrollAndFocus("title", "제목을 입력해주세요.");
            setTitle('');
        } else if (selectJob === '') {
            document.activeElement.blur(); // 현재 포커스된 요소(저장하기 버튼)의 포커스를 해제
            InputScrollAndFocus("intro", "카테고리를 선택해주세요.");
        } else if (link.trim() === '') {
            InputScrollAndFocus("link", "사이트 주소를 입력해주세요.");
            setLink('');
        } else if (content1.trim() === '') {
            InputScrollAndFocus("content1", "내용1을 입력해주세요.");
            setContent1('');
        } else if (content2.trim() === '') {
            InputScrollAndFocus("content2", "내용2를 입력해주세요.");
            setContent2('');
        } else {
            const token = localStorage.getItem('accessToken');
            try {
                const url = `${domain}/reference/write`;
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
                    Swal.fire({
                        icon: "success",
                        title: "저장되었습니다."
                    }).then(() => {
                        navigate('/reference/list');
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
                <h1 className="h2 semi-bold-600 text-center mt-2">추천해요</h1>
                <p className="text-center pb-5 light-300">아래와 같은 형식으로 게시됩니다. 참고해주세요!</p>
                <div className="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5" style={{ marginBottom: '3rem' }}>
                    <div className="row p-2">
                        <div className="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                            <h3>제목</h3>
                        </div>
                        <div className="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                            <li style={{ listStyle: 'none' }}>카테고리</li>
                            <li>(필수) 내용1 (65자 이내)</li>
                            <li>(필수) 내용2 (65자 이내)</li>
                            <li>(선택) 내용1 (65자 이내)</li>
                            <li>(선택) 내용2 (65자 이내)</li>
                            <li>(선택) 내용3 (65자 이내)</li>
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
                        <WriteLong titleTag={'(필수) 내용1 (65자 이내)'} name={'content1'} value={content1} onChange={(e) => { setContent1(e.target.value) }} />
                        <WriteLong titleTag={'(필수) 내용2 (65자 이내)'} name={'content2'} value={content2} onChange={(e) => { setContent2(e.target.value) }} />
                        {/* 내용3, 내용4, 내용5는 visibleContents 값에 따라 조건부로 표시 */}
                        {visibleContents >= 1 && (
                            <WriteLong titleTag={'(선택) 내용1 (65자 이내)'} name={'content3'} value={content3} onChange={(e) => { setContent3(e.target.value) }}
                                contentDelete={visibleContents === 1} // 삭제 버튼 표시 여부
                                onDelete={() => handleRemoveContent(3)} // 삭제 버튼 클릭 시 함수 호출
                            />
                        )}
                        {visibleContents >= 2 && (
                            <WriteLong titleTag={'(선택) 내용2 (65자 이내)'} name={'content4'} value={content4} onChange={(e) => { setContent4(e.target.value) }}
                                contentDelete={visibleContents === 2} onDelete={() => handleRemoveContent(4)} />
                        )}
                        {visibleContents >= 3 && (
                            <WriteLong titleTag={'(선택) 내용3 (65자 이내)'} name={'content5'} value={content5} onChange={(e) => { setContent5(e.target.value) }}
                                contentDelete={visibleContents === 3} onDelete={() => handleRemoveContent(5)} />
                        )}
                        {/* 내용 추가 버튼은 visibleContents가 3 미만일 때만 표시 */}
                        {visibleContents < 3 && (
                            <div className="form-row pt-2 py-2">
                                <div className="col-md-12 col-10">
                                    <button type="button" className="btn btn-secondary text-white px-md-4 px-2 py-md-3 py-1 radius-0 light-300" onClick={handleAddContent}>
                                        내용 추가
                                    </button>
                                </div>
                            </div>
                        )}
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
