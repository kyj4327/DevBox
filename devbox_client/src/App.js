import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import EduMain from './pages/education/EduMain';
import EduDetail from './pages/education/EduDetail';
import EduUpdate from './pages/education/EduUpdate';
import Project from './pages/project/Project';
import ProjectWrite from './pages/project/ProjectWrite';
import MsgWrite from './pages/message/MsgWrite';
import Message from './pages/message/Message';
import MsgReply from './pages/message/MsgReply';

import ScrollToTop from './components/ScrollToTop';

import JobInfoList from './pages/jobInfo/JobInfoList';
import JobInfoBack from './pages/jobInfo/JobInfoBack';
import JobInfoFront from './pages/jobInfo/JobInfoFront';
import JobInfoDevOps from './pages/jobInfo/JobInfoDevOps';
import JobInfoCloud from './pages/jobInfo/JobInfoCloud';
import JobInfoData from './pages/jobInfo/JobInfoData';
import JobInfoMobile from './pages/jobInfo/JobInfoMobile';
import ReferenceList from './pages/reference/ReferenceList';
import ReferenceWrite from './pages/reference/ReferenceWrite';
import ReferenceUpdate from './pages/reference/ReferenceUpdate';
import HiringList from './pages/hiring/HiringList';
import HiringWrite from './pages/hiring/HiringWrite';
import HiringUpdate from './pages/hiring/HiringUpdate';
import ContestList from './pages/contest/ContestList';
import ContestWrite from './pages/contest/ContestWrite';
import ContestUpdate from './pages/contest/ContestUpdate';
import Reservation from './pages/reservation/Reservation';

import AuthContainer from './pages/auth/AuthContainer';
// import { UserProvider } from './components/context/UserContext';

import MyPage from './pages/auth/MyPage';
import PasswordReset from './pages/auth/PasswordReset';
import Header from './components/Header';
import Footer from './components/Footer';

import GatherMateList from './pages/gatherMate/GatherMateList';
import GatherMateWrite from './pages/gatherMate/GatherMateWrite';
import GatherMateDetail from './pages/gatherMate/GatherMateDetail';
import GatherMateEdit from './pages/gatherMate/GatherMateEdit';
import GreetingList from './pages/greeting/GreetingList';

import NoticeList from './pages/notice/NoticeList';
import NoticeWrite from './pages/notice/NoticeWrite';
import NoticeDetail from './pages/notice/NoticeDetail';
import NoticeEdit from './pages/notice/NoticeEdit';

import ProjectDetail from './pages/project/ProjectDetail';
import ProjectUpdate from './pages/project/ProjectUpdate';
import { UserProvider } from './components/context/UserContext';

import BDIAIntroduction from "./pages/bdia/BDIAIntroduction";
import BDIASchedule from "./pages/bdia/BDIASchedule";
import FreeBoardList from "./pages/freeboard/FreeBoardList";
import FreeBoardWrite from "./pages/freeboard/FreeBoardWrite";
import FreeBoardDetail from "./pages/freeboard/FreeBoardDetail";
import Contact from "./pages/contact/Contact";
import EduWrite from './pages/education/EduWrite';
import Main from './pages/Main';
import MsgDetail from './pages/message/MsgDetail';

import NotFound from './components/NotFound';


