import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import NormalCard from "../components/NormalCard";
import "./StatusPage.css";

function WorkStatusPage({ showControls }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // ✅ ทำเป็น state เพื่อจะได้ setProjects ได้
  const [projects, setProjects] = useState([
    {
      id: "proj_a_001",
      title: "Project A",
      description: "AI system for KMUTT.",
      tags: ["AI", "2023"],
      status: "Pending",
      name: "Rainbow Pinky",
      university: "KMUTT",
      year: "2023",
      category: "AI",
      image: "",
      isPublic: false,
    },
    {
      id: "proj_b_002",
      title: "Project B",
      description: "Web dashboard for health data.",
      tags: ["React", "2024"],
      status: "Approved",
      name: "Rainbow Pinky",
      university: "KMUTT",
      year: "2024",
      category: "Web",
      image: "",
      isPublic: true,
    },
    {
      id: "proj_c_003",
      title: "Project C",
      description: "Hospital record system.",
      tags: ["Database", "Node.js"],
      status: "Failed",
      name: "Rainbow Pinky",
      university: "KMUTT",
      year: "2022",
      category: "DB",
      image: "",
      isPublic: false,
    },
    {
      id: "proj_d_004",
      title: "Project D",
      description: "Monitoring system for IoT devices.",
      tags: ["IoT", "Cloud"],
      status: "Draft",
      name: "Rainbow Pinky",
      university: "KMUTT",
      year: "2025",
      category: "IoT",
      image: "",
      isPublic: false,
    },
    {
      id: "proj_e_005",
      title: "Project E",
      description: "Project Management Tool.",
      tags: ["Angular", "Web"],
      status: "In Process",
      name: "Rainbow Pinky",
      university: "KMUTT",
      year: "2024",
      category: "Web",
      image: "",
      isPublic: false,
    },
    {
      id: "proj_f_006",
      title: "Project F",
      description: "Financial tracking app.",
      tags: ["Node", "Web"],
      status: "Pending",
      name: "Rainbow Pinky",
      university: "KMUTT",
      year: "2023",
      category: "FinTech",
      image: "",
      isPublic: false,
    },
  ]);

  const [profileData] = useState({
    name: "Rainbow Pinky",
    university: "KMUTT",
    contact: "rainbowpink@kmutt.ac.th",
  });

  const handleInlineSaveAndClose = () => {
    // TODO: save จริง
    setIsEditing(false);
  };

  // ตอนกด Edit ให้เห็นเฉพาะ Draft/Failed
  const filteredProjects = isEditing
    ? projects.filter((p) => p.status === "Draft" || p.status === "Failed")
    : projects;

  return (
    <>
      {/* ปุ่ม Home มุมขวาบน */}
      <button
        type="button"
        onClick={() => navigate("/student/home")}
        aria-label="Home"
        style={{
          position: "fixed",
          top: 12,
          right: 16,
          background: "transparent",
          border: "none",
          fontSize: 40,
          cursor: "pointer",
          lineHeight: 1,
          zIndex: 1000,
        }}
      >
        🏠
      </button>

      <div className="profile-container">
        {/* Header */}
        <div className="profile-header-wrapper">
          <ProfileHeader
            name={profileData.name}
            university={profileData.university}
            contact={profileData.contact}
            showEdit={isEditing}
            onClickEdit={() => setIsEditing(true)}
            onClickSave={handleInlineSaveAndClose}
            showControls={showControls}
          />
        </div>

        {/* กริดการ์ดสถานะงาน */}
        <main className="status-projects-grid">
          {filteredProjects.map((p) => (
            <NormalCard
              key={p.id}
              id={p.id}
              title={p.title}
              name={p.name}
              university={p.university}
              year={p.year}
              category={p.category}
              description={p.description}
              image={p.image}
              status={p.status}
              isPublic={p.isPublic}
              onVisibilityChange={(id, checked) => {
                setProjects((prev) =>
                  prev.map((x) =>
                    x.id === id ? { ...x, isPublic: checked } : x
                  )
                );
                // ถ้ามี backend:
                // fetch(`${API_BASE}/api/portfolio/${id}/visibility`, {
                //   method: 'PUT',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ isPublic: checked }),
                // });
              }}
              // ปุ่มแก้/ส่งใหม่ เฉพาะ Draft/Failed และเมื่อกด Edit แล้ว
              editMode={(p.status === "Draft" || p.status === "Failed") && isEditing}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default WorkStatusPage;
