import WriteLong from '../../components/WriteLong';
import WriteShort from '../../components/WriteShort';
import WriteSelect from '../../components/WriteSelect';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ReferenceWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [selectJob, setSelectJob] = useState('');
    const [link, setLink] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [content3, setContent3] = useState('');
    const [content4, setContent4] = useState('');
    const [content5, setContent5] = useState('');

    const saveData = (e) => {
        e.preventDefault();
        async function send() {
            const url = 'http://127.0.0.1:8080/reference/write';
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: title, selectJob: selectJob, link: link,
                    content1: content1, content2: content2, content3: content3, content4: content4, content5: content5
                })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('저장되었습니다.');
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
                            <span className="btn rounded-pill px-4 btn-primary light-300" target='_blank'>Link</span>
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