import './App.css';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

import ScrollToTop from './components/ScrollToTop';
import JobInfoList from './pages/JobInfoList';
import JobInfoBack from './pages/JobInfoBack';
import JobInfoFront from './pages/JobInfoFront';
import JobInfoDevOps from './pages/JobInfoDevOps';
import JobInfoCloud from './pages/JobInfoCloud';
import JobInfoData from './pages/JobInfoData';
import JobInfoMobile from './pages/JobInfoMobile';
import ReferenceList from './pages/ReferenceList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 개발 직군 게시판 */}
          <Route path='/jobInfo' element={<JobInfoList />} />
          <Route path='/jobinfo/backend' element={<JobInfoBack />} />
          <Route path='/jobinfo/frontend' element={<JobInfoFront />} />
          <Route path='/jobinfo/devops' element={<JobInfoDevOps />} />
          <Route path='/jobinfo/cloud' element={<JobInfoCloud />} />
          <Route path='/jobinfo/data' element={<JobInfoData />} />
          <Route path='/jobinfo/mobile' element={<JobInfoMobile />} />

          {/* 추천해요 게시판 */}
          <Route path='/reference/list' element={<ReferenceList />} />
          <Route path='/reference/write' element={<ReferenceList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
