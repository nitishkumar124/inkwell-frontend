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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        {/* POST SECTION */}
        <div style={styles.postContainer}>

          {/* FEATURED */}
          {post.featured && (
            <div style={styles.featured}>
              ⭐ Featured Post
            </div>
          )}

          {/* IMAGE */}
          {post.imageUrl && (
            <img
              src={`http://localhost:8082${post.imageUrl}`}
              alt="post"
              style={styles.image}
            />
          )}

          {/* TITLE */}
          <h1 style={styles.title}>
            {post.title}
          </h1>

          {/* CONTENT */}
          <p style={styles.content}>
            {post.content}
          </p>

          {/* META */}
          <div style={styles.meta}>

            <span>
              👁 {post.viewCount || 0}
            </span>

            <span
              style={styles.like}
              onClick={handleLike}
            >
              ❤️ {post.likeCount || 0}
            </span>
          </div>
        </div>

        {/* COMMENTS */}
        <div style={styles.commentsSection}>

          <h2>Comments</h2>

          {/* GUEST */}
          {!isAuthenticated() && (
            <p
              style={styles.loginText}
              onClick={() => navigate("/")}
            >
              Login to like and comment
            </p>
          )}

          {/* READER / AUTHOR */}
          {(role === "READER" || role === "AUTHOR") && (

            <div style={styles.commentInputContainer}>

              <textarea
                value={commentText}
                onChange={(e) =>
                  setCommentText(e.target.value)
                }
                placeholder="Write your comment..."
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

          {/* COMMENTS LIST */}
          {comments.map((c) => (

            <div key={c.id} style={styles.commentCard}>

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
              {(role === "ADMIN" || role === "AUTHOR") &&
                c.status === "PENDING" && (

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
    </>
  );
}

const styles = {

  page: {
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    padding: "30px",
  },

  postContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  featured: {
    background: "#facc15",
    color: "#000",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "20px",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    maxHeight: "450px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  title: {
    marginTop: "25px",
    fontSize: "40px",
  },

  content: {
    marginTop: "20px",
    lineHeight: "1.9",
    color: "#cbd5e1",
    fontSize: "18px",
  },

  meta: {
    display: "flex",
    gap: "25px",
    marginTop: "20px",
    color: "#94a3b8",
    fontSize: "18px",
  },

  like: {
    cursor: "pointer",
    color: "#f43f5e",
  },

  commentsSection: {
    maxWidth: "900px",
    margin: "50px auto 0px auto",
  },

  loginText: {
    color: "#38bdf8",
    cursor: "pointer",
    marginTop: "15px",
  },

  commentInputContainer: {
    marginTop: "20px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    borderRadius: "10px",
    padding: "15px",
    border: "none",
    outline: "none",
    resize: "vertical",
  },

  commentBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  commentCard: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  pending: {
    color: "#facc15",
    marginBottom: "10px",
  },

  commentText: {
    lineHeight: "1.6",
  },

  moderation: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  approve: {
    background: "#22c55e",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  reject: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};