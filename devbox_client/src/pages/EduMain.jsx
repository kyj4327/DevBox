import '../assets/img/apple-icon.png';
import '../assets/img/favicon.ico';
import '../assets/css/bootstrap.min.css';
import '../assets/css/boxicon.min.css';
import '../assets/css/templatemo.css';
import '../assets/css/custom.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import EduInfo from '../pages/EduInfo';
import { useEffect, useState } from 'react';

const EduMain = () => {
    const [pageData, setPageData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState('모집중');

    async function get(page = 1) {
        const res = await fetch(`http://localhost:8080/edu/list/${state}?page=${page}`);
        const data = await res.json();
        setPageData(data);
        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        get(currentPage);
    }, [currentPage, state]);

    const clickState = (s) => {
        setState(s);
    };
    return (
        <div className="EduMain">
            <Header />
            <EduInfo list={pageData.list} state={state} clickState={clickState} />
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
            <Footer />
        </div>
    );
};

export default EduMain;