// src/components/AdminAdvisor/VerifyPortfolioAdvisor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdvi from "../AdminAdvisor/SidebarAdvi";

export default function VerifyPortfolioAdvisor() {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([
    { id: 1, title: "AI-Based Image Classifier", student: "Rainbow Pinky", status: "Pending" },
    { id: 2, title: "IoT Health Tracker", student: "Harry Potter", status: "Pending" },
  ]);

  const handleStartReview = (id) => {
    // เปลี่ยนสถานะในตาราง (แสดงว่าเริ่มรีวิวแล้ว)
    setPortfolios(prev =>
      prev.map(p => (p.id === id ? { ...p, status: "In Progress" } : p))
    );

    // นำทางไปยังหน้ารีวิว (เช่น /admin/review/1)
    navigate(`/advisor/review/${id}`);
  };

  return (
    <div className="flex role-advisor">
      <SidebarAdvi />
      <div className="main-container">
        <h2 className="page-title">Verify Portfolios (Advisor Stage)</h2>
        <p className="page-subtitle">Start reviewing, then forward to Super Admin.</p>

        <table className="verify-table">
          <thead>
            <tr>
              <th>#</th><th>Title</th><th>Student</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.title}</td>
                <td>{p.student}</td>
                <td>
                  <span className={`status-badge ${p.status.toLowerCase().replace(" ", "")}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-approve"
                    disabled={p.status !== "Pending"}
                    onClick={() => handleStartReview(p.id)}
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