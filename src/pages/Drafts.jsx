import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";

import { getRole } from "../auth/auth";

export default function Drafts() {

  const role = getRole();

  const [posts, setPosts] = useState([]);

  // AUTHOR ONLY
  if (role !== "AUTHOR") {

    return (
      <>
        <Navbar />

        <div style={styles.deniedPage}>

          <div style={styles.deniedCard}>

            <h1 style={styles.deniedTitle}>
              Access Denied
            </h1>

            <p style={styles.deniedText}>
              Only authors can access drafts.
            </p>

          </div>
        </div>
      </>
    );
  }

  // FETCH POSTS
  const fetchPosts = async () => {

    try {

      const res = await API.get("/posts/author");

      setPosts(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // PUBLISH
  const publishPost = async (id) => {

    try {

      await API.put(`/posts/${id}/publish`);

      fetchPosts();

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

      <div style={styles.page}>

        {/* HERO */}
        <div style={styles.hero}>

          <div>

            <div style={styles.badge}>
              ✍️ Author Dashboard
            </div>

            <h1 style={styles.heading}>
              My Posts
            </h1>

            <p style={styles.subheading}>
              Manage your drafts, publish stories,
              and track featured content.
            </p>

          </div>

          <div style={styles.statsCard}>

            <div style={styles.statBox}>

              <h2 style={styles.statNumber}>
                {posts.length}
              </h2>

              <p style={styles.statLabel}>
                Total Posts
              </p>

            </div>

            <div style={styles.statDivider} />

            <div style={styles.statBox}>

              <h2 style={styles.statNumber}>
                {
                  posts.filter(
                    (p) =>
                      p.status === "PUBLISHED"
                  ).length
                }
              </h2>

              <p style={styles.statLabel}>
                Published
              </p>

            </div>

          </div>
        </div>

        {/* POSTS */}
        <div style={styles.grid}>

          {posts.map((p) => (

            <div
              key={p.id}
              style={styles.card}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";

                e.currentTarget.style.boxShadow =
                  "0 20px 45px rgba(0,0,0,0.35)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";

                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.25)";
              }}
            >

              {/* IMAGE */}
              <div style={styles.imageWrapper}>

                {p.imageUrl ? (

                  <img
                    src={`http://localhost:8082${p.imageUrl}`}
                    alt="post"
                    style={styles.image}
                  />

                ) : (

                  <div style={styles.placeholder}>
                    📝
                  </div>
                )}

                <div style={styles.overlay} />

              </div>

              {/* CONTENT */}
              <div style={styles.content}>

                {/* TITLE */}
                <h2 style={styles.title}>
                  {p.title}
                </h2>

                {/* BADGES */}
                <div style={styles.badges}>

                  {p.status === "DRAFT" && (
                    <span style={styles.draft}>
                      Draft
                    </span>
                  )}

                  {p.status === "PUBLISHED" && (
                    <span style={styles.published}>
                      Published
                    </span>
                  )}

                  {p.featured && (
                    <span style={styles.featured}>
                      ⭐ Featured
                    </span>
                  )}

                </div>

                {/* PREVIEW */}
                <p style={styles.preview}>
                  {p.content.length > 120
                    ? p.content.substring(0, 120) + "..."
                    : p.content}
                </p>

                {/* ACTION */}
                {p.status === "DRAFT" && (

                  <button
                    style={styles.publishBtn}
                    onClick={() =>
                      publishPost(p.id)
                    }
                  >
                    Publish Post
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(to bottom, #020617, #0f172a)",
    padding: "40px",
    color: "white",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "50px",
  },

  badge: {
    display: "inline-block",
    background: "#1d4ed8",
    padding: "8px 18px",
    borderRadius: "999px",
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },

  heading: {
    fontSize: "58px",
    marginBottom: "15px",
    letterSpacing: "-2px",
  },

  subheading: {
    color: "#94a3b8",
    fontSize: "18px",
    maxWidth: "550px",
    lineHeight: "1.8",
  },

  statsCard: {
    background: "#111827",
    borderRadius: "24px",
    padding: "30px 40px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  statBox: {
    textAlign: "center",
  },

  statNumber: {
    fontSize: "42px",
    color: "#38bdf8",
    marginBottom: "10px",
  },

  statLabel: {
    color: "#94a3b8",
  },

  statDivider: {
    width: "1px",
    height: "70px",
    background:
      "rgba(255,255,255,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(360px, 1fr))",
    gap: "32px",
  },

  card: {
    background: "#111827",
    borderRadius: "26px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  imageWrapper: {
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block",
  },

  placeholder: {
    width: "100%",
    height: "250px",
    background:
      "linear-gradient(135deg, #1e293b, #334155)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "70px",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
  },

  content: {
    padding: "28px",
  },

  title: {
    fontSize: "34px",
    marginBottom: "18px",
    lineHeight: "1.2",
  },

  badges: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  draft: {
    background: "#facc15",
    color: "#000",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  published: {
    background: "#22c55e",
    color: "white",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  featured: {
    background: "#38bdf8",
    color: "#000",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  preview: {
    color: "#cbd5e1",
    lineHeight: "1.9",
    marginBottom: "28px",
    fontSize: "15px",
  },

  publishBtn: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(to right, #22c55e, #16a34a)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow:
      "0 10px 20px rgba(34,197,94,0.25)",
  },

  deniedPage: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  deniedCard: {
    background: "#111827",
    padding: "50px",
    borderRadius: "24px",
    textAlign: "center",
  },

  deniedTitle: {
    color: "white",
    fontSize: "42px",
    marginBottom: "15px",
  },

  deniedText: {
    color: "#94a3b8",
    fontSize: "18px",
  },
};