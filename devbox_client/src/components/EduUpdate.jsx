import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EduUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [img, setImg] = useState('');
    const [recruit, setRecruit] = useState('');
    const [eduterm, setEduterm] = useState('');
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
    const [isImageUploaded, setIsImageUploaded] = useState(false); // 이미지 업로드 상태를 관리하는 변수


    const [eduData, setEduData] = useState({});


    const onchangeImageUpload = (e) => {
     

        const { files } = e.target;
        const uploadFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => {
            setUploadImgUrl(reader.result);
            setUploadImg(uploadFile);
            setIsImageUploaded(true);
        }
    }

    const handleDetail = async () => {
        const formData = new FormData();
        formData.append("id", id);
        if (uploadImg) {
            formData.append("file", uploadImg); // 새로운 파일이 있을 때만 추가
        }
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("recruit", start + " ~ " + end);
        formData.append("eduterm", start2 + " ~ " + end2);
        formData.append("people", people);
        formData.append("link", link);
        formData.append("img", img);
        formData.append("logo", logo);
        formData.append("state", state);

        const url = 'http://localhost:8080/update';
        const res = await fetch(url, {
            method: 'post',
            body: formData
        });
        const data = await res.json();
        if (data.code == 200) {
            navigate('/');
        } else {
            alert(data.msg);
        }
        
    };
    
    async function get() {
        const res = await fetch(`http://localhost:8080/edu/update?id=${id}`);
        const data = await res.json();
        setEduData(data);
        
        if(data.recruit){
        const [start, end] = data.recruit.split(" ~ ");
        setStart(start);
        setEnd(end);
        }

        if(data.eduterm){
        const [start2, end2] = data.eduterm.split(" ~ ");
        setStart2(start2);
        setEnd2(end2);
        }
       
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setPeople(data.people);
        setLink(data.link);
        setLogo(data.logo);
        setState(data.state);
    }



    useEffect(() => {
        get();
    }, [isImageUploaded]);

    return (
        <div>
            <div id="work_single_banner" class="bg-light w-100">
                <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                    <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                        <h1 class="banner-heading h2 pb-5 typo-space-line-center">제목 :  </h1>
                        <div className="title">
                            <input
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                            />
                        </div>
                        <p class="banner-footer light-300">
                            소제목:
                        </p>
                        <div className="subtitle">
                            <input
                                name="subtitle"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <section class="container py-5">
                
                    
                <div class="row justify-content-center pb-4">
                    <div class="col-lg-8">
                    <p>교육 포스터</p>
                        <div id="templatemo-slide-link-target" class="card mb-3">
                            {isImageUploaded && uploadImgUrl && (
                                <img src={uploadImgUrl} alt="Uploaded" />
                            )}
                            {!isImageUploaded && (
                                <img src={`http://localhost:8080/download?id=${id}`} alt="Original" />
                            )}
                            <input
                            name="img"
                            value={img}
                            type="file" accept="image/*" onChange={onchangeImageUpload} />
                           
                        </div>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 class="worksingle-heading h3 pb-3 light-300 typo-space-line">과정요약</h2>
                        <p class="worksingle-footer py-3 text-muted light-300">
                            <li>모집기간: </li>
                            <div className="recruit">
                                <input
                                    name="start"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    type="date"
                                />
                                <input
                                    name="end"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <li>교육기간: </li>
                            <div className="eduterm">
                                <input
                                    name="start2"
                                    value={start2}
                                    onChange={(e) => setStart2(e.target.value)}
                                    type="date"
                                />
                                <input
                                    name="end2"
                                    value={end2}
                                    onChange={(e) => setEnd2(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <li>모집인원: </li>

                            <div className="people">
                                <input
                                    name="people"
                                    value={people}
                                    onChange={(e) => setPeople(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <li>모집상태: </li>

                            <div className="state">
                                <input
                                    name="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <li>신청 링크: </li>

                            <div className="link">
                                <input
                                    name="link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <li>회사 로고 이미지 링크: </li>

                            <div className="logo">
                                <input
                                    name="logo"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </p>
                    </div>
                </div >
                <div className="buttom">
                    <button onClick={handleDetail}
                        className="btn" >수정 완료</button>
                </div>


            </section >
        </div >
    );
};

export default EduUpdate;