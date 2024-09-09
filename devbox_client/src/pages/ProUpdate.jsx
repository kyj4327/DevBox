import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
import Button from "../components/Button";
import WriteShort from "../components/WriteShort";
import WriteLong from "../components/WriteLong";
import Swal from "sweetalert2";


const ProUpdate = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');


    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [link, setLink] = useState('');
    const [coment, setComent] = useState('');
    const [uploadImgs, setUploadImgs] = useState([]);// 이미지 업로드 상태를 관리하는 변수
    const [savedImgs, setSavedImgs] = useState([]);

    const [delImgId, setDelImgId] = useState([]);



    const [ProData, setProData] = useState({});

    const handleDeleteImage = (id) => {
        setDelImgId([...delImgId, id]);
        setSavedImgs(savedImgs.filter((img) => img.id !== id));
    };

    const onchangeImageUpload = (e) => {

        const { files } = e.target;

        setUploadImgs(Array.from(files));
    }

    const handleDetail = async (e) => {
        e.preventDefault();

        if (savedImgs.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "이미지를 자랑해주세요!!"
              });
            return; 
        }

        const modifiedLink = link.includes("watch?v=") ? link.replace("watch?v=", "embed/") : link;
        const formData = new FormData();
        formData.append("id", id);
        uploadImgs.forEach((v) => {
            formData.append("file", v);
        })

        formData.append("title", title);
        formData.append("name", name);
        formData.append("link", modifiedLink);
        formData.append("coment", coment);

        delImgId.forEach((v) => {
            formData.append("delImgId", v);
        });
        console.log(delImgId);

        const url = 'http://localhost:8080/pro/update';
        const res = await fetch(url, {
            method: 'post',
            body: formData
        });
        const data = await res.json();
        if (data.code == 200) {
            navigate('/project/list');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "이미지를 자랑해주세요!!"
              });
        }

    };

    async function get() {
        const res = await fetch(`http://localhost:8080/pro/update?id=${id}`);
        const data = await res.json();
        setProData(data);



        setTitle(data.title);
        setComent(data.coment);
        setName(data.name);
        setLink(data.link);

        const imageFiles = data.imgs.map((img) => ({
            id: img.id, // img 객체에 id가 있어야 함
            object: img.img // img 객체를 파일 객체로 사용
        }));
        setSavedImgs(imageFiles);

    }


    const addFiles = (files) => {
        console.log(files);

        const fs = files.map(v => {
            return v.object;
        })
        setUploadImgs(fs);
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            <section class="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5 ">프로젝트 자랑 수정</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <WriteShort titleTag={'이름'} type={'text'} name={'naem'} value={name} onChange={(e) => setName(e.target.value)} />

                            <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">프젝 이미지</h2>
                            <p className="worksingle-footer py-2 text-muted light-300">
                                <div id="templatemo-slide-link-target" class="card mb-3">
                                    <DragDrop addFiles={addFiles} initialFiles={savedImgs}
                                        onDeleteImage={handleDeleteImage}
                                    />
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
};

export default ProUpdate;