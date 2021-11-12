import React from "react";
import { Link, Route } from "react-router-dom";
import Search from "./Search";

function NavBar() {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <h2 className="text-white">Ecom</h2>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Route render={({ history }) => <Search history={history} />} />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/login" className="btn" id="login_btn">
          Login
        </Link>

        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
