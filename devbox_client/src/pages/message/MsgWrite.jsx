import { useState } from "react";
import WriteShort from "../../components/WriteShort";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const MesWrite = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [reciver, setReciver] = useState('');
    const [content, setContent] = useState('');


    const handleDetail = async () => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("sender", sender);
        formData.append("reciver", reciver);
        formData.append("content", content);

        const url = 'http://127.0.0.1:8080/msg/write';
        const res = await fetch(url, {
            method: 'post',
            body: formData

        });
        const data = await res.json();
        if (data.code == 200) {
            navigate('/message/list');
        } else {
            alert(data.msg);
        }

    };

    return (
        <div>
            <section class="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5 ">쪽지 작성</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">
                            <WriteShort titleTag={'보낼분'} type={'text'} name={'sender'} value={sender} onChange={(e) => { setSender(e.target.value) }} />
                            <WriteShort titleTag={'받을분'} type={'text'} name={'reciver'} value={reciver} onChange={(e) => { setReciver(e.target.value) }} />
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />

                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">작성 내용</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div class=" form-floating">
                                    <textarea
                                        class="form-control form-control-lg light-300"
                                        rows="8"
                                        placeholder="Message"
                                        id="floatingtextarea"
                                        name="content"
                                        value={content}
                                        type="text"
                                        onChange={(e) => { setContent(e.target.value) }}
                                    ></textarea>
                                    <label htmlFor="floatingsubject light-300">작성 내용</label>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">

                        <Button text={'보내기'} onClick={handleDetail} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MesWrite;
