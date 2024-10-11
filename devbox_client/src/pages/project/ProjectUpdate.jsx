import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
import Button from "../../components/Button";
import WriteShort from "../../components/WriteShort";
import WriteLong from "../../components/WriteLong";
import Swal from "sweetalert2";
import { useUser } from "../../components/context/UserContext";
import QuillEditor from "../../components/QuillEditor";


const ProjectUpdate = () => {
    const navigate = useNavigate();
    const domain = "http://localhost:8080";
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const { user, loading } = useUser();

    const [title, setTitle] = useState('');
    const [likecount, setLikecount] = useState('');
    const [nickname, setNickname] = useState('');
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

    async function get() {
        const token = localStorage.getItem('accessToken');

        const res = await fetch(`${domain}/project/update?id=${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await res.json();
        setProData(data);


        setLikecount(data.likecount);
        setTitle(data.title);
        setComent(data.coment);
        setNickname(data.nickname);
        setLink(data.link);

        const imageFiles = data.imgs.map((img) => ({
            id: img.id, // img 객체에 id가 있어야 함
            object: img.img // img 객체를 파일 객체로 사용
        }));
        setSavedImgs(imageFiles);

    }

    const handleDetail = async (e) => {
        e.preventDefault();

        // savedImgs와 uploadImgs를 모두 확인하도록 수정
        if (savedImgs.length === 0 && uploadImgs.length === 0) {
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
        formData.append("nickname", nickname);
        formData.append("link", modifiedLink);
        formData.append("coment", coment);
        formData.append("likecount", likecount);

        delImgId.forEach((v) => {
            formData.append("delImgId", v);
        });

        const token = localStorage.getItem('accessToken');

        const url = `${domain}/project/update`;
        const res = await fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await res.json();
        if (data.code == 200 && data.id) {
            navigate(`/project/detail?id=${data.id}`);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "이미지를 자랑해주세요!!"
            });
        }

    };




    const addFiles = (files) => {
        const fs = files.map(v => {
            return v.object;
        })
        setUploadImgs(fs);
    }

    useEffect(() => {
        get();
        if (!loading) {
            if (user) {
                setNickname(user.nickname || '');
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "로그인 필요",
                    text: "로그인이 필요합니다.",
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
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5" style={{ cursor: 'default' }}>프로젝트 자랑 수정</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{ cursor: 'default' }}>작성자</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="form-floating">
                                        <input type="text" className="form-control form-control-lg light-300" style={{ cursor: 'default' }} id={nickname} name={nickname} placeholder="작성자"
                                            value={nickname} onChange={(e) => setNickname(e.target.value)} readOnly />
                                        <label htmlFor="floatingsubject light-300">작성자</label>
                                    </div>
                                </p>
                            </div>
                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{ cursor: 'default' }}>자랑 이미지</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div id="templatemo-slide-link-target" className="card py-3 mb-3">
                                    <DragDrop addFiles={addFiles} initialFiles={savedImgs}
                                        onDeleteImage={handleDeleteImage}
                                    />
                                </div>
                            </p>

                            <div>
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{ cursor: 'default' }}>자랑 링크</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="col-12">
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control form-control-lg light-300" id={link} name={link} placeholder="자랑 링크"
                                                value={link} onChange={(e) => setLink(e.target.value)} />
                                            <label htmlFor="floatingsubject light-300">예: https://www.youtube.com</label>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{ cursor: 'default' }}>프로젝트 소개</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div className=" form-floating">
                                    <QuillEditor
                                        placeholder="내용"
                                        value={coment}
                                        onChange={setComent}
                                        height="450px"
                                    />
                                </div>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-row pt-2 me-2">
                    <div className="col-md-12 col-10 text-end">
                        <Button icon={'edit'} text={'수정'} onClick={handleDetail} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectUpdate;