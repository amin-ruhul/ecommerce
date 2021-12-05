import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getUser, clearError, updateUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../actions/types";
import Loading from "../layout/Loading";

function UpdateUser({ match, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.user
  );
  //console.log("User", user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("User Updated successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
    // eslint-disable-next-line
  }, [dispatch, alert, error, match.params.id, isUpdated]);

  const updateUserHandler = (id) => {
    if (!name) {
      alert.error("Name is require");
      return;
    }

    if (!role) {
      alert.error("Role is require");
      return;
    }

    dispatch(updateUser(id, { name, role }));
  };

  if (loading) return <Loading />;
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      {user && (
        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                onSubmit={() => updateUserHandler(user._id)}
              >
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
                    readOnly
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
      )}
    </div>
  );
}

export default UpdateUser;
