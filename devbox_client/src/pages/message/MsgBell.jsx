import React, { useEffect, useState } from "react";
import { useUser } from '../../components/context/UserContext'

const MsgBell = () => {
    const [nullReadTimeCount, setNullReadTimeCount] = useState(0);
    const { user } = useUser();

    useEffect(() => {
        console.log(user);
        
        const getMessages = async () => {
            if (!user || !user.nickname) return; // 사용자가 로그인하지 않았거나 username이 없을 경우 fetch를 수행하지 않음

            try {
                const res = await fetch(`http://localhost:8080/msg/bell?reciver=${user.nickname}`, {
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
                    console.error("예상하지 못한 데이터 형식입니다:", data);
                }
            } catch (error) {
                console.error("데이터를 가져오는데 실패했습니다:", error);
            }
        };

        getMessages();
    }, [user]);

    return (
        <a className="nav-link" href="/message/list">
            <i className='bx bx-bell bx-sm bx-tada-hover text-primary' style={{ transform: 'translate(0%, 0%)' }}>
                {nullReadTimeCount > 0 && (
                    <span className="badge rounded-pill bg-danger" style={{ position: 'absolute', top: '-10px', right: '-15px', fontSize: '12px' }}>
                        {nullReadTimeCount}
                    </span>
                )}
                
            </i>
        </a>
    );
};

export default MsgBell;