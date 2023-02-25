import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    country: "",
    address: "",
    school: "",
    email: "",
    mentor_id: null,
  });
  const {
    first_name,
    last_name,
    birth_date,
    country,
    address,
    school,
    email,
    mentor_id,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.data);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <h1>Register</h1>
        <input
          type="text"
          name="first_name"
          value={first_name}
          placeholder="First name"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        <input
          type="text"
          name="last_name"
          value={last_name}
          placeholder="Last name"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        <input
          type="date"
          name="birth_date"
          value={birth_date}
          placeholder="Birth date"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        <input
          type="text"
          name="country"
          value={country}
          placeholder="Country"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Address"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        <input
          type="text"
          name="school"
          value={school}
          placeholder="School"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          required
        />{" "}
        <br />
        {loading ? (
          <div class="loader">
            <div class="square" id="sq1"></div>
            <div class="square" id="sq2"></div>
            <div class="square" id="sq3"></div>
            <div class="square" id="sq4"></div>
            <div class="square" id="sq5"></div>
            <div class="square" id="sq6"></div>
            <div class="square" id="sq7"></div>
            <div class="square" id="sq8"></div>
            <div class="square" id="sq9"></div>
          </div>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )}
        <h2>{error}</h2>
        <Link to="/" id="link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Register;
