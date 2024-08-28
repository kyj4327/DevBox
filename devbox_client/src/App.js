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
import DragDrop from './components/DragDrop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

       <Route path='/' element={<Main />}>
        <Route path='/edu/list' element={<EduMain />} />
        <Route path='/edu/detail' element={<EduDetail />} />
        <Route path='/edu/maneger' element={<DetailManager />} />
        <Route path='/edu/update' element={<EduUpdate />} />

        <Route path='/project/list' element={<Project />} />
        <Route path='/project/write' element={<ProjectWrite />} />
        <Route path='/project/detail' element={<ProDetail />} />
        <Route path='/project/update' element={<ProUpdate />} />
        <Route path='' element={<DragDrop />} />
       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
