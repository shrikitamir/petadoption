import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="white-section">
      <div className="container-fluid">
        <a
          href="https://github.com/shrikitamir"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-github social-icon"></i>
        </a>
        <a
          href="https://www.facebook.com/tamir.shrikiz/"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-facebook-f social-icon"></i>
        </a>
        <a
          href="https://www.instagram.com/tamir_shriki/"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-instagram social-icon"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/tamirsh/"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-linkedin-in social-icon"></i>
        </a>
        <p>© Copyright PetPalace</p>
      </div>
    </footer>
  );
};

export default Footer;
