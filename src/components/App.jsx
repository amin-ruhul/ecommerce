import React, { useEffect, useState } from "react";
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
import Cart from "./cart/Cart";
import Shiping from "./cart/Shiping";
import ConfirmOrder from "./cart/ConfirmOrder";
import axios from "axios";
import Payment from "./cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./cart/Success";
import MyOrders from "./order/MyOrders";
import OrderDetails from "./order/OrderDetails";
import Dashboard from "./admin/Dashboard";
import ProductList from "./admin/ProductList";
import NewProduct from "./admin/NewProduct";
import UpdateProduct from "./admin/UpdateProduct";
import OrdersList from "./admin/OrderList";
import ProcessOrder from "./admin/ProcessOrder";

function App() {
  const [stripeApiKay, setStripeApiKay] = useState("");
  console.log("Api", stripeApiKay);

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/payment/stripe/key");
    setStripeApiKay(data.stripeApiKay);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
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
          <Route exact path="/cart" component={Cart} />

          <ProtectedRoute exact path="/shiping" component={Shiping} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/success" component={Success} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          {stripeApiKay && (
            <Elements stripe={loadStripe(stripeApiKay)}>
              <ProtectedRoute exact path="/payment" component={Payment} />
            </Elements>
          )}
        </Switch>
      </div>
      <Switch>
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrdersList}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/new"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
