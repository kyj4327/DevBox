import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import EduMain from './pages/education/EduMain';
import EduDetail from './pages/education/EduDetail';
import DetailManager from './pages/education/DetailManager';
import EduUpdate from './pages/education/EduUpdate';
import Project from './pages/project/Project';
import ProjectWrite from './pages/project/ProjectWrite';
import MsgWrite from './pages/message/MsgWrite';
import MsgDetail from './pages/message/MsgDedail';
import Message from './pages/message/Message';
import MsgReply from './pages/message/MsgReply';
import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

import AuthContainer from './pages/auth/AuthContainer';
import { Naver } from './components/Naver';
import HomePage from './pages/HomePage';
import MyPage from './pages/auth/MyPage';
import PasswordReset from './pages/auth/PasswordReset';
import Header from './components/Header';
import Footer from './components/Footer';
import GatherMateWrite from './pages/gatherMate/GatherMateWrite';
import GatherMateList from './pages/gatherMate/GatherMateList';
import GatherMateDetail from './pages/gatherMate/GatherMateDetail';
import ProjectDetail from './pages/project/ProjectDetail';
import ProjectUpdate from './pages/project/ProjectUpdate';
import GatherMateEdit from './pages/gatherMate/GatherMateEdit';

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ['/auth', '/password'].includes(location.pathname);

  return (

    <div className="app-wrapper">
      {!hideHeaderFooter && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/password" element={<PasswordReset />} />
          {/*<Route path="/login" element={<Naver />} />*/}
          <Route path="/home" element={<HomePage />} />
          <Route path="/mypage/*" element={<MyPage />} />

          <Route path="/gatherwrite" element={<GatherMateWrite />} />
          <Route path="/gatherlist" element={<GatherMateList />} />
          <Route path="/gatherdetail/:postId" element={<GatherMateDetail />} />
          <Route path="/gatheredit/:postId" element={<GatherMateEdit />} />

          <Route path='/edu/list' element={<EduMain />} />
          <Route path='/edu/detail' element={<EduDetail />} />
          <Route path='/edu/maneger' element={<DetailManager />} />
          <Route path='/edu/update' element={<EduUpdate />} />

          <Route path='/project/list' element={<Project />} />
          <Route path='/project/write' element={<ProjectWrite />} />
          <Route path='/project/detail' element={<ProjectDetail />} />
          <Route path='/project/update' element={<ProjectUpdate />} />

          <Route path='/message/list' element={<Message />} />
          <Route path='/message/write' element={<MsgWrite />} />
          <Route path='/message/detail' element={<MsgDetail />} />
          <Route path='/message/reply' element={<MsgReply />} />

        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />} {/* Footer 추가 */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
