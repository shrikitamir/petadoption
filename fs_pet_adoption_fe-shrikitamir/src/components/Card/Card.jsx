import React from "react";
import { Link } from "react-router-dom";
import { Card as BootstrapCard, Button } from "react-bootstrap";
import "./Card.css";

const Card = ({ img, name, status, id }) => {
  return (
    <BootstrapCard className="card">
      <img src={img} className="pet-card-img" alt="pet" />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{name}</BootstrapCard.Title>
        <BootstrapCard.Text>{status}</BootstrapCard.Text>
        <Link to={`/pet/${id}`}>
          <Button className="card-button">See More</Button>
        </Link>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
