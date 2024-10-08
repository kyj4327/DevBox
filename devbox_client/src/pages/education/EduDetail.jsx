import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import { useUser } from "../../components/context/UserContext";

const EduDetail = () => {
    const domain = "https://www.devback.shop";    
    const { user } = useUser();
    const navigate = useNavigate();
    const [eduData, setEduData] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const userRole = user ? user.role : null;

    async function get() {
        const res = await fetch(`${domain}/edu/detail?id=${id}`);
        const data = await res.json();
        setEduData(data);
    }



    useEffect(() => {
        get();
    }, []);

    return (
        <div className="container py-5">
            <div className="container">
                    <h1 className="h2 semi-bold-600 text-center mt-2" style={{cursor: 'default'}}>교육 프로그램</h1>
                    <p
                        className="text-center light-300"
                        style={{ marginBottom: "0", padding: "0px", cursor: 'default' }}
                    >
                        멀 보고 있냐~ 신청해야지!!
                    </p>
                </div>

                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h1 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>{eduData.title}</h1>
                        
                    </div>
                </div>
            <section className="container py-5">
                <div className="row justify-content-center pb-4">
                    <div className="col-lg-8">
                        <div id="templatemo-slide-link-target" className="card mb-3">
                            <img className="img-fluid border rounded" src={`${domain}/edu/download?id=${eduData.id}`} alt="Card image cap" />
                        </div>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="worksingle-content col-lg-8 m-auto text-left justify-content-center">
                        <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>과정요약</h2>
                        <p className="worksingle-footer py-3 text-muted light-300">
                            <li>모집기간: {eduData.recruit}</li>
                            <li>교육기간: {eduData.eduterm}</li>
                            <li>모집인원: {eduData.people}</li>
                            <li>모집상태: {eduData.state}</li>
                            <li>신청 ▶ <Link to={eduData.link} target="_blank">{eduData.link}</Link></li>
                        </p>
                        <div className="row">
                            <div className="col text-start">
                                <Button icon={'list'} text={'목록'} onClick={() => { navigate('/edu/list') }} />
                            </div>
                            <div className="col text-end">
                                {  userRole === "ROLE_ADMIN" &&  (
                                    <>
                                        <button type="submit" className="me-2 button_css border border-2" onClick={(e) => { e.preventDefault(); navigate(`/edu/update?id=${eduData.id}`); }}>
                                            <i className={`fas fa-edit`}></i> 수정
                                        </button>
                                        <Button
                                            icon={'trash'}
                                            text={'삭제'}
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                // SweetAlert2로 삭제 확인 창 띄우기
                                                const result = await Swal.fire({
                                                    icon: "warning",
                                                    title: "삭제하시겠습니까?",
                                                    text: "삭제 후에는 되돌릴 수 없습니다.",
                                                    showCancelButton: true, // 취소 버튼 추가
                                                    confirmButtonText: "삭제",
                                                    confirmButtonColor: "#d33", // 삭제 버튼 색상 (빨간색)
                                                    cancelButtonText: "취소",
                                                    cancelButtonColor: "#3085d6" // 취소 버튼 색상 (파란색)
                                                });

                                                const token = localStorage.getItem('accessToken');
                                                // 사용자가 '삭제' 버튼을 눌렀을 때만 삭제 요청 보내기
                                                if (result.isConfirmed) {
                                                    const url = `${domain}/edu/delete?Id=${eduData.id}`;
                                                    const res = await fetch(url, {
                                                        method: 'DELETE',
                                                        credentials: 'include',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`
                                                        },
                                                    });

                                                    Swal.fire({
                                                        icon: "success",
                                                        title: "삭제되었습니다."
                                                      });
                                                    navigate('/edu/list');
                                                }
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>



            </section>
        </div>
    );
};

export default EduDetail;