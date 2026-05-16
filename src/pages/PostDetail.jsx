import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../api/api";

import Navbar from "../components/Navbar";

import {
  getRole,
  isAuthenticated,
} from "../auth/auth";

export default function PostDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const role = getRole();

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  // FETCH POST
  const fetchPost = async () => {

    try {

      const res = await API.get(`/posts/${id}`);

      setPost(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // FETCH COMMENTS
  const fetchComments = async () => {

    try {

      const res = await API.get(`/comments/post/${id}`);

      setComments(res.data.data);

    } catch (err) {

      console.error(err);
    }
  };

  // LIKE
  const handleLike = async () => {

    if (!isAuthenticated()) {

      navigate("/");

      return;
    }

    try {

      await API.post(`/posts/${id}/like`);

      fetchPost();

    } catch (err) {

      console.error(err);
    }
  };

  // COMMENT
  const addComment = async () => {

    if (!commentText.trim()) return;

    try {

      await API.post("/comments", {
        postId: id,
        content: commentText,
      });

      setCommentText("");

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  // APPROVE
  const approveComment = async (commentId) => {

    try {

      await API.put(`/comments/${commentId}/approve`);

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  // REJECT
  const rejectComment = async (commentId) => {

    try {

      await API.put(`/comments/${commentId}/reject`);

      fetchComments();

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchPost();

    fetchComments();

  }, []);

  if (!post) {

    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        {/* POST */}
        <div style={styles.postWrapper}>

          {/* FEATURED */}
          {post.featured && (
            <div style={styles.featured}>
              ⭐ Featured Post
            </div>
          )}

          {/* IMAGE */}
          {post.imageUrl && (
            <div style={styles.imageWrapper}>

              <img
                src={`http://localhost:8082${post.imageUrl}`}
                alt="post"
                style={styles.image}
              />

              <div style={styles.imageOverlay} />

            </div>
          )}

          {/* CONTENT CARD */}
          <div style={styles.postCard}>

            <h1 style={styles.title}>
              {post.title}
            </h1>

            {/* META */}
            <div style={styles.meta}>

              <div style={styles.metaPill}>
                👁 {post.viewCount || 0} views
              </div>

              <div
                style={styles.likePill}
                onClick={handleLike}
              >
                ❤️ {post.likeCount || 0} likes
              </div>

            </div>

            {/* CONTENT */}
            <p style={styles.content}>
              {post.content}
            </p>

          </div>
        </div>

        {/* COMMENTS */}
        <div style={styles.commentsSection}>

          <h2 style={styles.commentsHeading}>
            Comments
          </h2>

          {/* GUEST */}
          {!isAuthenticated() && (

            <p
              style={styles.loginText}
              onClick={() => navigate("/")}
            >
              Login to like and comment
            </p>
          )}

          {/* COMMENT BOX */}
          {(role === "READER" || role === "AUTHOR") && (

            <div style={styles.commentBox}>

              <textarea
                value={commentText}
                onChange={(e) =>
                  setCommentText(e.target.value)
                }
                placeholder="Write your thoughts..."
                style={styles.textarea}
              />

              <button
                style={styles.commentBtn}
                onClick={addComment}
              >
                Add Comment
              </button>

            </div>
          )}

          {/* COMMENTS */}
          <div style={styles.commentsGrid}>

            {comments.map((c) => (

              <div
                key={c.id}
                style={styles.commentCard}
              >

                {/* STATUS */}
                {c.status === "PENDING" && (
                  <div style={styles.pending}>
                    ⏳ Pending Approval
                  </div>
                )}

                <p style={styles.commentText}>
                  {c.content}
                </p>

                {/* MODERATION */}
                {(role === "ADMIN" || role === "AUTHOR")
                  && c.status === "PENDING" && (

                  <div style={styles.moderation}>

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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {

  loading: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  },

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(to bottom, #020617, #0f172a)",
    color: "white",
    padding: "40px",
  },

  postWrapper: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  featured: {
    background: "#facc15",
    color: "#000",
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "999px",
    marginBottom: "20px",
    fontWeight: "bold",
    boxShadow:
      "0 4px 12px rgba(250,204,21,0.3)",
  },

  imageWrapper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "22px",
    marginBottom: "30px",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.35)",
  },

  image: {
    width: "100%",
    height: "380px",
    objectFit: "cover",
    display: "block",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
  },

  postCard: {
    background: "#111827",
    padding: "40px",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  title: {
    fontSize: "54px",
    fontWeight: "bold",
    marginBottom: "25px",
    lineHeight: "1.1",
    letterSpacing: "-1px",
  },

  meta: {
    display: "flex",
    gap: "16px",
    marginBottom: "35px",
    flexWrap: "wrap",
  },

  metaPill: {
    background: "#1e293b",
    padding: "10px 16px",
    borderRadius: "999px",
    color: "#94a3b8",
    fontSize: "14px",
  },

  likePill: {
    background: "#1e293b",
    padding: "10px 16px",
    borderRadius: "999px",
    color: "#f43f5e",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.2s",
  },

  content: {
    color: "#cbd5e1",
    lineHeight: "2",
    fontSize: "18px",
    whiteSpace: "pre-wrap",
  },

  commentsSection: {
    maxWidth: "900px",
    margin: "60px auto 0 auto",
  },

  commentsHeading: {
    fontSize: "34px",
    marginBottom: "25px",
  },

  loginText: {
    color: "#38bdf8",
    cursor: "pointer",
    marginBottom: "25px",
  },

  commentBox: {
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "40px",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    background: "#0f172a",
    color: "white",
    border: "1px solid #334155",
    borderRadius: "14px",
    padding: "18px",
    resize: "vertical",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  commentBtn: {
    marginTop: "16px",
    padding: "12px 24px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },

  commentsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  commentCard: {
    background: "#111827",
    padding: "24px",
    borderRadius: "20px",
    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  pending: {
    display: "inline-block",
    marginBottom: "14px",
    color: "#facc15",
    background: "rgba(250,204,21,0.12)",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
  },

  commentText: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  moderation: {
    marginTop: "20px",
    display: "flex",
    gap: "12px",
  },

  approve: {
    background: "#22c55e",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  reject: {
    background: "#ef4444",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};