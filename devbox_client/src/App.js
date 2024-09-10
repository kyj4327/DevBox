import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EduMain from './pages/education/EduMain';
import EduDetail from './pages/education/EduDetail';
import DetailManager from './pages/education/DetailManager';
import EduUpdate from './pages/education/EduUpdate';
import Project from './pages/project/Project';
import ProjectWrite from './pages/project/ProjectWrite';
import ProDetail from './pages/project/ProDetail';
import ProUpdate from './pages/project/ProUpdate';
import MsgWrite from './pages/message/MsgWrite';
import MsgDetail from './pages/message/MsgDedail';
import Message from './pages/message/Message';
import MsgReply from './pages/message/MsgReply';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path='/edu/list' element={<EduMain />} />
        <Route path='/edu/detail' element={<EduDetail />} />
        <Route path='/edu/maneger' element={<DetailManager />} />
        <Route path='/edu/update' element={<EduUpdate />} />

        <Route path='/project/list' element={<Project />} />
        <Route path='/project/write' element={<ProjectWrite />} />
        <Route path='/project/detail' element={<ProDetail />} />
        <Route path='/project/update' element={<ProUpdate />} />

        <Route path='/message/list' element={<Message />} />
        <Route path='/message/write' element={<MsgWrite />} />
        <Route path='/message/detail' element={<MsgDetail/>} />
        <Route path='/message/reply' element={<MsgReply />} />



      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
