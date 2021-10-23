import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AppContext } from "../../Context/AppContext";
import { signUp } from "./Sign.api";

const SignUp = () => {
  const { setIsRegistered, isRegistered } = useContext(AppContext);
  const [colorMsg, setColorMsg] = useState();
  const [message, setMessage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (cred) => {
    if (cred.confirmPassword === cred.password) {
      try {
        let firstName =
          cred.firstName[0].toUpperCase() +
          cred.firstName.slice(1).toLowerCase();
        let lastName =
          cred.lastName[0].toUpperCase() + cred.lastName.slice(1).toLowerCase();
        let email = cred.email.toLowerCase();
        cred.firstName = firstName;
        cred.lastName = lastName;
        cred.email = email;
        const response = await signUp(cred);
        const { error } = response;
        if (error) {
          if (error.sqlMessage) return console.log(error.sqlMessage);
          setColorMsg({ color: "crimson" });
          setMessage(error);
        }
        if (response.data?.message) {
          setColorMsg({ color: "green" });
          setMessage(response.data.message);
          setTimeout(() => {
            setIsRegistered(!isRegistered);
          }, 2000);
        }
      } catch (err) {
        return console.log(err);
      }
    } else {
      setColorMsg({ color: "crimson" });
      setMessage("Passwords doesn't match.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        {message && (
          <span className="wrong-combination" style={colorMsg}>
            {message}
          </span>
        )}
        <Form.Label>Email address</Form.Label>
        <Form.Control
          {...register("email", {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          })}
          id="email"
          autoComplete="off"
          type="email"
          placeholder="doggo@dogmail.dog"
        />
        {errors.email && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          {...register("firstName", {
            required: true,
            minLength: 2,
            pattern: /^([^0-9]*)$/,
          })}
          id="firstName"
          maxLength="20"
          autoComplete="off"
          type="text"
          placeholder="Doggo"
        />
        {errors.firstName && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          {...register("lastName", {
            required: true,
            minLength: 2,
            pattern: /^([^0-9]*)$/,
          })}
          id="lastName"
          maxLength="20"
          autoComplete="off"
          type="text"
          placeholder="Doggy"
        />
        {errors.lastName && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          {...register("phone", {
            required: true,
            pattern: /^\d{10}$/,
          })}
          id="phone"
          maxLength="10"
          autoComplete="off"
          type="text"
          placeholder="1234567890"
        />
        {errors.phone && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register("password", { required: true, pattern: /^(?=.{8,})/ })}
          id="password"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="blocking-field" style={{ color: "crimson" }}>
            Please fix this field.
          </span>
        )}
        <Form.Text className="text-muted">
          Passwords must be at least 8 characters.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          {...register("confirmPassword", {
            required: true,
            pattern: /^(?=.{8,})/,
          })}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span style={{ color: "crimson" }}>Please fix this field.</span>
        )}
      </Form.Group>
      <Button className="signin-button" type="submit" variant="primary">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;
