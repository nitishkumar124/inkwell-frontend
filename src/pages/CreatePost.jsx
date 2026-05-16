import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

import Navbar from "../components/Navbar";

import { getRole } from "../auth/auth";

export default function CreatePost() {

  const role = getRole();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

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
              Only authors can create posts.
            </p>

          </div>
        </div>
      </>
    );
  }

  const createPost = async () => {

    if (!title || !content) {

      alert("Title and content required");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);

      formData.append("content", content);

      if (image) {

        formData.append("image", image);
      }

      await API.post("/posts", formData, {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      });

      alert("Draft created");

      navigate("/drafts");

    } catch (err) {

      console.error(err);

      alert("Failed to create post");

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        <div style={styles.wrapper}>

          {/* LEFT PANEL */}
          <div style={styles.left}>

            <div style={styles.leftContent}>

              <div style={styles.badge}>
                ✍️ Author Workspace
              </div>

              <h1 style={styles.heroTitle}>
                Create Your Next Story
              </h1>

              <p style={styles.heroText}>
                Share ideas, publish thoughts,
                and inspire your readers with
                beautifully crafted content.
              </p>

              <div style={styles.infoBox}>
                Drafts are automatically saved
                as unpublished posts until you
                publish them.
              </div>

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={styles.right}>

            <div style={styles.card}>

              <h1 style={styles.heading}>
                Create New Post
              </h1>

              <p style={styles.subheading}>
                Start writing your next article
              </p>

              {/* TITLE */}
              <input
                type="text"
                placeholder="Enter post title..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                style={styles.input}
              />

              {/* CONTENT */}
              <textarea
                placeholder="Write your story here..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                style={styles.textarea}
              />

              {/* IMAGE */}
              <div style={styles.uploadBox}>

                <label style={styles.uploadLabel}>
                  📷 Upload Cover Image
                </label>

                <input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files[0])
                  }
                  style={styles.file}
                />

                {image && (
                  <p style={styles.fileName}>
                    {image.name}
                  </p>
                )}

              </div>

              {/* BUTTON */}
              <button
                onClick={createPost}
                style={styles.button}
              >
                {loading
                  ? "Creating Draft..."
                  : "Save Draft"}
              </button>

            </div>
          </div>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    width: "100%",
    maxWidth: "1400px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "stretch",
  },

  left: {
    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",
    borderRadius: "28px",
    padding: "60px",
    display: "flex",
    alignItems: "center",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.35)",
  },

  leftContent: {
    maxWidth: "500px",
  },

  badge: {
    display: "inline-block",
    padding: "10px 18px",
    background: "#1e40af",
    color: "white",
    borderRadius: "999px",
    marginBottom: "30px",
    fontSize: "14px",
    fontWeight: "bold",
  },

  heroTitle: {
    color: "white",
    fontSize: "64px",
    lineHeight: "1.05",
    marginBottom: "30px",
    letterSpacing: "-2px",
  },

  heroText: {
    color: "#cbd5e1",
    fontSize: "20px",
    lineHeight: "1.9",
    marginBottom: "40px",
  },

  infoBox: {
    background: "rgba(255,255,255,0.05)",
    color: "#94a3b8",
    padding: "20px",
    borderRadius: "18px",
    lineHeight: "1.8",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    background: "#111827",
    padding: "45px",
    borderRadius: "28px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.35)",
  },

  heading: {
    color: "white",
    fontSize: "48px",
    marginBottom: "10px",
    letterSpacing: "-1px",
  },

  subheading: {
    color: "#94a3b8",
    marginBottom: "35px",
    fontSize: "16px",
  },

  input: {
    width: "100%",
    padding: "18px",
    marginBottom: "24px",
    borderRadius: "16px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background: "#0f172a",
    color: "white",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "320px",
    padding: "20px",
    borderRadius: "18px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background: "#0f172a",
    color: "white",
    fontSize: "16px",
    outline: "none",
    resize: "vertical",
    marginBottom: "25px",
    lineHeight: "1.8",
    boxSizing: "border-box",
  },

  uploadBox: {
    background: "#0f172a",
    padding: "22px",
    borderRadius: "18px",
    marginBottom: "30px",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  uploadLabel: {
    display: "block",
    color: "white",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  file: {
    color: "#94a3b8",
  },

  fileName: {
    color: "#38bdf8",
    marginTop: "12px",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(to right, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.3)",
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