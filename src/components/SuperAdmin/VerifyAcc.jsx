import React, { useState } from "react";
import SidebarSuper from "../SuperAdmin/SidebarSuper";

export default function VerifyAcc() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Rainbow Pinky", role: "Student", status: "Pending" },
    { id: 2, name: "Harry Potter", role: "Recruiter", status: "Pending" },
    { id: 3, name: "Hermione G.", role: "Student", status: "Pending" },
    { id: 4, name: "Ron Weasley", role: "Advisor", status: "Pending" },
  ]);

  const updateStatus = (id, newStatus) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, status: newStatus } : acc
      )
    );
  };

  return (
    <div className="flex role-super">
      <SidebarSuper />
      <div className="main-container">
        <h2 className="page-title">Verify Accounts</h2>
        <p className="page-subtitle">
          Review pending user accounts and approve or reject them.
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
                      acc.status === "Approved"
                        ? "approved"
                        : acc.status === "Rejected"
                        ? "rejected"
                        : "pending"
                    }`}
                  >
                    {acc.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-approve"
                    onClick={() => updateStatus(acc.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => updateStatus(acc.id, "Rejected")}
                  >
                    Reject
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
