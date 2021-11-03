import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";

function ProductDetails({ match }) {
  console.log(match.params.id);
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  console.log(loading);

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch, match.params.id]);

  if (loading) {
    return <h1 className="text-center">Loading ...</h1>;
  }

  return (
    <div className="row f-flex justify-content-around">
      {!loading && product && (
        <>
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.data.images[0].url}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>
          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.data.name}</h3>
            <p id="product_id">Product # {product.data._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.data.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.data.numOfReview} Reviews)</span>

            <hr />

            <p id="product_price"> $ {product.data.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus">-</span>

              <input
                type="number"
                className="form-control count d-inline"
                value="1"
                readOnly
              />

              <span className="btn btn-primary plus">+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.data.stock > 0 ? "greenColor" : "redColor"}
              >
                {product.data.stock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.data.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>Amazon</strong>
            </p>

            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
            >
              Submit Your Review
            </button>

            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Submit Review
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>
                        <button
                          className="btn my-3 float-right review-btn px-4 text-white"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          {" "}
                          submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;