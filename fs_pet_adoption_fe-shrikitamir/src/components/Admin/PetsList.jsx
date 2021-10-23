import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { petsList } from "./PetsList.api";
import Loader from "../Loader/Loader";
import "./PetsList.css";

const PetsList = () => {
  const [petsArr, setPetsArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await petsList();
        const { error } = response;
        if (error) return console.log(error);
        if (response.data.length > 0) setPetsArr(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        return console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <section className="white-section">
        <h1 className="pets-list-header">Pets List</h1>
        <div className="list-container">
          <ListGroup>
            {loading ? (
              <Loader />
            ) : petsArr.length !== 0 ? (
              petsArr.map((pet) => (
                <Link
                  key={pet.petId}
                  className="list-link"
                  to={`/pet/${pet.petId}`}
                >
                  <ListGroup.Item className="list-item">
                    {pet.name} ({pet.type})
                  </ListGroup.Item>
                </Link>
              ))
            ) : (
              <h1 className="no-pets-list">Theres no pets to show.</h1>
            )}
          </ListGroup>
        </div>
      </section>
    </>
  );
};

export default PetsList;
