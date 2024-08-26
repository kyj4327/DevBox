import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReferenceUpdate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [selectJob, setSelectJob] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [link, setLink] = useState('');

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
            setContent1(data.content1);
            setContent2(data.content2);
            setLink(data.link);
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
                body: JSON.stringify({ id: referenceId, title: title, selectJob: selectJob, content1: content1, content2: content2, link: link })
            });
            const data = await res.json();
            if (data.code === 200) {
                alert('글 수정 완료');
                navigate('/reference/list');
            } else {
                alert('다시 입력해주세요.');
            }
        }
        send();
    };

    return (
        <div>
            <Header />
            <section className="container py-5">
                <div class="container py-5">
                    <h1 class="h2 semi-bold-600 text-center mt-2">추천해요 Update</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
                    <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                        <div class="row p-2">
                            <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                <input type='text' id='title' name='title'
                                    value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                <li style={{ listStyle: 'none' }}>
                                    <label>
                                        <input type="radio" name='selectJob' checked={selectJob == 'Web' ? true : false}
                                            value='Web' onChange={(e) => { setSelectJob(e.target.value) }} /> Web
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }} checked={selectJob == 'DevOps' ? true : false}
                                            value='DevOps' onChange={(e) => { setSelectJob(e.target.value) }} /> DevOps
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }} checked={selectJob == 'Cloud' ? true : false}
                                            value='Cloud' onChange={(e) => { setSelectJob(e.target.value) }} /> Cloud
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }} checked={selectJob == 'Data' ? true : false}
                                            value='Data' onChange={(e) => { setSelectJob(e.target.value) }} /> Data
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }} checked={selectJob == 'Mobile' ? true : false}
                                            value='Mobile' onChange={(e) => { setSelectJob(e.target.value) }} /> Mobile
                                    </label>
                                    <label>
                                        <input type="radio" name='selectJob' style={{ marginLeft: '1rem' }} checked={selectJob == 'Others' ? true : false}
                                            value='Others' onChange={(e) => { setSelectJob(e.target.value) }} /> Others
                                    </label>
                                </li>
                                <li>
                                    <input type='text' id='content1' name='content1'
                                        value={content1} onChange={(e) => { setContent1(e.target.value) }} />
                                </li>
                                <li>
                                    <input type='text' id='content2' name='content2'
                                        value={content2} onChange={(e) => { setContent2(e.target.value) }} />
                                </li>
                            </div>
                            <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                url : <input type='text' id='link' name='link'
                                    value={link} onChange={(e) => { setLink(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'수정하기'} onClick={updateData} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ReferenceUpdate;