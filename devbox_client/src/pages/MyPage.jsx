import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MyPageSideBar from '../components/MyPageSideBar';
import MyPageContent from '../components/MyPageContent';
import MyPageProfileEdit from '../components/MyPageProfileEdit';
import './MyPage.css';

function MyPage() {
  return (
    <section className="dashboard_page pt-70 pb-120">
      <div className="mypage-container">
        <div className="mypage-sidebar">
          <MyPageSideBar />
        </div>
        <div className="mypage-content">
          <Routes>
            <Route index element={<MyPageContent />} />
            <Route path="edit" element={<MyPageProfileEdit />} />
            {/* <Route path="retrospect" element={<Retrospect />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="posts" element={<MyPosts />} /> */}
            <Route path="*" element={<Navigate to="/mypage" replace />} />
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default MyPage;