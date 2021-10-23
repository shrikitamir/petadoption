import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import titleImg from "./../../Assets/pet-main-image.png";
import Typed from "react-typed";
import "./Title.css";

const Title = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <section className="colored-section">
      <div className="container-fluid" id="titleSection">
        <div className="row">
          <div className="col-lg-6 col-l-3">
            {currentUser ? (
              <Typed
                strings={[
                  `Hey ${currentUser.firstName} ${currentUser.lastName} Welcome To PetPalace!`,
                ]}
                typeSpeed={60}
                className="typed-string"
              />
            ) : (
              <Typed
                strings={[
                  "Welcome To PetPalace!",
                  "Ready to meet your new best friend?",
                ]}
                typeSpeed={60}
                className="typed-string"
              />
            )}
            <h1 className="big-heading">
              Search to find your new best friend.
            </h1>
          </div>
          <div className="col-lg-6">
            <img className="title-image" src={titleImg} alt="title img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;
