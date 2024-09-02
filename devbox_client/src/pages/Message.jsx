import { useEffect, useState } from "react";
import MsgList from "./MsgList";
import ProPagination from "./ProPagination";

const Message = () => {
    const [pageData, setPageData] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

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
    }, [currentPage, sender,category]);

    const clickState = (s) => {
        setCategory(s);
    };


    return(
        <div className="Message">

        <MsgList list={pageData.list} sender={sender} category={category} clickState={clickState} />
        <ProPagination
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