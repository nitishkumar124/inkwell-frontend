import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleGuest = () => {
    navigate("/feed");
  };

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.data;

      localStorage.setItem("token", token);

      navigate("/feed");

    } catch (err) {

      alert(
        err.response?.data?.message
        || "Login failed"
      );
    }
  };

  return (
    <div style={styles.page}>

      {/* LEFT */}
      <div style={styles.left}>

        <h1 style={styles.logo}>
          InkWell
        </h1>

        <p style={styles.tagline}>
          Write. Share. Inspire.
        </p>

        <p style={styles.description}>
          A modern blogging platform for
          readers, authors, and communities.
        </p>

      </div>

      {/* RIGHT */}
      <div style={styles.right}>

        <div style={styles.card}>

          <h2 style={styles.heading}>
            Welcome Back
          </h2>

          <p style={styles.subheading}>
            Login to continue
          </p>

          <input
            type="email"
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
            style={styles.loginBtn}
            onClick={handleLogin}
          >
            Login
          </button>

          <button
            style={styles.guestBtn}
            onClick={handleGuest}
          >
            Continue as Guest
          </button>

          <p style={styles.footerText}>
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={styles.link}
            >
              Register
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
    fontSize: "64px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  tagline: {
    fontSize: "28px",
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

  loginBtn: {
    width: "100%",
    padding: "14px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "15px",
    transition: "0.2s",
  },

  guestBtn: {
    width: "100%",
    padding: "14px",
    background: "#334155",
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