function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Header와 Footer를 숨길 경로 정의
  const hideHeader = currentPath === '/password';
  const hideFooter = currentPath === '/password' || currentPath === '/auth';
  return (
    <div className="app-wrapper">
      {!hideHeader && <Header />} {/* Header 조건부 렌더링 */}
      <main className="main-content">
        <ScrollToTop />
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<Main />} />

          {/* 로그인/회원가입 */}
          <Route path="/auth" element={<AuthContainer />} />

          {/* 비밀번호 찾기 */}
          <Route path="/password" element={<PasswordReset />} />

          {/* MyPage */}
          <Route path="/mypage/*" element={<MyPage />} />

          {/* 모여라 메이트 */}
          <Route path="/gathermate/write" element={<GatherMateWrite />} />
          <Route path="/gathermate/list" element={<GatherMateList />} />
          <Route path="/gathermate/detail/:postId" element={<GatherMateDetail />} />
          <Route path="/gathermate/edit/:postId" element={<GatherMateEdit />} />

          {/* 공지사항 게시판 */}
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/notice/list" element={<NoticeList />} />
          <Route path="/notice/detail/:postId" element={<NoticeDetail />} />
          <Route path="/notice/edit/:postId" element={<NoticeEdit />} />

          {/* 가입인사 게시판 */}
          <Route path="/greeting/list" element={<GreetingList />} />

          {/* 교육 프로그램 */}
          <Route path='/edu/list' element={<EduMain />} />
          <Route path='/edu/detail' element={<EduDetail />} />
          <Route path='/edu/write' element={<EduWrite />} />
          <Route path='/edu/update' element={<EduUpdate />} />

          {/* 프로젝트 자랑 */}
          <Route path='/project/list' element={<Project />} />
          <Route path='/project/write' element={<ProjectWrite />} />
          <Route path='/project/detail' element={<ProjectDetail />} />
          <Route path='/project/update' element={<ProjectUpdate />} />

          {/* 쪽지 */}
          <Route path='/message/list' element={<Message />} />
          <Route path='/message/write' element={<MsgWrite />} />
          <Route path='/message/detail' element={<MsgDetail />} />
          <Route path='/message/reply' element={<MsgReply />} />
            
          {/* 개발 직군 게시판 */}
          <Route path='/jobinfo/list' element={<JobInfoList/>} />
          <Route path='/jobinfo/backend' element={<JobInfoBack />} />
          <Route path='/jobinfo/frontend' element={<JobInfoFront />} />
          <Route path='/jobinfo/devops' element={<JobInfoDevOps />} />
          <Route path='/jobinfo/cloud' element={<JobInfoCloud />} />
          <Route path='/jobinfo/data' element={<JobInfoData />} />
          <Route path='/jobinfo/mobile' element={<JobInfoMobile />} />

          {/* 추천해요 게시판 */}
          <Route path='/reference/list' element={<ReferenceList />} />
          <Route path='/reference/write' element={<ReferenceWrite />} />
          <Route path='/reference/update' element={<ReferenceUpdate />} />

          {/* 채용 공고 게시판 */}
          <Route path='/hiring/list' element={<HiringList />} />
          <Route path='/hiring/write' element={<HiringWrite />} />
          <Route path='/hiring/update' element={<HiringUpdate />} />

          {/* 공모전 게시판 */}
          <Route path='/contest/list' element={<ContestList />} />
          <Route path='/contest/write' element={<ContestWrite />} />
          <Route path='/contest/update' element={<ContestUpdate />} />

          {/* 6층 회의실 대여 서비스 */}
          <Route path='/reservation/write' element={<Reservation />} />

          {/* BDIA 소개 */}
          <Route path="/introduce" element={<BDIAIntroduction />} />

          {/* 연간 교육 일정 */}
          <Route path="/schedule" element={<BDIASchedule />} />

          {/* 자유게시판 */}
          <Route path="/freeboard/list" element={<FreeBoardList />} />
          <Route path="/freeboard/write" element={<FreeBoardWrite />} />
          <Route path="/freeboard/:id" element={<FreeBoardWrite />} />
          <Route path="/freeboard/update/:id" element={<FreeBoardWrite />} />
          <Route path="/freeboard/detail/:id" element={<FreeBoardDetail />} />

          {/* FAQ */}
          <Route path="/faq" element={<Contact />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />} {/* Footer 조건부 렌더링 */}
    </div>
  );
}

function App() {
  return (
    // <UserProvider>
    <Router>
    <UserProvider>
      <AppContent />
    </UserProvider>
  </Router>
  );
}

export default App;
