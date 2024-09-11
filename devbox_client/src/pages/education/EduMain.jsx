import '../../assets/img/apple-icon.png';
import '../../assets/img/favicon.ico';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/boxicon.min.css';
import '../../assets/css/templatemo.css';
import '../../assets/css/custom.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';
import EduInfo from './EduInfo';
import { useEffect, useState } from 'react';

const EduMain = () => {
    const [pageData, setPageData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState('모집중');
    const [endDate, setEndDate] = useState('');

    async function get(page = 1) {
        const res = await fetch(`http://localhost:8080/edu/list/${state}?page=${page}`);
        const data = await res.json();
        setPageData(data);
        setCurrentPage(page);  // 페이지 데이터 불러온 후, 현재 페이지 업데이트

        // 서버에서 전달된 전체 데이터 로그 확인
        console.log("서버에서 받은 전체 데이터:", data);

        // 데이터 내부에서 recruit 정보 추출 (data 객체 구조에 따라 다름)
        if (data.list && data.list.length > 0) {
            const recruit = data.list[0].recruit;  // 예시: data.list 배열 안에 recruit가 있는 경우
            console.log("recruit 데이터:", recruit);

            if (recruit) {
                const recruitDates = recruit.split(' ~ ');
                console.log("추출된 끝 날짜:", recruitDates[1]);
                setEndDate(recruitDates[1]);  // 끝 날짜를 추출하여 상태 변수에 저장
            } 
        }
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
