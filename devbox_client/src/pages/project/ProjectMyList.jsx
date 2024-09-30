import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProjectMain from "./ProjectMain";
import Pagination from "../../components/Pagination";

const ProjectMyList = () => {
    const [pageData, setPageData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const domain = "http://localhost:8080";
   
    async function get(page = 1) {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${domain}/project/mylist?page=${page}`,{
            method: 'GET',
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
            const data = await res.json();
            
            setPageData(data);
            setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        get(currentPage);
    }, [currentPage, refresh]);

    return(
        <div className="mypage-content__wrapper">
            <ProjectMain setRefresh={() => setRefresh(prev => !prev)} list={pageData.list} />
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

export default ProjectMyList;