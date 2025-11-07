// src/components/SuperAdmin/VerifyAcc.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarSuper from "../SuperAdmin/SidebarSuper";

export default function VerifyAcc() {
  const navigate = useNavigate();

  // ตัวอย่างข้อมูล: สถานะที่ Super ได้รับมาจาก Advisor คือ "In Process"
  const [accounts] = useState([
    { id: 1, name: "Rainbow Pinky", role: "Student",  status: "In Process" },
    { id: 2, name: "Harry Potter",  role: "Recruiter",status: "Pending" },
    { id: 3, name: "Hermione G.",   role: "Student",  status: "In Process" },
    { id: 4, name: "Ron Weasley",   role: "Advisor",  status: "Pending" },
  ]);

  const handleStartReview = (id) => {
    // ไปหน้ารีวิวแบบละเอียด
    navigate(`/super/user-approval/${id}`);
  };

  return (
    <div className="flex role-super">
      <SidebarSuper />
      <div className="main-container">
        <h2 className="page-title">Verify Accounts</h2>
        <p className="page-subtitle">
          Accounts forwarded by Advisors. Start your review for each "In Process" item.
        </p>

        <table className="verify-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, index) => (
              <tr key={acc.id}>
                <td>{index + 1}</td>
                <td>{acc.name}</td>
                <td>{acc.role}</td>
                <td>
                  <span
                    className={`status-badge ${
                      acc.status === "In Process"
                        ? "approved"   // ใช้สีเขียวเดิมแทน class ใหม่
                        : acc.status === "Pending"
                        ? "pending"
                        : "rejected"
                    }`}
                  >
                    {acc.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-approve"
                    disabled={acc.status !== "In Process"}
                    onClick={() => handleStartReview(acc.id)}
                  >
                    Start Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
