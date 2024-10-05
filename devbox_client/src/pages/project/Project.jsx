import { useEffect, useState } from "react";
import ProjectMain from "./ProjectMain";
import Pagination from "../../components/Pagination";

const Project = () => {
    const [pageData, setPageData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('최신순');

    const domain = "http://localhost:8080";
    async function get(page = 1) {
        const res = await fetch(`${domain}/project/list?page=${page}&category=${category}`);
        const data = await res.json();
        
        setPageData(data);
        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        get(currentPage);
    }, [currentPage,category, refresh]);

    const clickState = (s) => {
        setCategory(s);
    };

    return(
        <div className="container py-5">
            <ProjectMain setRefresh={() => setRefresh(prev => !prev)} clickState={clickState} category={category} list={pageData.list} />
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

export default Project;