import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import WriteShort from "../components/WriteShort";
import WriteLong from "../components/WriteLong";
import WriteSelect from "../components/WriteSelect";
import Swal from "sweetalert2";

const DetailManager = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [img, setImg] = useState('');
    const [people, setPeople] = useState('');
    const [link, setLink] = useState('');
    const [start, setStart] = useState('');
    const [start2, setStart2] = useState('');
    const [end, setEnd] = useState('');
    const [end2, setEnd2] = useState('');
    const [uploadImgUrl, setUploadImgUrl] = useState('');
    const [uploadImg, setUploadImg] = useState('');
    const [logo, setLogo] = useState('');
    const [state, setState] = useState('');

    const onchangeImageUpload = (e) => {


        const { files } = e.target;
        const uploadFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => {
            setUploadImgUrl(reader.result);
            setUploadImg(uploadFile);
        }
    }

    const handleDetail = async (e) => {
        e.preventDefault();

        if (uploadImg.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "포스터를 첨부 해주세요."
              });
            return; 
        }

        const formData = new FormData();
        formData.append("file", uploadImg);
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("recruit", start + " ~ " + end);
        formData.append("eduterm", start2 + " ~ " + end2);
        formData.append("people", people);
        formData.append("link", link);
        formData.append("img", img);
        formData.append("logo", logo);
        formData.append("state", state);

        const url = 'http://127.0.0.1:8080/edu';
        const res = await fetch(url, {
            method: 'post',
            body: formData
        });
        const data = await res.json();
        if (data.code == 200) {
            navigate('/edu/list');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "포스터를 첨부 해주세요."
              });
        }

    };

    return (
        <div>
            <section class="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5 ">개발 교육 정보</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">

                            <WriteShort type={'text'} titleTag={'제목'} name={'title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <WriteShort type={'text'} titleTag={'소제목'} name={'subtitle'} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />

                            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">교육 포스터</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">

                                {uploadImgUrl && <img src={uploadImgUrl} alt="Uploaded" />}
                                <input
                                    className="form-control form-control-lg light-300"
                                    name="img"
                                    value={img}
                                    type="file" accept="image/*" onChange={onchangeImageUpload} />
                            </p>


                            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">모집기간</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div style={{ display: 'flex' }}>
                                    <input
                                        className="me-4 form-control form-control-lg light-300"
                                        name="start"
                                        value={start}
                                        onChange={(e) => setStart(e.target.value)}
                                        type="date"
                                    />
                                    <input
                                        className="form-control form-control-lg light-300"
                                        name="end"
                                        value={end}
                                        onChange={(e) => setEnd(e.target.value)}
                                        type="date"
                                    />
                                </div>
                            </p>

                            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">교육기간</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">

                                <div style={{ display: 'flex' }}>
                                    <input
                                        className="me-4 form-control form-control-lg light-300"
                                        name="start2"
                                        value={start2}
                                        onChange={(e) => setStart2(e.target.value)}
                                        type="date"
                                    />
                                    <input
                                        className="form-control form-control-lg light-300"
                                        name="end2"
                                        value={end2}
                                        onChange={(e) => setEnd2(e.target.value)}
                                        type="date"
                                    />
                                </div>
                            </p>
                            <WriteShort type={'text'} titleTag={'모집인원'} name={people} value={people} onChange={(e) => setPeople(e.target.value)} />
                            <WriteSelect 
                                titleTag="모집상태"
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                options={["모집중", "모집완료"]} />
                            <WriteLong titleTag={'신청 링크'} name={'link'} value={link} onChange={(e) => setLink(e.target.value)} />
                            <WriteLong titleTag={'로고 링크'} name={'logo'} value={logo} onChange={(e) => setLogo(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button text={'올리기'} onClick={handleDetail} />
                    </div>
                </div>

            </section >
        </div >
    );
};

export default DetailManager;