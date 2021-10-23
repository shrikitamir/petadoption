import React from "react";
import manImg from "../../Assets/man-img.png";
import ladyImg from "../../Assets/lady-img.jpg";
import dogImg from "../../Assets/dog-img.jpg";
import dogReview from "../../Assets/dog-review-section.png";
import "./Reviews.css";

const Reviews = () => {
  return (
    <>
      <div>
        <div className="colored-section">
          <ul className="container-fluid review-list">
            <li>
              <img
                src={ladyImg}
                className="img-round"
                alt="review avatar"
                data-edit="false"
                data-editor="field"
              />
              <p className="review-paragraph">
                " I used to by so lonely, but with PetPalace's help, I found the
                love of my life! "
              </p>
              <em>Ariana Menage</em>
            </li>
            <li>
              <img
                src={manImg}
                className="img-round"
                alt="review avatar"
                data-edit="false"
                data-editor="field"
              />
              <p className="review-paragraph">
                " We had a great experience adopting from here, Such wonderful
                staff and amazing at taking care of the pets "
              </p>
              <em>John Smith</em>
            </li>
            <li>
              <img
                src={dogImg}
                className="img-round"
                alt="review avatar"
                data-edit="false"
                data-editor="field"
              />
              <p className="review-paragraph">
                " I've found the best parents in the world. Thank you PetPalace!
                "
              </p>
              <em>Doggy Doggo</em>
            </li>
          </ul>
        </div>
        <div className="colored-section">
          <img className="review-logo" src={dogReview} alt="review-dog-logo" />
        </div>
      </div>
    </>
  );
};

export default Reviews;
