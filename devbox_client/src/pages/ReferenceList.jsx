import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReferenceList = () => {
    const navigate = useNavigate();
    const toWrite = () => {
        navigate('/reference/write');
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        async function get() {
            const url = 'http://127.0.0.1:8080/reference/list';
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        }
        get();
    }, []);

    return (
        <div>
            <Header />
            <section className="container py-5">
                <div class="container py-5">
                    <h1 class="h2 semi-bold-600 text-center mt-2">추천해요</h1>
                    <p class="text-center pb-5 light-300">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut facilisis.</p>
                    <div className="row justify-content-center my-5">
                        <div className="filter-btns shadow-md rounded-pill text-center col-auto">
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4 active" data-filter=".project" href="#">All</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".business" href="#">Web</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">DevOps</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Cloud</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Data</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Mobile</a>
                            <a className="filter-btn btn rounded-pill btn-outline-primary border-0 m-md-2 px-md-4" data-filter=".marketing" href="#">Others</a>
                        </div>
                    </div>
                    {
                        data.map((v) => {
                            return (
                                <div class="pricing-list shadow-sm rounded-top rounded-3 py-sm-0 py-5">
                                    <div class="row p-2">
                                        <div class="pricing-list-icon col-3 text-center m-auto text-secondary ml-5 py-2">
                                            <h3>{v.title}</h3>
                                            <a href=''
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    async function send() {
                                                        const url = `http://127.0.0.1:8080/reference/delete?referenceId=${v.id}`;
                                                        await fetch(url);
                                                        alert("삭제가 완료되었습니다.");
                                                        window.location.reload();
                                                    }
                                                    send();
                                                }}>삭제</a>
                                        </div>
                                        <div class="pricing-list-body col-md-5 align-items-center pl-3 pt-2">
                                            <li style={{ listStyle: 'none' }}>{v.selectJob}</li>
                                            <li>{v.content1}</li>
                                            <li>{v.content2}</li>
                                        </div>
                                        <div class="pricing-list-footer col-4 text-center m-auto align-items-center">
                                            <a href={v.link} class="btn rounded-pill px-4 btn-primary light-300" target='_blank'>Link</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div class="form-row pt-2">
                    <div class="col-md-12 col-10 text-end">
                        <Button text={'작성하기'} onClick={toWrite} />
                    </div>
                </div>
            </section>
            <Pagination />
            <Footer />
        </div>
    );
};

export default ReferenceList;