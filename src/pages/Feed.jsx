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

      // featured posts first
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
              onClick={() =>
                navigate(`/posts/${p.id}`)
              }

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";

                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(0,0,0,0.4)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";

                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.25)";
              }}
            >

              {/* IMAGE */}
              <div style={styles.imageWrapper}>

                {p.featured && (
                  <div style={styles.featured}>
                    ⭐ Featured
                  </div>
                )}

                {p.imageUrl && (
                  <>
                    <img
                      src={`http://localhost:8082${p.imageUrl}`}
                      alt="post"
                      style={styles.image}
                    />

                    <div style={styles.imageOverlay} />
                  </>
                )}
              </div>

              {/* CONTENT */}
              <div style={styles.content}>

                <h2 style={styles.title}>
                  {p.title}
                </h2>

                <p style={styles.preview}>
                  {p.content.length > 120
                    ? p.content.substring(0, 120) + "..."
                    : p.content}
                </p>

                {/* META */}
                <div style={styles.meta}>

                  <div style={styles.stat}>
                    👁 {p.viewCount || 0}
                  </div>

                  <div style={styles.stat}>
                    ❤️ {p.likeCount || 0}
                  </div>

                </div>
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
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(to bottom, #020617, #0f172a)",
    color: "white",
  },

  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "40px",
    letterSpacing: "-1px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "30px",
  },

  card: {
    background: "#1e293b",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.25)",
    position: "relative",
    border:
      "1px solid rgba(255,255,255,0.04)",
  },

  imageWrapper: {
    overflow: "hidden",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    transition: "transform 0.4s ease",
    display: "block",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
  },

  featured: {
    position: "absolute",
    top: "14px",
    left: "14px",
    background: "#facc15",
    color: "#000",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    zIndex: 2,
    boxShadow:
      "0 4px 12px rgba(250,204,21,0.4)",
  },

  content: {
    padding: "22px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "12px",
    lineHeight: "1.2",
  },

  preview: {
    color: "#cbd5e1",
    lineHeight: "1.7",
    fontSize: "15px",
    marginBottom: "24px",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop:
      "1px solid rgba(255,255,255,0.06)",
    paddingTop: "18px",
  },

  stat: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#94a3b8",
    fontSize: "14px",
    background: "#0f172a",
    padding: "8px 12px",
    borderRadius: "999px",
  },
};