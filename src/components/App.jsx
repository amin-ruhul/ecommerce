import React from "react";
import Home from "./Home";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container container-fluid">
        <Route exact path="/" component={Home} />
      </div>

      <Footer />
    </Router>
  );
}

export default App;
