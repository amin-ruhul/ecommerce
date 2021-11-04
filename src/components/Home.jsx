import React, { useEffect, useState } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Product from "./Product";
import Pagination from "react-js-pagination";
import Loading from "./layout/Loading";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  console.log(loading, products);

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <MetaData title="Buy the best product | My E-commerce" />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {!loading &&
            products &&
            products.data.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </section>
      {!loading && products && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={products.resultPerPage}
            totalItemsCount={products.productCount}
            onChange={setCurrentPageNo}
            prevPageText="Prev"
            nextPageText="Next"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
}

export default Home;
