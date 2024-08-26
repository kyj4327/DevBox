import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';




import Header from './components/Header';
import JobInfoList from './components/JobInfoList';
import Footer from './components/Footer';
import BDIAIntroduction from './components/BDIAIntroduction';
import FreeBoard from './components/FreeBoard';
import BDIASchedule from './components/BDIASchedule';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<JobInfoList />} />
          <Route path="BDIA/introduce" element={<BDIAIntroduction />} />
          <Route path="BDIA/schedule" element={<BDIASchedule />} />
          <Route path="/community/forums" element={<FreeBoard />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;