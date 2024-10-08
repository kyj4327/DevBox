import { useEffect, useState } from "react";
import WriteShort from "../../components/WriteShort";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../components/context/UserContext";
import QuillEditor from "../../components/QuillEditor";

const MesWrite = () => {
    const { user,loading } = useUser();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [reciver, setReciver] = useState('');
    const [content, setContent] = useState('');
    const [nickNameError, setNickNameError] = useState('');
    const domain = "http://localhost:8080";
    useEffect(() => {
        if (!loading) {
            if (user) {
                setSender(user.nickname || '');
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

    
    // 닉네임 목록을 가져오는 함수
    const checkNicknames = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${domain}/api/user/nicknames`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('닉네임 가져오기 실패');
            }

            const data = await res.json();
            return data; // 닉네임 배열 반환
        } catch (error) {
            console.error('Failed to fetch nicknames:', error);
            return []; // 실패 시 빈 배열 반환
        }
    };

    // 닉네임을 검증하는 함수
    const validateNickname = async (nickname) => {
        
        if (!nickname.trim() || nickname.trim().length === 0) {
            setNickNameError('받는 사람의 닉네임을 입력해주세요.'); // 빈 입력 시 오류 메시지
            return;
        }

        const nicknames = await checkNicknames(); // 닉네임 목록 가져오기
        const nicknameExists = nicknames.includes(nickname); // 입력된 닉네임이 목록에 있는지 확인

        if (!nicknameExists) {
            setNickNameError('존재하지 않는 닉네임입니다.'); // 존재하지 않을 때 오류 메시지
        } else {
            setNickNameError(''); // 존재하면 오류 메시지 제거
        }
    };

    // 닉네임 입력 핸들러
    const handleNickNameChange = (e) => {
        const inputNickname = e.target.value;
        setReciver(inputNickname);
        if (inputNickname.trim()) {
            validateNickname(inputNickname); // 입력된 닉네임 검증
        } else {
            setNickNameError('받는 사람의 닉네임을 입력해주세요.'); // 비어있을 때 오류 메시지
        }
    };


    const handleDetail = async () => {
        if (!reciver.trim()) {
            Swal.fire({
                icon: "error",
                title: "받을 분 입력 오류",
                text: "받을 분을 입력해주세요." // 받을 분 비어있을 때 경고 메시지
            });
            return;
        }
        if (nickNameError) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: nickNameError // 링크 오류 메시지 출력
            });
            return;
        }


        const formData = new FormData();

        formData.append("title", title);
        formData.append("reciver", reciver);
        formData.append("content", content);

        const token = localStorage.getItem('accessToken');
        const url = `${domain}/msg/write`;
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
            navigate('/message/list');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.msg
            });
        }

    };

    return (
        <div>
            <section className="container py-5">
                <div className="container py-5">
                    <h1 className="h2 semi-bold-600 text-center mt-2 pb-5" style={{cursor: 'default'}}>쪽지 작성</h1>
                    <div className="pricing-list rounded-top rounded-3 py-sm-0 py-5">
                        <p className="text-center pb-5 light-300"></p>
                        <div className="contact-form row">
                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>보낼분</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="form-floating">
                                        <input type='text' className="form-control form-control-lg light-300" id='sender' name='sender' placeholder='보낼분'
                                            value={sender} onChange={(e) => { setSender(e.target.value) }} style={{cursor: 'default'}} readOnly />
                                        <label htmlFor="floatingsubject light-300" style={{cursor: 'default'}}>보낼분</label>
                                    </div>
                                </p>
                            </div>

                            <div className="col-lg-6 mb-4">
                                <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>받을분</h2>
                                <p className="worksingle-footer py-3 text-muted light-300">
                                    <div className="form-floating">
                                        <input type="text" className="form-control form-control-lg light-300" id={'reciver'} name={'reciver'} placeholder={'받을분'}
                                            value={reciver} onChange={handleNickNameChange} />
                                        <label htmlFor="floatingsubject light-300" style={{cursor: 'default'}}>받을분</label>
                                    </div>
                                </p>
                                {nickNameError && <p style={{ color: 'red' }}>{nickNameError}</p>}
                            </div>
                            <WriteShort titleTag={'제목'} type={'text'} name={'title'} value={title} onChange={(e) => { setTitle(e.target.value) }} />

                            <h2 className="worksingle-heading h3 pb-3 light-300 typo-space-line" style={{cursor: 'default'}}>작성 내용</h2>
                            <p className="worksingle-footer py-3 text-muted light-300">
                                <div className=" form-floating">
                                    <QuillEditor 
                                        placeholder="내용"
                                        value={content}
                                        onChange={setContent}
                                        height="450px"
                                    />
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-row pt-2">
                    <div className="col-md-12 col-10 text-end">

                        <Button icon={'paper-plane'} text={'보내기'} onClick={handleDetail} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MesWrite;
