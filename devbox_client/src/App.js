import './App.css';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

import Header from './components/Header';
import JobInfoList from './components/JobInfoList';
import JobInfoBack from './components/JobInfoBack';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <JobInfoList /> */}
      <JobInfoBack />
      <Footer />
    </div>
  );
}

export default App;
