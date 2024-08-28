import { useState } from "react";
import WriteShort from "../components/WriteShort";
import Button from "../components/Button";

const MesWrite = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    return (
        <div className="Message">
            <WriteShort titleTag={'작성자'} type={'text'} name={'name'} value={name} onChange={(e) => { setName(e.target.value) }} />
            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <div class="col-lg-6 mb-4">
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
            <Button text={'보내기'} />
        </div>
    );
};

export default MesWrite;
