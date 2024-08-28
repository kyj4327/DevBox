import { upload } from "@testing-library/user-event/dist/upload";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

            <div class="col-lg-8 ">
                <form class="contact-form row" method="post" action="#" role="form">

                    <div class="col-lg-6 mb-4">
                        <div class="form-floating">
                            <input 
                            type="text" 
                            class="form-control form-control-lg light-300" 
                            id="floatingname" 
                            placeholder="Name"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            ></input>
                            <label for="floatingname light-300"
                           
                            >title</label>
                          
                        </div>
                    </div>

                    <div class="col-lg-6 mb-4">
                        <div class="form-floating">
                            <input 
                            type="text" 
                            class="form-control form-control-lg light-300" 
                            id="floatingemail" 
                            placeholder="Email"
                            name="name"
                            
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ></input>
                            <label for="floatingemail light-300"
                           
                            >Name</label>
                        </div>
                    </div>

                    <div class="row justify-content-center pb-4">
                        <div class="col-lg-8">
                            
                            <p>프젝 이미지</p>
                            <div id="templatemo-slide-link-target" class="card mb-3">
                                {uploadImgUrl && <img src={uploadImgUrl} alt="Uploaded" />}
                                <input
                                    name="img"
                                    type="file" accept="image/*" onChange={onchangeImageUpload} multiple/>

                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <div class="form-floating mb-4">
                            <input 
                            type="text" 
                            class="form-control form-control-lg light-300" 
                            id="floatingsubject" 
                            placeholder="Subject"
                            name="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            ></input>
                            <label for="floatingsubject light-300">Link</label>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <textarea 
                            class="form-control light-300" 
                            rows="8" 
                            placeholder="Message" 
                            id="floatingtextarea"
                            name="coment"
                            value={coment}
                            onChange={(e) => setComent(e.target.value)}
                            type="text"
                            ></textarea>
                            <label for="floatingtextarea light-300">coment</label>
                        </div>
                    </div>

                    <div class="col-md-12 col-12 m-auto text-end">
                        <button type="submit" class="btn btn-secondary rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                        onClick={handleDetail}
                        >프젝 자랑</button>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default ProjectWrite;