import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./user.scss";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [err, setErr] = useState(null);
  const [showTable, setShowTable] = useState(true); // Controls table visibility
  const location = useLocation();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8880/api/users/find", {
          withCredentials: true,
        });
        setAllUsers(res.data);
      } catch (error) {
        setErr(error.response?.data || error.message);
      }
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    // Hide table when navigating to profile
    if (location.pathname.startsWith("/profile")) {
      setShowTable(false);
    }
  }, [location.pathname]); // Runs when the path changes

  // If table is hidden, do not render it
  if (!showTable) return null;

  return (
    <div className="table">
      <table className="profileTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => (
            <tr key={i}>
              <td>
                <Link
                  to={`/profile/${user.id}`}
                  onClick={() => setShowTable(false)} // Hide table when clicking user
                >
                  {user.name}
                </Link>
              </td>
              <td>
                {user.profilePic ? (
                  <img
                    src={
                      user.profilePic.startsWith("http")
                        ? user.profilePic
                        : "/upload/" + user.profilePic
                    }
                    alt={`${user.name}'s profile`}
                  />
                ) : (
                  "No Profile Picture"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {err && <p className="error">{err}</p>}
    </div>
  );
}

export default Users;