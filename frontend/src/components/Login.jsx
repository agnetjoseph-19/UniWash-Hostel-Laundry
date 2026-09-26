import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      localStorage.setItem(
        "uniwashUser",
        JSON.stringify(data.user)
      );

      alert("Login successful! 🎉");

      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.user.role === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to the UniWash backend. Make sure the backend is running."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p>
          Login to your UniWash account
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;