import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import WriteSelect from '../../components/WriteSelect';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../components/context/UserContext';
import Swal from 'sweetalert2';
import InputScrollAndFocus from '../../components/InputScrollAndFocus';

const ReferenceUpdate = () => {
    const domain = "http://localhost:8080";

    const { user } = useUser();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [selectJob, setSelectJob] = useState('');
    const [link, setLink] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [content3, setContent3] = useState('');
    const [content4, setContent4] = useState('');
    const [content5, setContent5] = useState('');

    const [visibleContents, setVisibleContents] = useState(0);
    const handleAddContent = () => { setVisibleContents(visibleContents + 1); };
    const handleRemoveContent = (contentNumber) => {
        if (contentNumber === 3) {
            setContent3('');
        } else if (contentNumber === 4) {
            setContent4('');
        } else if (contentNumber === 5) {
            setContent5('');
        }
        setVisibleContents(visibleContents - 1);
    };

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
    const token = localStorage.getItem('accessToken');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const referenceId = search.get('referenceId');
    useEffect(() => {
        async function get() {
            const url = `${domain}/reference/update?referenceId=${referenceId}`;
            const res = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setTitle(data.title);
            setSelectJob(data.selectJob);
            setLink(data.link);
            setContent1(data.content1);
            setContent2(data.content2);
            setContent3(data.content3);
            setContent4(data.content4);
            setContent5(data.content5);

            // content3, content4, content5 중 하나라도 값이 있으면 3, 4, 5 모두 추가된 상태로 출력
            let contentCount = 0;
            if (data.content3 || data.content4 || data.content5) {
                contentCount = 3;
            } else if (!data.content3 || !data.content4 || !data.content5) {
                contentCount = 0;
            }
            setVisibleContents(contentCount);
        }
        get();
    }, []);

    const updateData = async (e) => {
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
            document.activeElement.blur();
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
                        id: referenceId, title: title, selectJob: selectJob, link: link,
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
                        title: "수정되었습니다."
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
                    title: "수정 중 오류가 발생했습니다. 다시 시도해주세요."
                });
            }
        }
    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">추천해요</h1>
                <p className="text-center pb-5 light-300">다른 사람에게 알려주고 싶은 나만의 꿀팁을 공유해요!</p>
                <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                    <div className="contact-form row">
                        <WriteShort type={'text'} titleTag={'제목'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} wordCount={10} />
                        <WriteSelect titleTag="카테고리" name="intro"
                            value={selectJob || "카테고리를 선택해주세요."} onChange={(e) => setSelectJob(e.target.value)}
                            options={["Web", "DevOps", "Cloud", "Data", "Mobile", "Others"]} />
                        <WriteLong titleTag={'사이트 주소'} name={'link'} value={link} onChange={(e) => { setLink(e.target.value) }} />
                        <WriteLong titleTag={'(필수) 내용1 (최대 65자)'} name={'content1'} value={content1} onChange={(e) => { setContent1(e.target.value) }} wordCount={65} />
                        <WriteLong titleTag={'(필수) 내용2 (최대 65자)'} name={'content2'} value={content2} onChange={(e) => { setContent2(e.target.value) }} wordCount={65} />
                        {visibleContents >= 1 && (
                            <WriteLong titleTag={'(선택) 내용1 (최대 65자)'} name={'content3'} value={content3} onChange={(e) => { setContent3(e.target.value) }}
                                wordCount={65} contentDelete={visibleContents === 1} onDelete={() => handleRemoveContent(3)} />
                        )}
                        {visibleContents >= 2 && (
                            <WriteLong titleTag={'(선택) 내용2 (최대 65자)'} name={'content4'} value={content4} onChange={(e) => { setContent4(e.target.value) }}
                                wordCount={65} contentDelete={visibleContents === 2} onDelete={() => handleRemoveContent(4)} />
                        )}
                        {visibleContents >= 3 && (
                            <WriteLong titleTag={'(선택) 내용3 (최대 65자)'} name={'content5'} value={content5} onChange={(e) => { setContent5(e.target.value) }}
                                wordCount={65} contentDelete={visibleContents === 3} onDelete={() => handleRemoveContent(5)} />
                        )}
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
                    <Button text={'수정하기'} onClick={updateData} />
                </div>
            </div>
        </section>
    );
};

export default ReferenceUpdate;