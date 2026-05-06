import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
// import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
// import AdminPanel from "./pages/AdminPanel";
// import { isAuthenticated, getRole } from "./auth/auth";
import Register from "./pages/Register";

// const RequireAuth = ({ children }) =>
  // isAuthenticated() ? children : <Navigate to="/" />;

// const RequireRole = ({ role, children }) =>
  // getRole() === role ? children : <Navigate to="/feed" />;

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/feed" element={<Feed />} />

          <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
