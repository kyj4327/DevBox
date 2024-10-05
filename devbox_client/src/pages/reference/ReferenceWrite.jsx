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
    const domain = "https://devback.shop";

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

    // 링크 유효성검사
    const validateUrl = (link) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        return urlRegex.test(link);
    };

    const [visibleContents, setVisibleContents] = useState(0); // 현재 추가된 내용의 수를 관리하는 상태
    // 내용 추가 버튼을 클릭했을 때 호출되는 함수 (누를 때마다 visibleContents 값을 증가시켜 표시할 내용의 수를 늘림)
    const handleAddContent = () => { setVisibleContents(visibleContents + 1); };
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

        if (title.trim().length > 10) {
            InputScrollAndFocus("title", "글자수를 확인해주세요!");
            return;
        } else if (content1.trim().length > 65) {
            InputScrollAndFocus("content1", "글자수를 확인해주세요!");
            return;
        } else if (content2.trim().length > 65) {
            InputScrollAndFocus("content2", "글자수를 확인해주세요!");
            return;
        } else if (content3.trim().length > 65) {
            InputScrollAndFocus("content3", "글자수를 확인해주세요!");
            return;
        } else if (content4.trim().length > 65) {
            InputScrollAndFocus("content4", "글자수를 확인해주세요!");
            return;
        } else if (content5.trim().length > 65) {
            InputScrollAndFocus("content5", "글자수를 확인해주세요!");
            return;
        }

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
        } else if (!validateUrl(link)) {
            InputScrollAndFocus("link", "유효한 링크를 입력해주세요.");
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
                            <li>(필수) 내용1 (최대 65자)</li>
                            <li>(필수) 내용2 (최대 65자)</li>
                            <li>(선택) 내용1 (최대 65자)</li>
                            <li>(선택) 내용2 (최대 65자)</li>
                            <li>(선택) 내용3 (최대 65자)</li>
                        </div>
                        <div className="pricing-list-footer col-4 text-center m-auto align-items-center">
                            <span className="btn rounded-pill px-4 btn-primary light-300" style={{ cursor: 'default' }}>Link</span>
                        </div>
                    </div>
                </div>
                <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                    <div className="contact-form row">
                        <WriteShort type={'text'} titleTag={'제목'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} wordCount={10} />
                        <WriteSelect titleTag="카테고리" name="intro"
                            value={selectJob || "카테고리를 선택해주세요."} onChange={(e) => setSelectJob(e.target.value)}
                            options={["Web", "DevOps", "Cloud", "Data", "Mobile", "Others"]} />
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">사이트 주소</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <div className="col-12">
                                <div className="form-floating mb-4">
                                    <input type="text" className="form-control form-control-lg light-300" id="link" name="link" placeholder="사이트 주소"
                                        value={link} onChange={(e) => { setLink(e.target.value) }} />
                                    <label htmlFor="floatingsubject light-300">사이트 주소</label>
                                </div>
                                {
                                    link.trim() === '' || validateUrl(link) ? '' : <p className="text-danger">유효한 링크가 아닙니다.</p>
                                }
                            </div>
                        </p>
                        <WriteLong titleTag={'(필수) 내용1 (최대 65자)'} name={'content1'} value={content1} onChange={(e) => { setContent1(e.target.value) }} wordCount={65} />
                        <WriteLong titleTag={'(필수) 내용2 (최대 65자)'} name={'content2'} value={content2} onChange={(e) => { setContent2(e.target.value) }} wordCount={65} />
                        {/* 내용3, 내용4, 내용5는 visibleContents 값에 따라 조건부로 표시 */}
                        {visibleContents >= 1 && (
                            <WriteLong titleTag={'(선택) 내용1 (최대 65자)'} name={'content3'} value={content3} onChange={(e) => { setContent3(e.target.value) }}
                                wordCount={65} contentDelete={visibleContents === 1} // 삭제 버튼 표시 여부
                                onDelete={() => handleRemoveContent(3)} // 삭제 버튼 클릭 시 함수 호출
                            />
                        )}
                        {visibleContents >= 2 && (
                            <WriteLong titleTag={'(선택) 내용2 (최대 65자)'} name={'content4'} value={content4} onChange={(e) => { setContent4(e.target.value) }}
                                wordCount={65} contentDelete={visibleContents === 2} onDelete={() => handleRemoveContent(4)} />
                        )}
                        {visibleContents >= 3 && (
                            <WriteLong titleTag={'(선택) 내용3 (최대 65자)'} name={'content5'} value={content5} onChange={(e) => { setContent5(e.target.value) }}
                                wordCount={65} contentDelete={visibleContents === 3} onDelete={() => handleRemoveContent(5)} />
                        )}
                        {/* 내용 추가 버튼은 visibleContents가 3 미만일 때만 표시 */}
                        {visibleContents < 3 && (
                            <div className="col-md-12 col-10">
                                <Button text={'추가'} icon="plus" onClick={handleAddContent} />
                            </div>
                        )}
                    </div>
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'등록'} icon="pen" onClick={saveData} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReferenceWrite;
