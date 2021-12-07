import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ isAdmin, component: Component, ...rest }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <>
      {!loading && user && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
}

export default ProtectedRoute;
