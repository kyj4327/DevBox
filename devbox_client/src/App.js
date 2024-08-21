import './App.css';

import './assets/img/apple-icon.png';
import './assets/img/favicon.ico';
import './assets/css/bootstrap.min.css';
import './assets/css/boxicon.min.css';
import './assets/css/templatemo.css';
import './assets/css/custom.css';

import JobInfoList from './pages/JobInfoList';
import JobInfoBack from './pages/JobInfoBack';
import JobInfoFront from './pages/JobInfoFront';
import JobInfoDevOps from './pages/JobInfoDevOps';
import JobInfoCloud from './pages/JobInfoCloud';
import JobInfoData from './pages/JobInfoData';
import JobInfoMobile from './pages/JobInfoMobile';

function App() {
  return (
    <div className="App">
      {/* <JobInfoList /> */}
      {/* <JobInfoBack /> */}
      {/* <JobInfoFront /> */}
      {/* <JobInfoDevOps /> */}
      {/* <JobInfoCloud /> */}
      {/* <JobInfoData /> */}
      <JobInfoMobile />
    </div>
  );
}

export default App;
