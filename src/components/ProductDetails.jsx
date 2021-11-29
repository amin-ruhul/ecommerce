import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  clearError,
  productReview,
} from "../actions/productAction";
import { addToCart } from "../actions/cartAction";
import Loading from "./layout/Loading";
import { useAlert } from "react-alert";
import ReviewList from "./review/ReviewList";

function ProductDetails({ match }) {
  const alert = useAlert();
  const [count, setCount] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { error, isReviewSuccess, loading, product } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isReviewSuccess) {
      alert.success("Review Posted successfully");
    }

    dispatch(getProduct(match.params.id));
  }, [dispatch, match.params.id, alert, error, isReviewSuccess]);

  if (loading) {
    return <Loading />;
  }

  const increaseQuantity = () => {
    if (count >= product.data.stock) {
      alert.info(`Only ${count} Product Available`);
      return;
    }
    setCount(count + 1);
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (count <= 1) {
      alert.info(`No allow to buy less then 1 product`);
      return;
    }
    setCount(count - 1);
    setQuantity(quantity - 1);
  };

  const handelCard = () => {
    dispatch(addToCart(match.params.id, quantity));
    alert.success("Product Added to cart");
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const data = {
      rating,
      comment,
      productId: match.params.id,
    };

    dispatch(productReview(data));
  };

  console.log(product);
  return (
    <>
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
              <span id="no_of_reviews">
                ({product.data.numOfReview} Reviews)
              </span>

              <hr />

              <p id="product_price"> $ {product.data.price}</p>
              <div className="stockCounter d-inline">
                <span
                  className="btn btn-danger minus"
                  onClick={decreaseQuantity}
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={count}
                  readOnly
                />

                <span
                  className="btn btn-primary plus"
                  onClick={increaseQuantity}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.data.stock === 0}
                onClick={handelCard}
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

              {isAuthenticated ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-t" type="alert">
                  Login to submit review
                </div>
              )}

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
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            type="submit"
                            onClick={reviewHandler}
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
      {product && product.data.reviews.length > 0 && (
        <ReviewList reviews={product.data.reviews} />
      )}
    </>
  );
}

export default ProductDetails;
