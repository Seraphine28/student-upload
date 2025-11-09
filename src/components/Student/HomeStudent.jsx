// src/components/Student/HomeStudent.jsx
import React, { useEffect, useMemo, useState } from "react";
import SidebarStu from "./SidebarStu";
import ProjectCard from "../ProjectCard";

// ✅ base URL ปล่อยว่างเพราะใช้ proxy จาก CRA
const BASE = "";
// ✅ backend route คือ /api/portfolio/public
const API_PREFIX = "/api/portfolio";
fetch(`${API_PREFIX}/public`);

export default function HomeStudent() {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");

  // 🔹 ดึงข้อมูลพอร์ตที่ public
  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${BASE}${API_PREFIX}/public`);
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Fetch failed (${res.status}). ${text.slice(0, 160)}`);
        }

        const data = await res.json();
        if (!alive) return;

        const list = Array.isArray(data) ? data : (data.items || []);
        const mapped = list.map((it) => {
          const imgPath = (it.files || []).find((p) => /\.(png|jpe?g|gif)$/i.test(p));
          return {
            id: it._id || it.id,
            title: it.title || "",
            name: it.owner?.displayName || "",
            university: it.owner?.university || it.university || "",
            year: it.yearOfProject ?? it.year ?? "",
            category: it.category || "",
            description: it.desc || it.description || "",
            image: imgPath ? `/${imgPath}` : "",
          };
        });

        setRaw(mapped);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Failed to load portfolios");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // 🔹 filter ฝั่งหน้าเว็บ
  const items = useMemo(() => {
    return raw.filter((x) => {
      const passQ = !q || (`${x.title} ${x.description} ${x.category}`).toLowerCase().includes(q.toLowerCase());
      const passYear = !year || String(x.year) === String(year);
      const passCat = !category || x.category === category;
      return passQ && passYear && passCat;
    });
  }, [raw, q, year, category]);

  return (
    <div className="flex role-student">
      <SidebarStu />

      <main className="main-content" style={{ marginLeft: 270, padding: 20, width: "100%" }}>
        {/* 🔸 Search + Filters */}
        <div className="top-bar" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <input
            className="search"
            placeholder="Search title / description / category"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ flex: 1 }}
          />
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All years</option>
            {["2020", "2021", "2022", "2023", "2024", "2025"].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {[
              "AI",
              "ML",
              "BI",
              "QA",
              "UX/UI",
              "Database",
              "Software Engineering",
              "IOT",
              "Gaming",
              "Web Development",
              "Coding",
              "Data Science",
              "Hackathon",
              "Bigdata",
              "Data Analytics",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* 🔸 Loading / Error / Empty */}
        {loading && <div>Loading…</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}
        {!loading && !error && items.length === 0 && <div>No public portfolios yet</div>}

        {/* 🔸 แสดงการ์ดผลงาน */}
        <div className="grid">
          {items.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </main>
    </div>
  );
}
