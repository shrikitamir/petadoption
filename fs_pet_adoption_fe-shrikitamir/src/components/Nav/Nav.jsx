import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Navbar } from "react-bootstrap";
import logo from "../../Assets/PetPalace-logo.png";
import SignInModal from "../SignIn/SignInModal";
import localForage from "localforage";
import "./Nav.css";

const Nav = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);

  const logOut = async () => {
    await localForage.setItem("token", null);
    setCurrentUser(null);
  };

  return (
    <nav>
      <Navbar className="navbar justify-content-between d-flex">
        <NavLink className="nav-item" to="/">
          <Navbar.Brand>
            <img className="pet-palace-logo" src={logo} alt="PetPalace-logo" />
          </Navbar.Brand>
        </NavLink>
        <div>
          {currentUser ? (
            <>
              {currentUser.isAdmin && (
                <NavLink className="nav-item" to="/admin">
                  <p>Admin</p>
                </NavLink>
              )}
              <NavLink className="nav-item" to="/mypets">
                <p>My Pets</p>
              </NavLink>
              <NavLink className="nav-item" to="/profile">
                <p>Profile</p>
              </NavLink>
              <NavLink className="nav-item" to="/search">
                <p>Search</p>
              </NavLink>
              <div onClick={logOut} className="nav-item">
                <p>Logout</p>
              </div>
            </>
          ) : (
            <>
              <NavLink className="nav-item" to="/search">
                <p>Search</p>
              </NavLink>
              <SignInModal />
            </>
          )}
        </div>
      </Navbar>
    </nav>
  );
};

export default Nav;
