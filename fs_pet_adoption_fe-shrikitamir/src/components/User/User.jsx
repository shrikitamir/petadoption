import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserDetails } from "./User.api.js";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import "./User.css";

const User = () => {
  const { id: paramsUserId } = useParams();
  const [petsOwned, setPetsOwned] = useState([]);
  const [user, setUser] = useState({
    bio: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    img: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserDetails(paramsUserId);
        const { error } = response;
        if (error) return console.log(error);
        setPetsOwned(response[1].data);
        if (response[0].data.length) {
          setUser(response[0].data[0]);
        }
      } catch (err) {
        return console.log(err);
      }
    })();
  }, [paramsUserId]);

  return (
    <>
      <section className="colored-section">
        <h1 className="user-title">User Page</h1>
      </section>
      <section className="white-section">
        <div className="white-section profile-section">
          <div className="container profile">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={user.img} alt="profile-pic" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>
                    {user.firstName} {user.lastName}
                  </h5>
                  <h6>Phone: {user.phone}</h6>
                  <p className="profile-email">
                    Email : <span>{user.email}</span>
                  </p>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <p className="nav-link active">About</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <h5>Short bio</h5>
                  <p>{user.bio}</p>
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
                        <p>{user.firstName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Last Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.lastName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.phone}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-cards-area">
          {petsOwned.length === 0 ? (
            <h1 className="pets-owned-title">This user has no pets.</h1>
          ) : (
            <>
              <h1 className="pets-owned-title">Pets owned by user</h1>
              {petsOwned.map((result) => (
                <Card
                  key={result.petId}
                  id={result.petId}
                  img={result.img}
                  name={result.name}
                  status={result.status}
                />
              ))}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default User;
