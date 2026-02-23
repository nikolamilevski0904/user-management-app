import { Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";

export default function App() {
  return (
    <div className="container">
      <nav className="topnav">
        <Link to="/" className="brand">User Management</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}