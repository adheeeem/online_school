import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const location = useLocation()

  const navigate = useNavigate()
  const route = location.state

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    console.log(route);
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
      return;
    }
    axios
      .get(route.user+"me", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.first_name}!</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
