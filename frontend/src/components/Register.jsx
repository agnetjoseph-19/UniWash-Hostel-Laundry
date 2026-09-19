import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Create Account</h2>

        <p>Register for your UniWash account</p>

        <form>
          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          <button type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;