import React from 'react';
import './MyPageBox.css';

function MyPageBox({ icon, title, description }) {
  return (
    <div className="single_dashboard_box d-flex">
      <div className="box_icon">
        <i className={icon}></i>
      </div>
        <h6 className="title"><a href="#">{title}</a></h6>
        <p>{description}</p>
    </div>
  );
}

export default MyPageBox;