import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MsgBell = () => {
    const navigate = useNavigate();
    const [nullReadTimeCount, setNullReadTimeCount] = useState(0);
    // const { user } = useUser();
    // const [bellData, setBellData] = useState({});

    async function get() {
        // if (user) {
        try {
            const res = await fetch('http://localhost:8080/msg/bell?reciver=민준');
            const data = await res.json();
            // setBellData(data);
            if (Array.isArray(data.messages)) {
                const nullCount = data.messages.filter(
                    item => item.readTime === null
                ).length;
                setNullReadTimeCount(nullCount);
            } else {
                console.error("Received data is not in expected format:", data);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <a className="nav-link" href="/message/list">
            <i className='bx bx-bell bx-sm bx-tada-hover text-primary' style={{ transform: 'translate(0%, 0%)'}}>
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
