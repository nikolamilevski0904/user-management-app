import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    setStatus("loading");

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [id]);

  if (status === "loading") {
    return (
      <div className="panel">
        <p className="muted">Loading user…</p>
      </div>
    );
  }

  if (status === "error" || !user?.id) {
    return (
      <div className="panel">
        <Link to="/" className="btnSecondary" style={{ display: "inline-block" }}>
          ← Back
        </Link>
        <div style={{ marginTop: 12 }}>
          <p className="muted">
            User not found. (If you clicked a local-added user, it won’t exist on the API.)
          </p>
        </div>
      </div>
    );
  }

  const addr = user.address || {};
  const addressLine =
    [addr.street, addr.suite, addr.city, addr.zipcode].filter(Boolean).join(", ") || "—";

  return (
    <div>
      <div className="panel" style={{ marginBottom: 14 }}>
        <Link to="/" className="btnSecondary" style={{ display: "inline-block" }}>
          ← Back
        </Link>

        <div style={{ marginTop: 14 }}>
          <h1 className="pageTitle" style={{ margin: 0 }}>
            {user.name}
          </h1>
          <p className="muted" style={{ marginTop: 6 }}>
            {user.email}
          </p>
        </div>
      </div>

      <div className="panel">
        <h2 style={{ marginBottom: 12, color: "var(--text)", fontSize: 16 }}>Contact & Info</h2>

        <div className="detailsGrid">
          <div className="detailItem">
            <div className="detailLabel">Company</div>
            <div className="detailValue">{user.company?.name ?? "—"}</div>
          </div>

          <div className="detailItem">
            <div className="detailLabel">Phone</div>
            <div className="detailValue">{user.phone || "—"}</div>
          </div>

          <div className="detailItem">
            <div className="detailLabel">Website</div>
            <div className="detailValue">
              {user.website ? (
                <a className="userLink" href={`https://${user.website}`} target="_blank" rel="noreferrer">
                  {user.website}
                </a>
              ) : (
                "—"
              )}
            </div>
          </div>

          <div className="detailItem" style={{ gridColumn: "1 / -1" }}>
            <div className="detailLabel">Address</div>
            <div className="detailValue">{addressLine}</div>
          </div>
        </div>
      </div>
    </div>
  );
}