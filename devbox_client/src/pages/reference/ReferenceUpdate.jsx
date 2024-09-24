import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import WriteSelect from '../../components/WriteSelect';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReferenceUpdate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [selectJob, setSelectJob] = useState('');
    const [link, setLink] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [content3, setContent3] = useState('');
    const [content4, setContent4] = useState('');
    const [content5, setContent5] = useState('');

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const referenceId = search.get('referenceId');
    useEffect(() => {
        async function get() {
            const url = `http://127.0.0.1:8080/reference/update?referenceId=${referenceId}`;
            const res = await fetch(url);
            const data = await res.json();
            setTitle(data.title);
            setSelectJob(data.selectJob);
            setLink(data.link);
            setContent1(data.content1);
            setContent2(data.content2);
            setContent3(data.content3);
            setContent4(data.content4);
            setContent5(data.content5);
        }
        get();
    }, []);

    const updateData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://127.0.0.1:8080/reference/update';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: referenceId, title: title, selectJob: selectJob, link: link,
                    content1: content1, content2: content2, content3: content3, content4: content4, content5: content5
                })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('수정되었습니다.');
                navigate('/reference/list');
            } else {
                alert('다시 입력해주세요.');
            }
        }
        send();
    };

    return (
        <section className="container py-5">
            <div className="container py-5">
                <h1 className="h2 semi-bold-600 text-center mt-2">추천해요 Update</h1>
                <p className="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
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
                    <Button text={'수정하기'} onClick={updateData} />
                </div>
            </div>
        </section>
    );
};

export default ReferenceUpdate;