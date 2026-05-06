import { useState } from "react";
import UsersTab from "./admin/UsersTab";
import PostsTab from "./admin/PostsTab";
import CommentsTab from "./admin/CommentsTab";

export default function AdminPanel() {
  const [tab, setTab] = useState("users");

  return (
    <div>
      <h2>Admin Panel</h2>

      <button onClick={() => setTab("users")}>Users</button>
      <button onClick={() => setTab("posts")}>Posts</button>
      <button onClick={() => setTab("comments")}>Comments</button>

      {tab === "users" && <UsersTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "comments" && <CommentsTab />}
    </div>
  );
}