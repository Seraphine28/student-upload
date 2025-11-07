import React from "react";

export default function SidebarAdvi() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="circle">A</div>
        <h3>Admin Advisor</h3>
        <span className="role">role : Admin • Advisor</span>
      </div>

      <ul className="menu">
        <li>Verified Portfolios</li>
        <li>Log Out</li>
      </ul>
    </aside>
  );
}
