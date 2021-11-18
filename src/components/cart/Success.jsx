import React from "react";
import MetaData from "../MetaData";

function Success() {
  return (
    <>
      <MetaData title={"Order placed Successfully"} />
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="https://cdn.pixabay.com/photo/2014/04/02/10/12/checkbox-303113_1280.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>
        </div>
      </div>
    </>
  );
}

export default Success;
