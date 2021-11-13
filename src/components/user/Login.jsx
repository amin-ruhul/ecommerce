import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearError } from "../../actions/authAction";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );
  console.log(isAuthenticated, loading);
  const alert = useAlert();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, isAuthenticated, error, history, alert]);

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

          <Link to="password/forgot" className="float-right mb-4">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn btn-block py-3"
          >
            LOGIN
          </button>

          <Link to="/register" className="float-right mt-3">
            New User?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;