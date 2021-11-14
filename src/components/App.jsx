import React, { useEffect } from "react";
import Home from "./Home";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Login from "./user/Login";
import Register from "./user/Register";
import { loadUser } from "../actions/authAction";

import store from "../store";
import Profile from "./user/Profile";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("Hello from app");
  }, []);

  return (
    <Router>
      <NavBar />
      <div className="container container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
