import { Link } from "react-router-dom";
import { getRole, isAuthenticated, logout } from "../auth/auth";

export default function Navbar() {
  const role = getRole();

  return (
    <nav style={styles.navbar}>
      
      {/* LEFT */}
      <div style={styles.logoSection}>
        <Link to="/feed" style={styles.logo}>
          Inkwell
        </Link>
      </div>

      {/* RIGHT */}
      <div style={styles.links}>

        {/* PUBLIC */}
        <Link style={styles.link} to="/feed">
          Feed
        </Link>

        {/* GUEST */}
        {!isAuthenticated() && (
          <>
            <Link style={styles.link} to="/">
              Login
            </Link>

            <Link style={styles.link} to="/register">
              Register
            </Link>
          </>
        )}

        {/* READER */}
        {role === "READER" && (
          <>
            <span style={styles.role}>Reader</span>

            <span style={styles.logout} onClick={logout}>
              Logout
            </span>
          </>
        )}

        {/* AUTHOR */}
        {role === "AUTHOR" && (
          <>
            <Link style={styles.link} to="/create">
              Create Post
            </Link>

            <Link style={styles.link} to="/drafts">
              My Drafts
            </Link>

            <Link style={styles.link} to="/moderation">
              Moderation
            </Link>

            <span style={styles.role}>Author</span>

            <span style={styles.logout} onClick={logout}>
              Logout
            </span>
          </>
        )}

        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            <Link style={styles.link} to="/admin">
              Admin Panel
            </Link>

            <span style={styles.role}>Admin</span>

            <span style={styles.logout} onClick={logout}>
              Logout
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: "70px",
    background: "#020617",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    borderBottom: "1px solid #1e293b",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "28px",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "16px",
    transition: "0.2s",
  },

  role: {
    background: "#1e293b",
    color: "#38bdf8",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  logout: {
    color: "#f87171",
    cursor: "pointer",
  },
};