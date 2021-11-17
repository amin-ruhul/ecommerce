import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";

function ConfirmOrder({ history }) {
  const { shipingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  console.log(user, shipingInfo);

  let subtotal =
    cartItems &&
    cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);

  subtotal = Number(subtotal);
  let shipping = subtotal > 500 ? 0 : 15;
  let tax = Number((0.02 * subtotal).toFixed(2));

  let total = subtotal + shipping + tax;

  const handelClick = () => {
    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps shiping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user ? user.user.name : ""}
          </p>
          <p>
            <b>Phone:</b> {shipingInfo ? shipingInfo.phone : ""}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shipingInfo ? shipingInfo.address : ""},{" "}
            {shipingInfo ? shipingInfo.city : ""},{" "}
            {shipingInfo ? shipingInfo.postalCode : ""},{" "}
            {shipingInfo ? shipingInfo.country : ""}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          <hr />

          {cartItems &&
            cartItems.map((item) => (
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <p>{item.name}</p>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:
              <span className="order-summary-values">${subtotal}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shipping}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${tax}</span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values">${total.toFixed(2)}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={handelClick}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
