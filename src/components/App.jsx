import React from "react";
import Home from "./Home";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
