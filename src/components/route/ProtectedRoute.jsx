import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  console.log("profile", loading, isAuthenticated);

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
}

export default ProtectedRoute;
