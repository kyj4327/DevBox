import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EduMain from './components/EduMain';
import EduDetail from './components/EduDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

       <Route path='/' element={<EduMain />} />
       <Route path='/detail' element={<EduDetail />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
