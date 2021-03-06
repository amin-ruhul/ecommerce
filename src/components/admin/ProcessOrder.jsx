import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  orderDetails,
  clearError,
  updateOrder,
} from "../../actions/orderAction";
import Loading from "../layout/Loading";
import { UPDATE_ORDER_RESET } from "../../actions/types";

function ProcessOrder({ match, history }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { loading, error, order, isUpdated } = useSelector(
    (state) => state.order
  );

  console.log("My Order", order);

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

  useEffect(() => {
    dispatch(orderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Update successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      history.push("/admin/orders");
    }
  }, [dispatch, alert, error, match.params.id, isUpdated, history]);

  const handelOrderProcess = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  if (loading) return <Loading />;

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      <div className="col-12 col-md-10">
        {order && (
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-7 order-details">
              <h1 className="my-5">Order # {order && order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {order.user ? order.user.name : ""}
              </p>
              <p>
                <b>Phone:</b> {order && order.shippingInfo.phone}
              </p>
              <p className="mb-4">
                <b>Address:</b> {order && order.shippingInfo.address}
              </p>
              <p>
                <b>Amount:</b> ${order && order.totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p
                className={
                  order.paymentInfo.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>
                  {order.paymentInfo.status === "succeeded"
                    ? "Paid"
                    : "Not Paid"}
                </b>
              </p>

              <h4 className="my-4">Stripe ID</h4>
              <p className="greenColor">
                <b>{order.paymentInfo.id}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p className="greenColor">
                <b>{order.orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              {order &&
                order.orderItems.map((item) => (
                  <div key={item._id}>
                    <hr />
                    <div className="cart-item my-1">
                      <div className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt="product"
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <p>{item.name}</p>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>

            <div className="col-12 col-lg-3 mt-5">
              <h4 className="my-4">Status</h4>

              <div className="form-group">
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={() => handelOrderProcess(order._id)}
              >
                Update Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProcessOrder;
