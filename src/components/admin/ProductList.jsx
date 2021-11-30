import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, clearError } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Loading from "../layout/Loading";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

function ProductList() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, adminProducts } = useSelector(
    (state) => state.products
  );

  console.log("admin products", adminProducts);

  useEffect(() => {
    dispatch(getAdminProduct());

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
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
    };

    adminProducts &&
      adminProducts.forEach((product) => {
        data.rows.push({
          id: product._id,
          name: product.name,
          price: `$ ${product.price}`,
          stock: product.stock,
          action: (
            <>
              <Link
                to={`/admin/product/${product._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button className="btn btn-danger py-1 px-2 ml-2">
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-5">All Products</h1>
          {!loading && (
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
