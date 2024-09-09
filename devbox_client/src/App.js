import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/img/apple-icon.png";
import "./assets/img/favicon.ico";
import "./assets/css/bootstrap.min.css";
import "./assets/css/boxicon.min.css";
import "./assets/css/templatemo.css";
import "./assets/css/custom.css";

import Header from "./pages/Header";
import JobInfoList from "./pages/JobInfoList";
import Footer from "./pages/Footer";
import BDIAIntroduction from "./pages/BDIAIntroduction";
import BDIASchedule from "./pages/BDIASchedule";
import FreeBoard from "./pages/FreeBoard";
import FreeBoardDetail from "./pages/FreeBoardDetail";
import PostDetail from "./pages/PostDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<JobInfoList />} />
          <Route path="BDIA/introduce" element={<BDIAIntroduction />} />
          <Route path="BDIA/schedule" element={<BDIASchedule />} />
          <Route path="community/freeboard" element={<FreeBoard />} />
          <Route path="community/freeboard/new" element={<FreeBoardDetail />} />
          <Route path="community/freeboard/:id" element={<FreeBoardDetail />} />
          <Route path="community/freeboard/:id/edit" element={<FreeBoardDetail />} />
          <Route path="community/freeboard/post/:id" element={<PostDetail />} />
          <Route path="faq" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;