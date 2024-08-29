import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EduMain from './pages/EduMain';
import EduDetail from './pages/EduDetail';
import DetailManager from './pages/DetailManager';
import EduUpdate from './pages/EduUpdate';
import Main from './pages/Main';
import Project from './pages/Project';
import ProjectWrite from './pages/ProjectWrite';
import ProDetail from './pages/ProDetail';
import ProUpdate from './pages/ProUpdate';
import DragDrop from './pages/DragDrop';
import MsgWrite from './pages/MsgWrite';
import MsgList from './pages/MsgList';
import MsgDetail from './pages/MsgDedail';
import Message from './pages/Message';

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

        <Route path='/message/list' element={<Message />} />
        <Route path='/message/write' element={<MsgWrite />} />
        <Route path='/message/detail' element={<MsgDetail/>} />

       </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
