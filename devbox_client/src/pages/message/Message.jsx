import { useEffect, useState } from "react";
import MsgList from "./MsgList";
import Pagination from "../../components/Pagination";

const Message = () => {
    const [pageData, setPageData] = useState({});
    const [readTime, setReadTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const domain = "http://localhost:8080"; 
    const [refresh, setRefresh] = useState(false);
    // 상태 변경 초기값 false
    const [category, setCategory] = useState('받은쪽지');

    async function get(page = 1) {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${domain}/msg/box?page=${page}&category=${category}`,{
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            }, 
        });

        const data = await res.json();
        setPageData(data);
        setReadTime(data.readtime);

        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트
    }

    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        get(currentPage);
    }, [currentPage, category, refresh]); // 상태가 변경될때마다 다시 실행

    const clickState = (s) => {
        setCategory(s);
    };
    

    return(
        <div className="Message">

        <MsgList setRefresh={() => setRefresh(prev => !prev)} // 상태 반전
            list={pageData.list} category={category} clickState={clickState} />
        <Pagination
             handlePageChange={handlePageChange} 
             pageData={
                 {
                     'startPage': pageData.startPage,
                     'endPage': pageData.endPage,
                     'currentPage': pageData.currentPage,
                     'totalPage': pageData.totalPage
                 }
             }
            />
        </div>

    );
};

export default Message;