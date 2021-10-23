import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import AddPet from "./AddPet";
import PetsList from "./PetsList";
import UsersList from "./UsersList";
import Footer from "../Footer/Footer";
import "./Admin.css";

const Admin = () => {
  const [dashboard, setDashboard] = useState(1);

  const showAddPet = () => {
    setDashboard(1);
  };

  const showPets = () => {
    setDashboard(2);
  };

  const showUsers = () => {
    setDashboard(3);
  };

  return (
    <>
      <section className="colored-section">
        <h1 className="admin-title">Hello Admin</h1>
        <Dropdown className="dashboard-dropdown">
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Dashboard
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={showAddPet}>Add Pet</Dropdown.Item>
            <Dropdown.Item onClick={showPets}>Pets List</Dropdown.Item>
            <Dropdown.Item onClick={showUsers}>Users List</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>
      {dashboard === 1 && <AddPet />}
      {dashboard === 2 && <PetsList />}
      {dashboard === 3 && <UsersList />}
      <Footer />
    </>
  );
};

export default Admin;
