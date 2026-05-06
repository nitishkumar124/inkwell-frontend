import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Feed() {

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {

      const res = await API.get("/posts");

      // 🔥 featured posts first
      const sorted = [...res.data.data].sort(
        (a, b) => b.featured - a.featured
      );

      setPosts(sorted);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Explore Posts
        </h1>

        <div style={styles.grid}>

          {posts.map((p) => (

            <div
              key={p.id}
              style={styles.card}
              onClick={() => navigate(`/posts/${p.id}`)}
            >

              {/* FEATURED */}
              {p.featured && (
                <div style={styles.featured}>
                  ⭐ Featured
                </div>
              )}

              {/* IMAGE */}
              {p.imageUrl && (
                <img
                  src={`http://localhost:8082${p.imageUrl}`}
                  alt="post"
                  style={styles.image}
                />
              )}

              {/* TITLE */}
              <h2 style={styles.title}>
                {p.title}
              </h2>

              {/* PREVIEW */}
              <p style={styles.preview}>
                {p.content.length > 120
                  ? p.content.substring(0, 120) + "..."
                  : p.content}
              </p>

              {/* META */}
              <div style={styles.meta}>
                <span>👁 {p.viewCount || 0}</span>
                <span>❤️ {p.likeCount || 0}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {

  container: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: "30px",
    color: "white",
  },

  heading: {
    marginBottom: "30px",
    fontSize: "32px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#1e293b",
    borderRadius: "14px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  title: {
    padding: "15px 15px 0px 15px",
    fontSize: "22px",
  },

  preview: {
    padding: "10px 15px",
    color: "#cbd5e1",
    lineHeight: "1.5",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    color: "#94a3b8",
    borderTop: "1px solid #334155",
  },

  featured: {
    position: "absolute",
    margin: "12px",
    background: "#facc15",
    color: "#000",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },
};