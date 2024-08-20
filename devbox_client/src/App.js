import './App.css';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

import Header from './components/Header';
import JobInfoList from './components/JobInfoList';
import JobInfoDetail from './components/JobInfoDetail';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <JobInfoList /> */}
      <JobInfoDetail />
      <Footer />
    </div>
  );
}

export default App;
