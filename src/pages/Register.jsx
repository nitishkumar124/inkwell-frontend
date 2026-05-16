import { useState } from "react";

import API from "../api/api";

import {
  Link,
  useNavigate
} from "react-router-dom";

export default function Register() {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      await API.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert(
        "Registered successfully"
      );

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message
        || "Registration failed"
      );
    }
  };

  return (
    <div style={styles.page}>

      {/* LEFT */}
      <div style={styles.left}>

        <h1 style={styles.logo}>
          Join InkWell
        </h1>

        <p style={styles.tagline}>
          Start your writing journey today.
        </p>

        <p style={styles.description}>
          Discover stories, share ideas,
          and become part of a growing
          creator community.
        </p>

      </div>

      {/* RIGHT */}
      <div style={styles.right}>

        <div style={styles.card}>

          <h2 style={styles.heading}>
            Create Account
          </h2>

          <p style={styles.subheading}>
            Register as a reader
          </p>

          <input
            placeholder="Username"
            style={styles.input}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            placeholder="Email"
            style={styles.input}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            style={styles.registerBtn}
            onClick={handleRegister}
          >
            Register
          </button>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link
              to="/"
              style={styles.link}
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial",
  },

  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "80px",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",
  },

  logo: {
    fontSize: "58px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  tagline: {
    fontSize: "26px",
    color: "#38bdf8",
    marginBottom: "20px",
  },

  description: {
    fontSize: "18px",
    color: "#cbd5e1",
    maxWidth: "450px",
    lineHeight: "1.7",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#1e293b",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  subheading: {
    color: "#94a3b8",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  registerBtn: {
    width: "100%",
    padding: "14px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "25px",
  },

  footerText: {
    color: "#94a3b8",
    textAlign: "center",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "bold",
  },
};