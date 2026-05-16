import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";

import { getRole } from "../auth/auth";

export default function Moderation() {

  const role = getRole();

  const [comments, setComments] = useState([]);

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
              Only authors can moderate comments.
            </p>

          </div>
        </div>
      </>
    );
  }

  // FETCH COMMENTS
  const fetchComments = async () => {

    try {

      const res = await API.get("/comments/pending");

      setComments(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // APPROVE
  const approveComment = async (id) => {

    try {

      await API.put(`/comments/${id}/approve`);

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  // REJECT
  const rejectComment = async (id) => {

    try {

      await API.put(`/comments/${id}/reject`);

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchComments();

  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        {/* HERO */}
        <div style={styles.hero}>

          <div>

            <div style={styles.badge}>
              🛡️ Author Moderation Panel
            </div>

            <h1 style={styles.heading}>
              Comment Moderation
            </h1>

            <p style={styles.subheading}>
              Review and manage pending comments
              before they appear publicly on your
              posts.
            </p>

          </div>

          <div style={styles.statsCard}>

            <h2 style={styles.statsNumber}>
              {comments.length}
            </h2>

            <p style={styles.statsLabel}>
              Pending Comments
            </p>

          </div>
        </div>

        {/* EMPTY */}
        {comments.length === 0 && (

          <div style={styles.emptyCard}>

            <div style={styles.emptyIcon}>
              ✅
            </div>

            <h2 style={styles.emptyTitle}>
              All Caught Up
            </h2>

            <p style={styles.emptyText}>
              There are no pending comments for
              moderation right now.
            </p>

          </div>
        )}

        {/* COMMENTS */}
        <div style={styles.grid}>

          {comments.map((c) => (

            <div
              key={c.id}
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

              {/* TOP */}
              <div style={styles.top}>

                <div>

                  <div style={styles.postLabel}>
                    Post #{c.postId}
                  </div>

                  <div style={styles.pending}>
                    ⏳ Pending Approval
                  </div>

                </div>

                <div style={styles.avatar}>
                  💬
                </div>

              </div>

              {/* COMMENT */}
              <div style={styles.commentBox}>

                <p style={styles.content}>
                  “{c.content}”
                </p>

              </div>

              {/* ACTIONS */}
              <div style={styles.actions}>

                <button
                  style={styles.approve}
                  onClick={() =>
                    approveComment(c.id)
                  }
                >
                  ✔ Approve
                </button>

                <button
                  style={styles.reject}
                  onClick={() =>
                    rejectComment(c.id)
                  }
                >
                  ✖ Reject
                </button>

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
    background: "#7c3aed",
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
    maxWidth: "650px",
    lineHeight: "1.8",
  },

  statsCard: {
    background: "#111827",
    borderRadius: "24px",
    padding: "35px 45px",
    textAlign: "center",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  statsNumber: {
    fontSize: "56px",
    color: "#facc15",
    marginBottom: "10px",
  },

  statsLabel: {
    color: "#94a3b8",
    fontSize: "16px",
  },

  emptyCard: {
    background: "#111827",
    borderRadius: "28px",
    padding: "70px 40px",
    textAlign: "center",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px",
  },

  emptyTitle: {
    fontSize: "36px",
    marginBottom: "15px",
  },

  emptyText: {
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "1.8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "32px",
  },

  card: {
    background: "#111827",
    borderRadius: "28px",
    padding: "30px",
    transition: "all 0.3s ease",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #1e293b, #334155)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
  },

  postLabel: {
    color: "#38bdf8",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  pending: {
    color: "#facc15",
    fontWeight: "bold",
    fontSize: "15px",
  },

  commentBox: {
    background: "#0f172a",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "30px",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  content: {
    color: "#e2e8f0",
    lineHeight: "2",
    fontSize: "16px",
    margin: 0,
  },

  actions: {
    display: "flex",
    gap: "15px",
  },

  approve: {
    flex: 1,
    padding: "15px",
    background:
      "linear-gradient(to right, #22c55e, #16a34a)",
    border: "none",
    borderRadius: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow:
      "0 10px 20px rgba(34,197,94,0.25)",
  },

  reject: {
    flex: 1,
    padding: "15px",
    background:
      "linear-gradient(to right, #ef4444, #dc2626)",
    border: "none",
    borderRadius: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow:
      "0 10px 20px rgba(239,68,68,0.25)",
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