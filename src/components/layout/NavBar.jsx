import React from "react";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";

function NavBar() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <Link to="/">
          <div className="navbar-brand">
            <h2 className="text-white">Ecom</h2>
          </div>
        </Link>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Route render={({ history }) => <Search history={history} />} />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="mr-2">
            Cart
          </span>
          <span className="mr-3" id="cart_count">
            {cartItems ? cartItems.length : 0}
          </span>
        </Link>

        {!user && !loading && (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}
        {user && (
          <div className="ml-4 dropdown d-inline">
            <Link
              to="#!"
              className="btn dropdown-toggle text-white mr-4"
              type="button"
              id="dropDownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.user.avatar && user.user.avatar.url}
                  alt={user.user && user.user.name}
                  className="rounded-circle"
                />
              </figure>
              <span>{user.user.name}</span>
            </Link>

            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              {user && user.user.role === "admin" && (
                <Link className="dropdown-item " to="/admin/dashboard">
                  Dashboard
                </Link>
              )}

              <Link className="dropdown-item " to="/profile">
                Profile
              </Link>
              <Link className="dropdown-item " to="/orders">
                Orders
              </Link>
              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
