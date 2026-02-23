import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  function handleAddUser(e) {
    e.preventDefault();

    if (!newName.trim() || !newEmail.trim()) {
      alert("Name and Email are required");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      company: { name: "Local User" },
      phone: "",
      website: "",
      address: { street: "", suite: "", city: "", zipcode: "" },
      isLocal: true,
    };

    setUsers((prev) => [newUser, ...prev]);
    setNewName("");
    setNewEmail("");
  }

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filteredSortedUsers = users
    .filter((user) => {
      const q = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;

      const getVal = (u) => {
        if (sortKey === "name") return u.name || "";
        if (sortKey === "email") return u.email || "";
        if (sortKey === "company") return u.company?.name || "";
        return "";
      };

      const av = getVal(a).toLowerCase();
      const bv = getVal(b).toLowerCase();

      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });

  return (
    <div>
      <h1 className="pageTitle">Users</h1>

      <div className="panel">
        <form onSubmit={handleAddUser} className="row">
          <input
            className="input"
            type="text"
            placeholder="Name (required)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Email (required)"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button className="btn" type="submit">
            Add User
          </button>
        </form>

        <div className="row" style={{ marginTop: 12 }}>
          <input
            className="input"
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="sortRow">
            <span className="muted">Sort:</span>
            <button className="btnSecondary" type="button" onClick={() => handleSort("name")}>
              Name {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </button>
            <button className="btnSecondary" type="button" onClick={() => handleSort("email")}>
              Email {sortKey === "email" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </button>
            <button className="btnSecondary" type="button" onClick={() => handleSort("company")}>
              Company {sortKey === "company" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </button>
          </div>
        </div>
      </div>

      <div className="list">
        {filteredSortedUsers.map((user) => (
          <div key={user.id} className="user-card">
            <Link className="userLink" to={`/users/${user.id}`}>
              {user.name}
            </Link>
            <div className="muted">{user.email}</div>
            <div className="muted">{user.company?.name ?? "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}