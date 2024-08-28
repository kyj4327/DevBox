import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectMain from "./ProjectMain";
import ProPagination from "./ProPagination";

const Project = () => {
    const [pageData, setPageData] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    async function get(page = 1) {
        const res = await fetch(`http://localhost:8080/pro/list?page=${page}`);
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
        <div className="Project">
            <Header />
            <ProjectMain list={pageData.list} />
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
            <Footer />
        </div>
    );
};

export default Project;