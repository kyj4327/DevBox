import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

import AuthContainer from './components/AuthContainer';
import { Naver } from './components/Naver';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import PasswordReset from './pages/PasswordReset';
import Header from './components/Header';
import Footer from './components/Footer';
import GatherMateWrite from './pages/GatherMateWrite';

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
          <Route path="/login" element={<Naver />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/gatherwrite" element={<GatherMateWrite />} />
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
