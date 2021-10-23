import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const PetDetails = ({ pet }) => {
  return (
    <>
      <Card.Text>BIO</Card.Text>
      <ListGroup className="pet-list">
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Name</div>
          <div className="pet-list-item">{pet.name}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Type</div>
          <div className="pet-list-item">{pet.type}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Adoption Status</div>
          <div className="pet-list-item">{pet.status}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Height</div>
          <div className="pet-list-item">{pet.height}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Weight</div>
          <div className="pet-list-item">{pet.weight}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Color</div>
          <div className="pet-list-item">{pet.color}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Hypoallergenic</div>
          <div className="pet-list-item">
            {pet.hypoallergenic === 1 ? "Yes" : "No"}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Dietary Restriction</div>
          <div className="pet-list-item">{pet.dietary}</div>
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Breed</div>
          <div className="pet-list-item">{pet.breed}</div>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PetDetails;
