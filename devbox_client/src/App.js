import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

// import Header from './components/Header';
// import JobInfoList from './components/JobInfoList';
// import Footer from './components/Footer';

import AuthContainer from './components/AuthContainer';



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/auth" element={<AuthContainer />} />
    </Routes>
  </Router>
  );
}

export default App;
