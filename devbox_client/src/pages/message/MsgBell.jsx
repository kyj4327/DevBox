import React, { useEffect, useState } from "react";
import { useUser } from '../../components/context/UserContext'
import { Link } from "react-router-dom";

const MsgBell = () => {
    const [nullReadTimeCount, setNullReadTimeCount] = useState(0);
    const { user } = useUser();
    const domain = "https://www.devback.shop";
    useEffect(() => {

        const getMessages = async () => {
            if (!user || !user.nickname) return; // 사용자가 로그인하지 않았거나 username이 없을 경우 fetch를 수행하지 않음

            try {
                const res = await fetch(`${domain}/msg/bell?reciver=${user.nickname}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('메시지 가져오기 실패');
                }

                const data = await res.json();
                if (Array.isArray(data.messages)) {
                    const unreadCount = data.messages.filter(
                        (item) => item.readTime === null
                    ).length;

                    setNullReadTimeCount(unreadCount);
                } else {
                    setNullReadTimeCount(0); // 잘못된 데이터 형식인 경우에도 0으로 설정
                }
            } catch (error) {
                console.error("데이터를 가져오는데 실패했습니다:", error);
                setNullReadTimeCount(0); // 오류 발생 시에도 0으로 설정
            }
        };

        getMessages();
    }, [user]);

    return (
        <Link to="/message/list" className="header-logout-button nav-link">
            <i className='bx bx-bell bx-sm bx-tada-hover text-primary' style={{ transform: 'translate(0%, 0%)' }}>
                {nullReadTimeCount > 0 && (
                    <span className="badge rounded-pill bg-danger" style={{ position: 'absolute', top: '-10px', right: '-15px', fontSize: '12px' }}>
                        {nullReadTimeCount}
                    </span>
                )}

            </i>
        </Link>
    );
};

export default MsgBell;