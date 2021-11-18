import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { orderDetails, clearError } from "../../actions/orderAction";
import Loading from "../layout/Loading";

function OrderDetails({ match }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.order);
  console.log("eee", order);

  useEffect(() => {
    dispatch(orderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, error, match.params.id]);

  if (loading) return <Loading />;

  return (
    <>
      {order && (
        <>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {order && order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>{/* <b>Name:</b> {order && order.user.name} */}</p>
              <p>
                <b>Phone:</b> {order && order.shippingInfo.phone}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {order && order.shippingInfo.address}
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

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  order.orderStatus === "processing" ? "greenColor" : "redColor"
                }
              >
                <b>
                  {order && order.orderStatus === "processing"
                    ? "Processing"
                    : "Delivered"}
                </b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              {order.orderItems.map((item) => (
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
          </div>
        </>
      )}
    </>
  );
}

export default OrderDetails;
