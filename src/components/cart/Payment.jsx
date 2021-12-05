import React, { useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { createNewOrder, clearError } from "../../actions/orderAction";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

function Payment({ history }) {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const alert = useAlert();

  const { user } = useSelector((state) => state.auth);
  const { shipingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  const orderInfo = sessionStorage.getItem("orderInfo")
    ? JSON.parse(sessionStorage.getItem("orderInfo"))
    : {};

  const paymentData = {
    amount: orderInfo ? Math.round(orderInfo.total * 100) : "",
  };

  const order = {
    shippingInfo: shipingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo && orderInfo.itemsPrice,
    tax: orderInfo && orderInfo.tax,
    totalPrice: orderInfo && orderInfo.total,
    deliveryCharge: orderInfo && orderInfo.shipping,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createNewOrder(order));

          history.push("/success");
        } else {
          alert.error("Failed to process payment");
          document.querySelector("#pay_btn").disabled = false;
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <CheckoutSteps shiping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay ${orderInfo && orderInfo.total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
