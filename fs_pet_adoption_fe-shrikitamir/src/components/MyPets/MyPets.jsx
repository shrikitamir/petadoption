import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { myPets } from "./MyPets.api";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import noOwnFosterImg from "../../Assets/no-foster-own-pic.png";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import "./MyPets.css";

const MyPets = () => {
  const { currentUser } = useContext(UserContext);
  const [ownOrSaved, setOwnOrSaved] = useState(false);
  const [ownFoster, setOwnFoster] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await myPets(currentUser.userId);
        const { error } = response;
        if (error) return console.log(error);
        setOwnFoster(response[1].data);
        setSaved(response[0].data);
      } catch (err) {
        return console.log(err);
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="colored-section">
        <h1 className="mypets-title">Your Pets</h1>
      </section>
      <section className="white-section mypets-section">
        <BootstrapSwitchButton
          className="switch-button"
          width={110}
          checked={ownOrSaved}
          onlabel="Saved Pets"
          offlabel="Owned Pets"
          onChange={() => setOwnOrSaved(!ownOrSaved)}
        />
        {ownOrSaved ? (
          <>
            {saved.length > 0 ? (
              <div className="cards-area">
                {saved.map((result) => (
                  <Card
                    key={result.petId}
                    id={result.petId}
                    img={result.img}
                    name={result.name}
                    status={result.status}
                  />
                ))}
              </div>
            ) : (
              <>
                <h1>no saved pets.</h1>
                <img src={noOwnFosterImg} alt="no-saved-pets" />
              </>
            )}
          </>
        ) : (
          <>
            {ownFoster.length > 0 ? (
              <div className="cards-area">
                {ownFoster.map((result) => (
                  <Card
                    key={result.petId}
                    id={result.petId}
                    img={result.img}
                    name={result.name}
                    status={result.status}
                  />
                ))}
              </div>
            ) : (
              <>
                <h1>No owned or fostered pets.</h1>
                <img src={noOwnFosterImg} alt="no-own-foster" />
              </>
            )}
          </>
        )}
      </section>
      <Footer className="mypets-footer" />
    </>
  );
};

export default MyPets;
