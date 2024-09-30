import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MyPageSideBar from "../../components/MyPageSideBar";
import MyPageContent from "../../components/MyPageContent";
import MyPageProfileEdit from "../../components/MyPageProfileEdit";
import "./MyPage.css";
import ReservationList from "../reservation/ReservationList";
import MyFreeboard from "../freeboard/MyFreeBoard";


function MyPage() {
  return (
    <section className="container py-5">
      <div className="mypage-container">
        <div className="mypage-sidebar">
          <MyPageSideBar />
        </div>
        <div className="mypage-content">
          <Routes>
          <Route index element={<MyPageContent />} /> 기본 경로에서 MyPageContent 렌더링
          {/* <Route path="content" element={<MyPageContent />} />  */}
          <Route path="edit" element={<MyPageProfileEdit />} />
          <Route path='/reservation/check' element={<ReservationList />} />
          <Route path='/myfreeboard' element={<MyFreeboard />} />
            <Route path="*" element={<Navigate to="/mypage" replace />} />
          </Routes>

        
        </div>
      </div>
    </section>
  );
}
export default MyPage;