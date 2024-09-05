import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/img/apple-icon.png";
import "./assets/img/favicon.ico";
import "./assets/css/bootstrap.min.css";
import "./assets/css/boxicon.min.css";
import "./assets/css/templatemo.css";
import "./assets/css/custom.css";

import Header from "./components/Header";
import JobInfoList from "./components/JobInfoList";
import Footer from "./components/Footer";
import BDIAIntroduction from "./components/BDIAIntroduction";
import BDIASchedule from "./components/BDIASchedule";
import FreeBoard from "./components/FreeBoard";
import FreeBoardDetail from "./components/FreeBoardDetail";
import PostDetail from "./components/PostDetail";
import Contact from "./components/Contact";



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
          <Route path="community/freeboard/edit/:id" element={<FreeBoardDetail />} />
          <Route path="community/freeboard/post/:id" element={<PostDetail />} />
          <Route path="faq" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;