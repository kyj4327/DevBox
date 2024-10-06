import '../../assets/img/apple-icon.png';
import '../../assets/img/favicon.ico';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/boxicon.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/custom.css';

import Pagination from '../../components/Pagination';
import EduInfo from './EduInfo';
import { useEffect, useState } from 'react';

const EduMain = () => {
    const domain = "https://www.devback.shop"; 
    const [pageData, setPageData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState('모집중');
    const [endDate, setEndDate] = useState('');

    async function get(page = 1) {
        const res = await fetch(`${domain}/edu/list/${state}?page=${page}`);
        const data = await res.json();
        setPageData(data);
        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트

        // 데이터 내부에서 recruit 정보 추출 (data 객체 구조에 따라 다름)
        if (data.list && data.list.length > 0) {
            const recruit = data.list[0].recruit;  // 예시: data.list 배열 안에 recruit가 있는 경우

            if (recruit) {
                const recruitDates = recruit.split(' ~ ');
                setEndDate(recruitDates[1]);  // 끝 날짜를 추출하여 상태 변수에 저장
            } 
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
    const clickState = (s) => {
        setState(s);
    };

    useEffect(() => {
        get(currentPage);

    }, [currentPage, state]);

    return (
        <div className="EduMain">
            <EduInfo list={pageData.list} state={state} clickState={clickState} endDate={endDate} />
            <Pagination 
                handlePageChange={handlePageChange} 
                pageData={{
                    'startPage': pageData.startPage,
                    'endPage': pageData.endPage,
                    'currentPage': pageData.currentPage,
                    'totalPage': pageData.totalPage
                }}
            />
        </div>
    );
};

export default EduMain;
