import React from "react";
import "./ProjectCard.css";

export default function ProjectCard({  title, name, university, year, description, image, category }) {
 
  return (
    <div className="card">
      <img src={image || 'https://via.placeholder.com/150'} alt={title} className="card-img" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>Name: {name}</p>
        <p>University: {university}</p>
        <p>Year: {year}</p>
        <p>Category: {category}</p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
}
