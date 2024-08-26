import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EduMain from './components/EduMain';
import EduDetail from './components/EduDetail';
import DetailManager from './components/DetailManager';
import EduUpdate from './components/EduUpdate';
import Main from './components/Main';
import Project from './components/Project';
import ProjectWrite from './components/ProjectWrite';
import ProjectDetail from './components/ProjectDetail';
import ProDetail from './components/ProDetail';
import ProUpdate from './components/ProUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

       <Route path='/' element={<Main />}>
        <Route path='' element={<EduMain />} />
        <Route path='detail' element={<EduDetail />} />
        <Route path='dm' element={<DetailManager />} />
        <Route path='up' element={<EduUpdate />} />

        <Route path='pr' element={<Project />} />
        <Route path='pw' element={<ProjectWrite />} />
        <Route path='pd' element={<ProDetail />} />
        <Route path='pu' element={<ProUpdate />} />
       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
