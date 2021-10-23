import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Modal } from "react-bootstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./SignInModal.css";

const SignInModal = () => {
  const { setIsRegistered, isRegistered } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="nav-item" onClick={handleShow}>
        Login
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Login to PetPalace!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{isRegistered ? <SignIn /> : <SignUp />}</Modal.Body>
        <Modal.Footer className="modal-footer">
          <p
            className="is-registered"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered ? "Not a user? Sign up!" : "Already a user? Sign in!"}
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignInModal;
