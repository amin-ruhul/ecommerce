import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loading from "../layout/Loading";

import MetaData from "../MetaData";
import SideBar from "./SideBar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  clearError,
  deleteOrder,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../actions/types";

const OrdersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders, isDeleted } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");

      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    // eslint-disable-next-line
  }, []);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
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
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice.toFixed(2)}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i
                className="fa fa-trash"
                onClick={() => deleteOrderHandler(order._id)}
              ></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            {loading ? (
              <Loading />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
