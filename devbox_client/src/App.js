import './App.css';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

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
import ReservationList from './pages/reservation/ReservationList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 개발 직군 게시판 */}
          <Route path='/jobInfo/list' element={<JobInfoList />} />
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
          <Route path='/reservation/list' element={<ReservationList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
