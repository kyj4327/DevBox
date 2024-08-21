import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Banner = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [imagePath, setImagePath] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    async function get() {
        const res = await fetch(`http://localhost:8080/edu/detail`);
        const data = await res.json();
        setTitle(data.title);
        setDesc(data.desc);
        setImagePath(data.imagePath);
    }

    useEffect(() => {
        get();
    }, []);


    return (
        <div id="work_single_banner" class="bg-light w-100">
            <div class="container-fluid text-light d-flex justify-content-center align-items-center border-0 rounded-0 p-0 py-5">
                <div class="banner-content col-lg-8 m-lg-auto text-center py-5 px-3">
                    <h1 class="banner-heading h2 pb-5 typo-space-line-center">{title}</h1>
                    <p class="banner-footer light-300">
                        {desc}
                    </p>
                    <img src={imagePath}></img>
                </div>
            </div>
        </div>
    );
};

export default Banner;