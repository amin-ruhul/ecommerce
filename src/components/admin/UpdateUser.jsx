import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getUser, clearError } from "../../actions/userAction";
import Loading from "../layout/Loading";

function UpdateUser({ match }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.user);
  console.log("User", user);

  useEffect(() => {
    dispatch(getUser(match.params.id));

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    // eslint-disable-next-line
  }, [dispatch, alert, error, match.params.id]);

  if (loading) return <Loading />;
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      <div className="col-12 col-md-10">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg">
              <h1 className="mt-2 mb-5">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChang={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role_field">Role</label>

                <select
                  id="role_field"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
