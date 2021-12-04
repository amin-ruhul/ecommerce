import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loading from "../layout/Loading";

import MetaData from "../MetaData";
import SideBar from "./SideBar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, clearError } from "../../actions/userAction";
//import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const UserList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.user);

  console.log("User", users);

  useEffect(() => {
    dispatch(getAllUser());

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    // if (isDeleted) {
    //   alert.success("Order deleted successfully");
    //   history.push("/admin/orders");
    //   //dispatch({ type: DELETE_ORDER_RESET })
    // }
    // eslint-disable-next-line
  }, []);

  //   const deleteOrderHandler = (id) => {
  //     dispatch(deleteOrder(id));
  //   };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
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

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.role,
          actions: (
            <Fragment>
              <Link
                to={`/admin/order/${user._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button className="btn btn-danger py-1 px-2 ml-2">
                <i className="fa fa-trash"></i>
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
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <Loading />
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default UserList;
