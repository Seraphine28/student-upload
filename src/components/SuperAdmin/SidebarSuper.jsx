// src/components/SuperAdmin/SidebarSuper.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./SidebarSuper.css"; // ✅ เพิ่มไฟล์แยก theme ของ Super Admin

export default function SidebarSuper() {
  return (
    <aside className="sidebar sidebar-super"> {/* เพิ่ม class 'sidebar-super' */}
      <div className="profile">
        <div className="circle">S</div>
        <h3>Super Admin</h3>
        <span className="role">role : Super Admin</span>
      </div>

      <ul className="menu">
        <li><Link to="/super/verify">Verify Portfolio from Advisor</Link></li>
        <li><Link to="/super/verify-acc">Verify Account New User</Link></li>
        <li><Link to="/">Log Out</Link></li>
      </ul>
    </aside>
  );
}

