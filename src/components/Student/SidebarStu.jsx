import React from "react";
import { Link } from "react-router-dom";  // ✅ เพิ่มบรรทัดนี้
import "./SidebarStu.css";

export default function SidebarStu() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="circle">R</div>
        <h3>Rainbow Pinky</h3>
        <p className="role">role : Student</p>
      </div>

      <ul className="menu">
        <li><Link to="/status">Profile</Link></li>
        <li><Link to="/portfolio-form">Upload portfolio</Link></li> {/* ✅ ลิงก์ไป UploadPortfolio.jsx */}
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/logout">LogOut</Link></li>
      </ul>
    </aside>
  );
}
