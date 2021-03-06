import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearError } from "../../actions/authAction";
import { Link } from "react-router-dom";

function Login({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );
  const alert = useAlert();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      if (error === "Not Authorize") return;
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, isAuthenticated, error, history, alert, redirect]);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handelSubmit}>
          <h1 className="mb-3">Login</h1>
          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!loading && (
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>
          )}

          {loading && (
            <button id="login_button" className="btn btn-block py-3" disabled>
              Requesting...
            </button>
          )}

          <Link to="/register" className="float-right mt-3">
            New User?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
