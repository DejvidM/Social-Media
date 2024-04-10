import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container login-box">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="user-box">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">
              Submit
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
