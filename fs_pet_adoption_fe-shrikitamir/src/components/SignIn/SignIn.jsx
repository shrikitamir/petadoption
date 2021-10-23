import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/UserContext";
import { login } from "./Sign.api";
import localForage from "localforage";
import axios from "axios";

const SignIn = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [wrong, setWrong] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (cred) => {
    try {
      const response = await login(cred);
      const { error } = response;
      if (error) {
        if (error.sqlMessage) return console.log(error.sqlMessage);
        setWrong(error);
        return;
      }
      if (response.data.user) {
        const { email, firstName, lastName, phone, bio, isAdmin, userId, img } =
          response.data.user;
        let admin = false;
        if (isAdmin === 1) {
          admin = true;
        }
        setCurrentUser({
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          bio: bio,
          userId: userId,
          img: img,
          isAdmin: admin,
        });
        await localForage.setItem("token", response.data.token);
        const token = await localForage.getItem("token");
        axios.defaults.headers.common["authorization"] = token;
        <Redirect to="/" />;
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        {wrong && (
          <span className="wrong-combination" style={{ color: "crimson" }}>
            {wrong}
          </span>
        )}
        <Form.Label className="blocking-field">Email address</Form.Label>
        <Form.Control
          {...register("email", {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          })}
          id="email"
          autoComplete="off"
          type="email"
          placeholder="Enter email"
        />
        {errors.email && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register("password", {
            required: true,
            pattern: /^(?=.{8,})/,
          })}
          id="password"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Button className="signin-button" type="submit" variant="primary">
        Sign In
      </Button>
    </Form>
  );
};

export default SignIn;
