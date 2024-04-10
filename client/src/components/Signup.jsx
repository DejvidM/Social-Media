import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [Alias, setAlias] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container login-box mb-5">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="user-box">
              <label>Alias</label>
              <input
                type="text"
                value={Alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
            <div className="user-box">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="user-box">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="user-box">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Signup;
