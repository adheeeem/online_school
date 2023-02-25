import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Login() {
  const [user, setUser] = useState("http://localhost:8000/");
  const [username, setUsername] = useState("st9763031");
  const [password, setPassword] = useState("SnS60xps");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const selectLogin = (e) => {
    if (e.target.value == "mentor") {
      setUser("http://localhost:8001/");
    } else {
      setUser("http://localhost:8000/");
    }
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(user + "login", formData);
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard", { state: { user } });
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const handleTokenLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        console.log(token);
        await axios.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/dashboard");
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    handleTokenLogin();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login">
      <div className="form">
        <h1>Sign in</h1>
        <select name="" id="" onChange={selectLogin}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={handleUsernameChange}
        />{" "}
        <br />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={handlePasswordChange}
        />{" "}
        <br />
        <button onClick={handleLogin}>Login</button>
        {error && <h1 style={{fontSize: "20px", color: "red"}}>{error.detail}</h1>}
        <br />
        <Link to="/" id="link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
