import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { changePass } from "./Profile.api";
import { Modal, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const PassModal = () => {
  const { currentUser } = useContext(UserContext);
  const [colorMsg, setColorMsg] = useState();
  const [message, setMessage] = useState();
  const [pass, setPass] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePass = (e) => {
    const { name, value } = e.target;
    setPass((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlePassChange = async () => {
    if (pass.newPass === pass.confirmNewPass) {
      try {
        const response = await changePass({
          ...pass,
          userId: currentUser.userId,
        });
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
        }
        if (response.data?.message) {
          setColorMsg({ color: "green" });
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage("");
          }, 3500);
        }
      } catch (err) {
        return console.log(err);
      }
    } else {
      setColorMsg({ color: "crimson" });
      setMessage("Passwords do not match");
    }
  };

  return (
    <>
      <p className="change-password-btn" onClick={handleShow}>
        Change Password
      </p>
      <Modal className="change-password" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                name="oldPass"
                onChange={handlePass}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="newPass"
                onChange={handlePass}
                type="password"
                placeholder="Password"
              />
              <Form.Text className="text-muted">
                Passwords must be at least 8 characters.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                name="confirmNewPass"
                type="password"
                onChange={handlePass}
                placeholder="Password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            className="change-btn"
            type="submit"
            variant="primary"
            onClick={handlePassChange}
          >
            Change
          </Button>
          {message && (
            <p style={colorMsg} className="server-msg">
              {message}
            </p>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PassModal;
