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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<JobInfoList />} />
          <Route path="/bdia" element={<BDIAIntroduction />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;