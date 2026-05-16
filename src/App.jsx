import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Drafts from "./pages/Drafts";
import Moderation from "./pages/Moderation";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/feed" element={<Feed />} />

        <Route path="/posts/:id" element={<PostDetail />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/drafts" element={<Drafts />} />

        <Route path="/moderation" element={<Moderation />} />

        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
