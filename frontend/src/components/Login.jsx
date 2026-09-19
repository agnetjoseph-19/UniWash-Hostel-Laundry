import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Welcome Back</h2>

        <p>Login to your UniWash account</p>

        <form>
          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;