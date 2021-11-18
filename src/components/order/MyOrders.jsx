import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, clearError } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loading from "../layout/Loading";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
function MyOrders() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, error]);

  if (loading) return <Loading />;

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderItems.length,
          amount: `$ ${order.totalPrice}`,
          status: order.orderStatus,
          action: (
            <Link to={`/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
          ),
        });
      });

    return data;
  };

  return (
    <>
      {orders && (
        <>
          <h2 className="mt-5">My Orders</h2>
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </>
  );
}

export default MyOrders;
