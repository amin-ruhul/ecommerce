import React, { useEffect } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Product from "./Product";

function Home() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  console.log(loading, products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (!loading && !products) {
    return <h1 className="text-center">waiting ...</h1>;
  }
  if (loading) {
    return <h1 className="text-center">Loading ...</h1>;
  }

  return (
    <>
      <MetaData title="Buy the best product | My E-commerce" />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {!loading &&
            products.data &&
            products.data.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </section>
    </>
  );
}

export default Home;
