import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../layout/Loading";

function Profile() {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {user && (
        <>
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.user.avatar && user.user.avatar.url}
                  alt={user.user && user.user.name}
                />
              </figure>
              <Link
                to="/edit/profile"
                href="#"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.user && user.user.name}</p>

              <h4>Email Address</h4>
              <p>{user.user && user.user.email}</p>

              {user.user.role === "user" && (
                <Link to="/myorder" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/change/password"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
