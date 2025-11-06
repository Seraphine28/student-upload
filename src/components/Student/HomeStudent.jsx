// src/components/Student/HomeStudent.jsx
import React, { useState, useMemo } from "react";
import SidebarStu from "../Student/SidebarStu";
import SearchBar from "../shared/SearchBar";
import Filters from "../shared/Filters";
import ProjectCard from "../ProjectCard"; // ✅ ใช้การ์ดใหม่

export default function HomeStudent() {
  const [search, setSearch] = useState("");
  const [yearsFilter, setYearsFilter] = useState([]);       // from Filters
  const [categoriesFilter, setCategoriesFilter] = useState([]); // from Filters

  const projects = [
    {
      id: 1,
      title: "AI-based Image Classifier",
      name: "Rainbow Pinky",
      university: "KMUTT",
      description: "Short summary of the project. What it does, tech stack, and outcome.",
      year: "2023",
      category: "AI",
      status: "Approved",
      image: "",
    },
    {
      id: 2,
      title: "AI Innovation",
      name: "Harry Potter",
      university: "CU",
      description: "ETL pipeline with Kafka, Spark, Hive. Dashboard with KPIs and alerts.",
      year: "2020",
      category: "AI",
      status: "Draft",
      image: "/test.jpg",
    },
    {
      id: 3,
      title: "Portfolio Platform",
      name: "Rainbow Pinky",
      university: "KMUTT",
      description: "Student portfolio sharing platform with roles & search filters.",
      year: "2024",
      category: "Web",
      status: "Failed",
      image: "",
    },
  ];

  // คำนวณผลลัพธ์ที่ต้องแสดงจาก search + filters
  const visibleProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase());

      const matchYear =
        yearsFilter.length ? yearsFilter.includes(String(p.year)) : true;

      const matchCategory =
        categoriesFilter.length ? categoriesFilter.includes(p.category) : true;

      return matchSearch && matchYear && matchCategory;
    });
  }, [projects, search, yearsFilter, categoriesFilter]);

  return (
    <div className="flex role-student">
      <SidebarStu />
      <main className="main-container">{/* ✅ ให้ตรงกับ CSS เดิมของเธอ */}
        <div className="top-bar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="username / title"
          />
          <Filters
            onFilter={(years, categories) => {
              setYearsFilter(years || []);
              setCategoriesFilter(categories || []);
            }}
          />
        </div>

        <div className="grid">
          {visibleProjects.map((p) => (
            <ProjectCard
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
              tags={[p.year, p.category, p.university]}
              editMode={false} // หน้า Home ไม่ต้องแก้/ลบ
            />
          ))}
        </div>
      </main>
    </div>
  );
}
