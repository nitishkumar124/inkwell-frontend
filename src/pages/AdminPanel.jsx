import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";

import { getRole } from "../auth/auth";

export default function AdminPanel() {

  const role = getRole();

  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState([]);

  // ADMIN ONLY
  if (role !== "ADMIN") {

    return (
      <>
        <Navbar />

        <div style={styles.deniedPage}>

          <div style={styles.deniedCard}>

            <h1 style={styles.deniedTitle}>
              Access Denied
            </h1>

            <p style={styles.deniedText}>
              Only admins can access this page.
            </p>

          </div>
        </div>
      </>
    );
  }

  // USERS
  const fetchUsers = async () => {

    try {

      const res =
        await API.get("/auth/admin/users");

      setUsers(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // POSTS
  const fetchPosts = async () => {

    try {

      const res =
        await API.get("/posts");

      setPosts(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // COMMENTS
  const fetchComments = async () => {

    try {

      const res =
        await API.get("/comments/pending/all");

      setComments(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // UPDATE ROLE
  const updateRole = async (id, role) => {

    try {

      await API.put(
        `/auth/admin/users/${id}/role?role=${role}`
      );

      fetchUsers();

    } catch (err) {

      console.error(err);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {

    try {

      await API.delete(
        `/auth/admin/users/${id}`
      );

      fetchUsers();

    } catch (err) {

      console.error(err);
    }
  };

  // FEATURE POST
  const featurePost = async (id) => {

    try {

      await API.put(
        `/posts/${id}/feature`
      );

      fetchPosts();

    } catch (err) {

      console.error(err);
    }
  };

  // DELETE POST
  const deletePost = async (id) => {

    try {

      await API.delete(`/posts/${id}`);

      fetchPosts();

    } catch (err) {

      console.error(err);
    }
  };

  // APPROVE COMMENT
  const approveComment = async (id) => {

    try {

      await API.put(
        `/comments/${id}/approve`
      );

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  // REJECT COMMENT
  const rejectComment = async (id) => {

    try {

      await API.put(
        `/comments/${id}/reject`
      );

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchUsers();

    fetchPosts();

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
              ⚡ System Control Center
            </div>

            <h1 style={styles.heading}>
              Admin Panel
            </h1>

            <p style={styles.subheading}>
              Manage users, moderate platform
              activity, and control featured
              content across InkWell.
            </p>

          </div>

          <div style={styles.statsWrapper}>

            <div style={styles.statsCard}>
              <h2 style={styles.statsNumber}>
                {users.length}
              </h2>

              <p style={styles.statsLabel}>
                Users
              </p>
            </div>

            <div style={styles.statsCard}>
              <h2 style={styles.statsNumber}>
                {posts.length}
              </h2>

              <p style={styles.statsLabel}>
                Posts
              </p>
            </div>

            <div style={styles.statsCard}>
              <h2 style={styles.statsNumber}>
                {comments.length}
              </h2>

              <p style={styles.statsLabel}>
                Pending
              </p>
            </div>

          </div>
        </div>

        {/* TABS */}
        <div style={styles.tabs}>

          <button
            style={{
              ...styles.tab,
              ...(tab === "users"
                ? styles.activeTab
                : {}),
            }}
            onClick={() => setTab("users")}
          >
            👥 Users
          </button>

          <button
            style={{
              ...styles.tab,
              ...(tab === "posts"
                ? styles.activeTab
                : {}),
            }}
            onClick={() => setTab("posts")}
          >
            📝 Posts
          </button>

          <button
            style={{
              ...styles.tab,
              ...(tab === "comments"
                ? styles.activeTab
                : {}),
            }}
            onClick={() =>
              setTab("comments")
            }
          >
            💬 Comments
          </button>

        </div>

        {/* USERS */}
        {tab === "users" && (

          <div style={styles.grid}>

            {users.map((u) => (

              <div
                key={u.id}
                style={styles.card}
              >

                <div>

                  <h2 style={styles.cardTitle}>
                    {u.username}
                  </h2>

                  <p style={styles.email}>
                    {u.email}
                  </p>

                  <div style={styles.roleBadge}>
                    {u.role}
                  </div>

                </div>

                <div style={styles.actions}>

                  <button
                    style={styles.author}
                    onClick={() =>
                      updateRole(
                        u.id,
                        "AUTHOR"
                      )
                    }
                  >
                    Make Author
                  </button>

                  <button
                    style={styles.admin}
                    onClick={() =>
                      updateRole(
                        u.id,
                        "ADMIN"
                      )
                    }
                  >
                    Make Admin
                  </button>

                  <button
                    style={styles.delete}
                    onClick={() =>
                      deleteUser(u.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* POSTS */}
        {tab === "posts" && (

          <div style={styles.grid}>

            {posts.map((p) => (

              <div
                key={p.id}
                style={styles.card}
              >

                <div>

                  <h2 style={styles.cardTitle}>
                    {p.title}
                  </h2>

                  <div
                    style={
                      p.featured
                        ? styles.featuredBadge
                        : styles.normalBadge
                    }
                  >
                    {p.featured
                      ? "⭐ Featured"
                      : "Normal"}
                  </div>

                </div>

                <div style={styles.actions}>

                  <button
                    style={styles.feature}
                    onClick={() =>
                      featurePost(p.id)
                    }
                  >
                    Feature
                  </button>

                  <button
                    style={styles.delete}
                    onClick={() =>
                      deletePost(p.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* COMMENTS */}
        {tab === "comments" && (

          <div style={styles.grid}>

            {comments.map((c) => (

              <div
                key={c.id}
                style={styles.card}
              >

                <div>

                  <p style={styles.commentText}>
                    “{c.content}”
                  </p>

                </div>

                <div style={styles.actions}>

                  <button
                    style={styles.approve}
                    onClick={() =>
                      approveComment(c.id)
                    }
                  >
                    Approve
                  </button>

                  <button
                    style={styles.reject}
                    onClick={() =>
                      rejectComment(c.id)
                    }
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(to bottom, #020617, #0f172a)",
    color: "white",
    padding: "40px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "40px",
  },

  badge: {
    display: "inline-block",
    background: "#2563eb",
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
    lineHeight: "1.8",
    maxWidth: "650px",
  },

  statsWrapper: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  statsCard: {
    background: "#111827",
    padding: "28px",
    borderRadius: "22px",
    minWidth: "140px",
    textAlign: "center",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  statsNumber: {
    fontSize: "42px",
    color: "#38bdf8",
    marginBottom: "10px",
  },

  statsLabel: {
    color: "#94a3b8",
  },

  tabs: {
    display: "flex",
    gap: "18px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },

  tab: {
    padding: "14px 24px",
    borderRadius: "16px",
    border: "none",
    background: "#1e293b",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "0.25s",
  },

  activeTab: {
    background:
      "linear-gradient(to right, #2563eb, #38bdf8)",
    color: "white",
    boxShadow:
      "0 10px 25px rgba(56,189,248,0.25)",
  },

  grid: {
    display: "grid",
    gap: "25px",
  },

  card: {
    background: "#111827",
    padding: "28px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  cardTitle: {
    fontSize: "34px",
    marginBottom: "10px",
  },

  email: {
    color: "#94a3b8",
    marginBottom: "14px",
  },

  roleBadge: {
    display: "inline-block",
    background: "#1d4ed8",
    padding: "7px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  featuredBadge: {
    display: "inline-block",
    background: "#facc15",
    color: "#000",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "13px",
  },

  normalBadge: {
    display: "inline-block",
    background: "#334155",
    color: "white",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "13px",
  },

  commentText: {
    color: "#e2e8f0",
    fontSize: "18px",
    lineHeight: "1.8",
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  author: {
    background:
      "linear-gradient(to right, #38bdf8, #0ea5e9)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  admin: {
    background:
      "linear-gradient(to right, #a855f7, #9333ea)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  feature: {
    background:
      "linear-gradient(to right, #facc15, #eab308)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },

  approve: {
    background:
      "linear-gradient(to right, #22c55e, #16a34a)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  reject: {
    background:
      "linear-gradient(to right, #ef4444, #dc2626)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  delete: {
    background:
      "linear-gradient(to right, #dc2626, #b91c1c)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
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