import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarSuper from "../SuperAdmin/SidebarSuper";

export default function VerifyAcc() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([
    { id: 1, name: "Rainbow Pinky", role: "Student", status: "In Process" },
    { id: 2, name: "Harry Potter", role: "Recruiter", status: "Pending" },
  ]);

  const handleStartReview = (id) => {
    navigate(`/super/user-approval/${id}`);
  };

  return (
    <div className="flex role-super">
      <SidebarSuper />
      <div className="main-container">
        <h2 className="page-title">Verify Accounts</h2>
        <p className="page-subtitle">
          Review pending user accounts and start the review process.
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
                      acc.status.toLowerCase().replace(" ", "")
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
