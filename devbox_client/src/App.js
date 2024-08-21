import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EduMain from './components/EduMain';
import EduDetail from './components/EduDetail';
import DetailManager from './components/DetailManager';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

       <Route path='/' element={<EduMain />} />
       <Route path='/detail' element={<EduDetail />} />
       <Route path='/dm' element={<DetailManager />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
