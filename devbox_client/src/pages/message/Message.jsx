import { useEffect, useState } from "react";
import MsgList from "./MsgList";
import Pagination from "../../components/Pagination";

const Message = () => {
    const [pageData, setPageData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    
    const [refresh, setRefresh] = useState(false);
    // 상태 변경 초기값 false

    const [sender, setSender] = useState('민준');
    const [category, setCategory] = useState('받은쪽지');

    async function get(page = 1) {
        const res = await fetch(`http://localhost:8080/msg/list/${sender}?page=${page}&category=${category}`);

        const data = await res.json();
        console.log(data);
        setPageData(data);
        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트
        
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        get(currentPage);
    }, [currentPage, sender, category, refresh]); // 상태가 변경될때마다 다시 실행

    const clickState = (s) => {
        setCategory(s);
    };


    return(
        <div className="Message">

        <MsgList setRefresh={() => setRefresh(prev => !prev)} // 상태 반전
            list={pageData.list} sender={sender} category={category} clickState={clickState} />
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