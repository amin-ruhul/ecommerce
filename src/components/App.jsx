import React, { useEffect } from "react";
import Home from "./Home";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Login from "./user/Login";
import Register from "./user/Register";
import { loadUser } from "../actions/authAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    console.log("hello from app");
  }, [dispatch]);

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
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
