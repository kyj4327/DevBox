import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProjectMain from "./ProjectMain";
import Pagination from "../../components/Pagination";
import ProjectMyMain from "./ProjectMyMain";

const ProjectMyList = () => {
    const [pageData, setPageData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const domain = "https://www.devback.shop";
    const [data, setData] = useState([]);
   
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
            setData(pageData.list);
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
            <ProjectMyMain setRefresh={() => setRefresh(prev => !prev)} list={pageData.list} />
            {
                data.length > 0 ? (
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
                ) : ''
            }
        </div>
    );
};

export default ProjectMyList;