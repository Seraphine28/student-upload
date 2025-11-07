import React from "react";

export default function SidebarRecru() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="circle">R</div>
        <h3>Recruiter</h3>
        <span className="role">role : Recruiter</span>
      </div>

      <ul className="menu">
        <li>Home</li>
        <li>Log Out</li>
      </ul>
    </aside>
  );
}