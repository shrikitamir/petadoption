import Footer from "../Footer/Footer";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { uploadImage } from "../../../src/lib/upload.api";
import Spinner from "react-bootstrap/Spinner";
import { editUser } from "./Profile.api";
import PassModal from "./PassModal";
import "./Profile.css";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [oldEmailAndPhone, setOldEmailAndPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const oldEmail = currentUser.email;
    const oldPhone = currentUser.phone;
    setOldEmailAndPhone({
      oldEmail: oldEmail,
      oldPhone: oldPhone,
    });
    //eslint-disable-next-line
  }, [edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileInput = async (e) => {
    setLoading(true);
    const response = await uploadImage(e.target.files[0]);
    const { error } = response;
    if (error) return console.log(error);
    setCurrentUser((prev) => {
      return { ...prev, img: response.data };
    });
    setLoading(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await editUser(currentUser, oldEmailAndPhone);
      const { error } = response;
      if (error) {
        setLoading(false);
        setFormError(error);
        return;
      }
      setLoading(false);
      setEdit(false);
    } catch (err) {
      setLoading(false);
      return setFormError(err);
    }
  };

  return (
    <>
      <div className="colored-section">
        <h1 className="profile-header">Profile</h1>
      </div>
      <div className="white-section profile-section">
        <div className="container profile">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img
                    src={currentUser.img}
                    className="user-img"
                    alt="profile"
                  />
                  {edit && (
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => handleFileInput(e)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="profile-head">
                  <h5>
                    {currentUser.firstName} {currentUser.lastName}
                  </h5>
                  <h6>Phone: {currentUser.phone}</h6>
                  <p className="profile-email">
                    Email : <span>{currentUser.email}</span>
                  </p>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <p className="nav-link active">About</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 profile-edit-btn-container">
                {!edit && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormError("");
                      setEdit(!edit);
                    }}
                    className="profile-edit-btn"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <h5>Short bio</h5>
                  {edit ? (
                    <>
                      <textarea
                        onChange={handleChange}
                        maxLength="85"
                        className="bio-field"
                        name="bio"
                        value={currentUser.bio}
                        type="text"
                        placeholder="Pet Bio (Max 85 Letters)"
                      />
                    </>
                  ) : (
                    <p>{currentUser.bio}</p>
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab">
                  <div className="show active">
                    <div className="row">
                      <div className="col-md-6">
                        <label>First Name</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <Form.Control
                              {...register("firstName", {
                                required: true,
                                minLength: 2,
                                pattern: /^([^0-9]*)$/,
                              })}
                              id="firstName"
                              autoComplete="off"
                              onChange={handleChange}
                              type="text"
                              name="firstName"
                              required
                              value={currentUser.firstName}
                              placeholder="First Name"
                            />
                            {errors.firstName && (
                              <span style={{ color: "crimson" }}>
                                Please fix this field.
                              </span>
                            )}
                          </>
                        ) : (
                          <p>{currentUser.firstName}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Last Name</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <Form.Control
                              {...register("lastName", {
                                required: true,
                                minLength: 2,
                                pattern: /^([^0-9]*)$/,
                              })}
                              id="lastName"
                              autoComplete="off"
                              value={currentUser.lastName}
                              onChange={handleChange}
                              type="text"
                              required
                              placeholder="Last Name"
                            />
                            {errors.lastName && (
                              <span style={{ color: "crimson" }}>
                                Please fix this field.
                              </span>
                            )}
                          </>
                        ) : (
                          <p>{currentUser.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <Form.Control
                              {...register("phone", {
                                required: true,
                                pattern: /^\d{10}$/,
                              })}
                              id="phone"
                              autoComplete="off"
                              onChange={handleChange}
                              type="text"
                              required
                              value={currentUser.phone}
                              placeholder="Number"
                            />
                            {errors.phone && (
                              <span style={{ color: "crimson" }}>
                                Please fix this field.
                              </span>
                            )}
                          </>
                        ) : (
                          <p>{currentUser.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <Form.Control
                              {...register("email", {
                                required: true,
                                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                              })}
                              id="email"
                              autoComplete="off"
                              onChange={handleChange}
                              type="email"
                              required
                              placeholder="Email"
                              value={currentUser.email}
                            />
                            {errors.email && (
                              <span style={{ color: "crimson" }}>
                                Please fix this field.
                              </span>
                            )}
                          </>
                        ) : (
                          <p>{currentUser.email}</p>
                        )}
                      </div>
                    </div>
                    {edit && <PassModal />}
                  </div>
                </div>
              </div>
            </div>
            {edit &&
              (loading ? (
                <Spinner animation="border" />
              ) : (
                <>
                  <button type="submit" className="save-changes">
                    Save Changes
                  </button>
                  {formError && <p className="fix-profile-form">{formError}</p>}
                </>
              ))}
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
