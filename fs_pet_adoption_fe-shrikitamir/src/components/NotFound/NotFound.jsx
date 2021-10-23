import React from "react";
import { Link } from "react-router-dom";
import notFoundDog from "../../Assets/not-found-dog.png";
import Footer from "../Footer/Footer";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <div className="colored-section">
        <h1 className="title-404">Sorry</h1>
      </div>
      <div className="white-section">
        <h1 className="subtitle-404">We couldn't find that page.</h1>
        <h2 className="go-back-404">
          Go back to
          <Link className="link-404" to="/">
            {" "}
            PetPalace Homepage.
          </Link>
        </h2>
        <img src={notFoundDog} alt="404-dog" />
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
