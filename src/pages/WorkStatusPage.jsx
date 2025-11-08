// src/pages/WorkStatusPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import NormalCard from "../components/NormalCard";
import "./StatusPage.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
const USE_BACKEND =
  String(process.env.REACT_APP_USE_BACKEND || "false").toLowerCase() === "true";

function WorkStatusPage({ showControls }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);      // ✅ ไม่มี mock แล้ว
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // TODO: ดึงข้อมูล profile จริงจากระบบ auth ของคุณ
  const [profileData] = useState({
    name: "Rainbow Pinky",
    university: "KMUTT",
    contact: "rainbowpink@kmutt.ac.th",
  });

  // ========= Load portfolios ของผู้ใช้ =========
  useEffect(() => {
    let alive = true;

    async function fetchMine() {
      setLoading(true);
      setError("");
      try {
        if (!USE_BACKEND) {
          // ยังไม่เชื่อม backend: โชว์ว่าง ๆ ไปก่อน
          if (!alive) return;
          setProjects([]);
          setLoading(false);
          return;
        }

        // ปรับ endpoint ให้ตรงกับ backend ของคุณ:
        // แนะนำ: GET /api/portfolio/mine  (คืนงานทั้งหมดของเจ้าของ)
        const res = await fetch(`${API_BASE}/api/portfolio/mine`, {
          headers: {
            // ถ้ามี token:
            // Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Fetch failed (HTTP ${res.status}). ${text.slice(0,200)}`);
        }

        const data = await res.json();
        // คาดหวังรูปแบบ: { items: [...] } หรือเป็น array ก็ได้
        const items = Array.isArray(data) ? data : (data.items || []);
        if (!alive) return;

        // map ให้ชื่อตรงกับ props ของ NormalCard ถ้าฟิลด์ backend ต่างชื่อ
        const normalized = items.map((it) => ({
          id:        it._id || it.id,
          title:     it.title,
          description: it.desc || it.description,
          name:      it.owner?.displayName || it.ownerName || "",
          university:it.university || it.owner?.university || "",
          year:      it.yearOfProject || it.year || "",
          category:  it.category || "",
          image:     (it.images && it.images[0]) || it.coverUrl || "",
          status:    it.statusV2 || it.status || "",
          isPublic:  it.visibility === "public",
          tags:      it.tags || [],
        }));

        setProjects(normalized);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Load portfolios error");
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchMine();
    return () => { alive = false; };
  }, []);

  // ตอนกด Edit ให้เห็นเฉพาะ Draft/Failed
  const filteredProjects = useMemo(() => {
    return isEditing
      ? projects.filter((p) => p.status === "Draft" || p.status === "Failed")
      : projects;
  }, [isEditing, projects]);

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
            onClickSave={() => setIsEditing(false)}
            showControls={showControls}
          />
        </div>

        {/* แจ้งสถานะโหลด / error / ว่าง */}
        {loading && <div style={{ margin: "16px 0" }}>Loading…</div>}
        {error && (
          <div style={{ margin: "16px 0", color: "crimson" }}>
            {error}
          </div>
        )}
        {!loading && !error && filteredProjects.length === 0 && (
          <div style={{ margin: "16px 0", color: "#666" }}>
            ไม่มีผลงานให้แสดง
            {USE_BACKEND
              ? " (ยังไม่มีผลงานในระบบของคุณ)"
              : " (โหมดยังไม่เชื่อม backend)"}
          </div>
        )}

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
              onVisibilityChange={async (id, checked) => {
                // อัปเดต UI ทันที
                setProjects((prev) =>
                  prev.map((x) => (x.id === id ? { ...x, isPublic: checked } : x))
                );

                // ยิง backend ถ้ามี
                if (USE_BACKEND) {
                  try {
                    await fetch(`${API_BASE}/api/portfolio/${id}/visibility`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ visibility: checked ? "public" : "private" }),
                    });
                  } catch (e) {
                    // roll back ถ้าล้มเหลว
                    setProjects((prev) =>
                      prev.map((x) => (x.id === id ? { ...x, isPublic: !checked } : x))
                    );
                    alert(e.message || "Update visibility failed");
                  }
                }
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
