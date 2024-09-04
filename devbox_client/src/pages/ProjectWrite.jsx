import { upload } from "@testing-library/user-event/dist/upload";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WriteShort from "../components/WriteShort";
import WriteLong from "../components/WriteLong";
import Button from "../components/Button";

const ProjectWrite = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [link, setLink] = useState('');
    const [coment, setComent] = useState('');
    const [uploadImgUrl, setUploadImgUrl] = useState('');
    const [uploadImgs, setUploadImgs] = useState([]);

    const onchangeImageUpload = (e) => {

        const { files } = e.target;
        setUploadImgs(Array.from(files)); // 파일 자체를 상태에 저장
    };

    const handleDetail = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        uploadImgs.forEach((v) => {
            formData.append("file", v);
        })

        formData.append("title", title);
        formData.append("name", name);
        formData.append("link", link);
        formData.append("img", img);
        formData.append("coment", coment);

        const url = 'http://localhost:8080/pro';
        const res = await fetch(url, {
            method: 'post',
            body: formData

        });
        const data = await res.json();
        if (data.code == 200) {
            navigate('/project/list');
        } else {
            alert(data.msg);
        }

    };

    return (
        <div>
            <section class="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5 ">프로젝트 자랑</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <WriteShort titleTag={'이름'} type={'text'} name={'naem'} value={name} onChange={(e) => setName(e.target.value)} />

                            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">프젝 이미지</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div id="templatemo-slide-link-target" class="card mb-3">
                                    {uploadImgUrl && <img src={uploadImgUrl} alt="Uploaded" />}
                                    <input
                                        className="form-control form-control-lg light-300"
                                        name="img"
                                        type="file" accept="image/*" onChange={onchangeImageUpload} multiple />
                                </div>
                            </p>


                            <WriteLong titleTag={'링크'} type={'text'} name={'link'} value={link} onChange={(e) => setLink(e.target.value)} />

                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line">내용</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <textarea
                                    class="form-control form-control-lg light-300"
                                    rows="8"
                                    placeholder="내용"
                                    id="floatingtextarea"
                                    name="coment"
                                    value={coment}
                                    onChange={(e) => setComent(e.target.value)}
                                    type="text"
                                ></textarea>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'프젝 자랑'} onClick={handleDetail} />
                    </div>
                </div>
            </section>

        </div>
    );

}

export default ProjectWrite;