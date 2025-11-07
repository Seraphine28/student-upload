// src/pages/CommentPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CommentPage.css";

/* -------- Mock data (แทน API ชั่วคราว) -------- */
const MOCK_COMMENTS = [
  { id: 1, author: "Lovely Boy", role: "recruiter", text: "so good", initial: "L" },
  { id: 2, author: "Sunny Kissed", role: "student",  text: "OMG",     initial: "S" },
  { id: 3, author: "Professor P", role: "lecturer", text: "Excellent potential.", initial: "P" },
];

const MOCK_PROJECT = {
  title: "Project Alpha",
  name: "Rainbow Pinky",
  university: "KMUTT",
  description: "AI research paper on neural networks.",
  images: [
    "https://via.placeholder.com/900x520?text=Image+1",
    "https://via.placeholder.com/900x520?text=Image+2",
    "https://via.placeholder.com/900x520?text=Image+3",
    "https://via.placeholder.com/900x520?text=Image+4",
  ],
};

/* --------- Small component --------- */
function CommentBlock({ author, role, text, initial }) {
  return (
    <div className="comment-block">
      <div className="comment-header">
        <div className="author-initial">{initial}</div>
        <div className="author-info">
          <span className="author-name">{author}</span>
          <span className="author-role">&lt;{role}&gt;</span>
        </div>
      </div>
      <p className="comment-text">“{text}”</p>
    </div>
  );
}

/* ================== Page ================== */
export default function CommentPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [project, setProject]   = useState(null);
  const [comments, setComments] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);

  // --- form state ---
  const CHAR_LIMIT = 300;
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  // simulate fetch
  useEffect(() => {
    const t = setTimeout(() => {
      setProject(MOCK_PROJECT);
      setComments(MOCK_COMMENTS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [projectId]);

  const next = () =>
    setImgIndex((i) => Math.min(i + 1, (project?.images.length || 1) - 1));
  const prev = () => setImgIndex((i) => Math.max(i - 1, 0));
  const jump = (i) => setImgIndex(i);

  const submitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || posting) return;

    setPosting(true);
    setTimeout(() => {
      setComments((cs) => [
        ...cs,
        {
          id: Date.now(),
          author: "Current User",
          role: "student",
          text: newComment.trim(),
          initial: "C",
        },
      ]);
      setNewComment("");
      setPosting(false);
    }, 300);
  };

  if (loading) return <div className="loading-page">Loading…</div>;
  if (!project) return <div className="error-page">Project not found.</div>;

  const total = project.images.length;

  return (
    <div className="comment-page-container">
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

      <div className="comment-page-grid">
        {/* LEFT: image viewer + details */}
        <section className="project-display-section">
          <div className="image-viewer">
            <img
              src={project.images[imgIndex]}
              alt={`Project Image ${imgIndex + 1}`}
              className="project-main-image"
            />

            {imgIndex > 0 && (
              <button type="button" className="nav-button prev-button" onClick={prev}>
                ‹
              </button>
            )}
            {imgIndex < total - 1 && (
              <button type="button" className="nav-button next-button" onClick={next}>
                ›
              </button>
            )}

            <div className="image-pagination">
              {project.images.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === imgIndex ? "active" : ""}`}
                  onClick={() => jump(i)}
                />
              ))}
            </div>
          </div>

          <div className="project-details">
            <p><strong>Title:</strong> {project.title}</p>
            <p><strong>Name:</strong> {project.name}</p>
            <p><strong>University:</strong> {project.university}</p>
            <p><strong>Year:</strong> {project.year}</p>
            <p><strong>Category:</strong> {project.category}</p>
            <p><strong>Description:</strong> {project.description}</p>
          </div>
        </section>

        {/* RIGHT: comments list + form */}
        <aside className="comments-section">
          {comments.map((c) => (
            <CommentBlock key={c.id} {...c} />
          ))}

          <form className="comment-form" onSubmit={submitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value.slice(0, CHAR_LIMIT))}
              placeholder="Add your comment here..."
              rows="3"
              disabled={posting}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <small style={{ color: "#666" }}>
                {newComment.length}/{CHAR_LIMIT}
              </small>
              <button type="submit" disabled={!newComment.trim() || posting}>
                {posting ? "Posting…" : "Post Comment"}
              </button>
            </div>
          </form>

          <div className="comments-placeholder"></div>
        </aside>
      </div>
    </div>
  );
}
