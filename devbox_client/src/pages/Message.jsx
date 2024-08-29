import { useEffect, useState } from "react";
import MsgList from "./MsgList";
import ProPagination from "./ProPagination";

const Message = () => {
    const [pageData, setPageData] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    async function get(page = 1) {
        const res = await fetch(`http://localhost:8080/msg/list?page=${page}`);
        const data = await res.json();
        setPageData(data);
        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        get(currentPage);
    }, [currentPage]);
    return(
        <div className="Message">

        <MsgList list={pageData.list} />
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