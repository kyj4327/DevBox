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

function App() {
  return (
    <div className="App">
      {/* <JobInfoList /> */}
      {/* <JobInfoBack /> */}
      <JobInfoFront />
    </div>
  );
}

export default App;
