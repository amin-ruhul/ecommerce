import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { loadUser } from "../../actions/authAction";
import {
  updateProfile,
  clearError,
  resetUpdatedState,
} from "../../actions/userAction";

function UpdateProfile({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated } = useSelector((state) => state.user);
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setAvatar(user.user.url);
      setAvatarPreview(user.user.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Update successfully");
      dispatch(loadUser());
      history.push("/profile");
      dispatch(resetUpdatedState());
    }
  }, [dispatch, user, history, isUpdated, error, alert]);

  const handelAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // set form data
  const formData = new FormData();
  formData.set("name", name);
  formData.set("email", email);
  formData.set("avatar", avatar);

  // call the register function
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow-lg"
          encType="multipart/form-data"
          onSubmit={handelSubmit}
        >
          <h1 className="mt-2 mb-5">Update Profile</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img src="" className="rounded-circle" alt="Avatar Preview" />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" for="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
