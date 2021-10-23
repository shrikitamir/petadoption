import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usersList } from "./UsersList.api";
import Loader from "../Loader/Loader";
import "./UsersList.css";

const UsersList = () => {
  const [usersArr, setUsersArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await usersList();
        const { error } = response;
        if (error) return console.log(error);
        if (response.data.length > 0) setUsersArr(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        return console.log(err);
      }
    })();
  }, []);

  return (
    <section className="white-section">
      <h1 className="users-list-header">Users List</h1>
      <div className="list-container">
        {loading ? (
          <Loader />
        ) : (
          usersArr &&
          usersArr.map((user) => (
            <Link
              key={user.userId}
              className="list-link"
              to={`/user/${user.userId}`}
            >
              <ListGroup.Item className="list-item">
                {user.email}
              </ListGroup.Item>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default UsersList;
