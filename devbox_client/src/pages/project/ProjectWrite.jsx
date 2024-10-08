import { upload } from "@testing-library/user-event/dist/upload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WriteShort from "../../components/WriteShort";
import Button from "../../components/Button";
import DragDrop from "./DragDrop";
import Swal from "sweetalert2";
import { useUser } from "../../components/context/UserContext";
import QuillEditor from "../../components/QuillEditor";
import { localeData } from "moment";

const ProjectWrite = () => {
    const { user, loading } = useUser();

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [link, setLink] = useState('');
    const [coment, setComent] = useState('');
    const [uploadImgUrl, setUploadImgUrl] = useState('');
    const [uploadImgs, setUploadImgs] = useState([]);
    const [delImgId, setDelImgId] = useState([]);
    const [savedImgs, setSavedImgs] = useState([]);
    const domain = "https://www.devback.shop";
    const [linkError, setLinkError] = useState('');


    const validateUrl = (link) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        return urlRegex.test(link);
    };

    const handleDeleteImage = (id) => {
        setDelImgId([...delImgId, id]);
        setSavedImgs(savedImgs.filter((img) => img.id !== id));
    };

    const handleLinkChange = (e) => {
        const inputLink = e.target.value;
        setLink(inputLink);
    
        // 입력된 링크가 비어있거나 유효한 링크인지 확인
        if (inputLink.trim() === '' || validateUrl(inputLink)) {
            setLinkError(''); // 링크가 비어있거나 유효한 경우 오류 메시지 제거
        } else {
            setLinkError('유효한 링크를 입력해 주세요.'); // 유효하지 않은 링크일 경우 오류 메시지
        }
    };
    

    const onchangeImageUpload = (e) => {

        const { files } = e.target;
        setUploadImgs(Array.from(files)); // 파일 자체를 상태에 저장
    };

    const handleDetail = async (e) => {
        e.preventDefault();
        
        if (linkError) {
            Swal.fire({
                icon: "warning",
                title: linkError // 링크 오류 메시지 출력
            });
            return;
        }

        if (uploadImgs.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "이미지를 첨부해 주세요."
            });
            return;
        }

        const modifiedLink = link.includes("watch?v=") ? link.replace("watch?v=", "embed/") : link;

        const formData = new FormData();
        uploadImgs.forEach((v) => {
            formData.append("file", v);
        })
        formData.append("title", title);
        formData.append("name", name);
        formData.append("link", modifiedLink);
        formData.append("img", img);
        formData.append("coment", coment);

        const token = localStorage.getItem('accessToken');

        const url = `${domain}/project/write`;
        const res = await fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData

        });
        const data = await res.json();
        if (data.code == 200) {
            Swal.fire({
                icon: "success",
                title: "저장되었습니다."
            }).then(() => {
                navigate('/project/list');
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "저장 중 오류가 발생했습니다.",
                text: "다시 시도해 주세요."
            });
        }

    };


    const addFiles = (files) => {
        console.log(files);

        const fs = files.map(v => {
            return v.object;
        })
        setUploadImgs(fs);
    }

    useEffect(() => {
        if (!loading) {
            if (user) {
                setName(user.nickname || '');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "로그인이 필요합니다."
                }).then(() => {
                    navigate('/auth');
                });
            }
        }
    }, [user, loading, navigate]);

    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5" style={{cursor: 'default'}}>프로젝트 자랑</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row" >
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>작성자</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="form-floating">
                                        <input type="text" className="form-control form-control-lg light-300" style={{cursor: 'default'}} id={name} name={name} placeholder="작성자"
                                            value={name} onChange={(e) => setName(e.target.value)} readOnly />
                                        <label htmlFor="floatingsubject light-300">작성자</label>
                                    </div>
                                </p>
                            </div>
                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>자랑 이미지(필수)</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div id="templatemo-slide-link-target" className="card mb-3">
                                    {uploadImgUrl && <img src={uploadImgUrl} alt="Uploaded" />}

                                    <DragDrop addFiles={addFiles} initialFiles={savedImgs}
                                        onDeleteImage={handleDeleteImage}
                                    />

                                </div>
                            </p>

                            <div>
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>시연 영상 링크 (선택)</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="col-12">
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control form-control-lg light-300" id="link" name="link" placeholder="시연 영상 링크"
                                                value={link} onChange={handleLinkChange} />
                                            <label htmlFor="floatingsubject light-300">시연 영상 링크</label>
                                        </div>
                                    </div>
                                    {linkError && <p style={{ color: 'red' }}>{linkError}</p>}
                                </p>
                            </div>


                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>내용</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <QuillEditor 
                                    placeholder="내용"
                                    value={coment}
                                    onChange={setComent}
                                    height="450px"
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button icon={'pen'} text={'등록'} onClick={handleDetail} />
                    </div>
                </div>
            </section>

        </div>
    );

}

export default ProjectWrite;