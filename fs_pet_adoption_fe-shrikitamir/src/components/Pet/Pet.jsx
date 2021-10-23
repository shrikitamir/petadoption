import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useParams } from "react-router";
import { petPage, setStatus, like, unLike, editPet } from "./Pet.api";
import { petType, adoptedStatus, petColor } from "../../lib/formOptions";
import { Card, Button } from "react-bootstrap";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import PetDetails from "./PetDetails";
import PetForm from "./PetForm";
import "./Pet.css";

const Pet = () => {
  const { id: paramsPetId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [colorMsg, setColorMsg] = useState();
  const [adopted, setAdopted] = useState(false);
  const [adoptedByMe, setAdoptedByMe] = useState(false);
  const [fostered, setFostered] = useState(false);
  const [fosteredByMe, setFosteredByMe] = useState(false);
  const [liked, setLiked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [typeSelect, setTypeSelect] = useState();
  const [adoptedSelect, setAdoptedSelect] = useState();
  const [colorSelect, setColorSelect] = useState();
  const [pet, setPet] = useState({
    type: "",
    status: "",
    name: "",
    height: "",
    weight: "",
    color: "",
    hypoallergenic: "",
    dietary: "",
    breed: "",
    bio: "",
    img: "",
    likes: "",
    newImg: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await petPage(paramsPetId);
      const { error } = response;
      if (error) return console.log(error);
      setPet({ ...response.data[0], newImg: response.data[0].img });
      if (response.data.length && currentUser) {
        if (response.data[0].status === "Adopted") {
          setFostered(true);
          if (response.data[0].userId === currentUser.userId)
            setAdoptedByMe(true);
          else setAdopted(true);
        }
        if (response.data[0].status === "Fostered") {
          if (response.data[0].userId === currentUser.userId)
            setFosteredByMe(true);
          else setFostered(true);
        }
        response.data.forEach((e) => {
          if (e.likeUserId === currentUser.userId) {
            setLiked(true);
            return;
          }
        });
        if (currentUser.isAdmin) {
          petType.forEach((e) => {
            if (e.value === response.data[0].type) setTypeSelect(e);
          });
          adoptedStatus.forEach((e) => {
            if (e.value === response.data[0].status) setAdoptedSelect(e);
          });
          petColor.forEach((e) => {
            if (e.value === response.data[0].color) setColorSelect(e);
          });
        }
      }
      setLoading(false);
    })();
  }, [edit, paramsPetId, currentUser]);

  const adoptOrReturn = async () => {
    setAdoptedByMe(!adoptedByMe);
    if (adoptedByMe) {
      try {
        setFostered(false);
        const response = await setStatus(pet.petId, "In Shelter", null);
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
          return;
        }
        setPet((prev) => {
          return { ...prev, status: "In Shelter" };
        });
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        setFostered(true);
        const response = await setStatus(
          pet.petId,
          "Adopted",
          currentUser.userId
        );
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
          return;
        }
        setPet((prev) => {
          return { ...prev, status: "Adopted" };
        });
      } catch (err) {
        return console.log(err);
      }
    }
  };

  const fosterOrUnfoster = async () => {
    setFosteredByMe(!fosteredByMe);
    if (fosteredByMe) {
      try {
        const response = await setStatus(pet.petId, "In Shelter", null);
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
          return;
        }
        setPet((prev) => {
          return { ...prev, status: "In Shelter" };
        });
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        const response = await setStatus(
          pet.petId,
          "Fostered",
          currentUser.userId
        );
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
          return;
        }
        setPet((prev) => {
          return { ...prev, status: "Fostered" };
        });
      } catch (err) {
        return console.log(err);
      }
    }
  };

  const likeToggle = async () => {
    if (!liked) {
      try {
        const response = await like(pet.petId, currentUser.userId);
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
          return;
        }
        setPet((prev) => {
          return { ...prev, likes: pet.likes + 1 };
        });
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        const response = await unLike(pet.petId, currentUser.userId);
        const { error } = response;
        if (error) {
          setColorMsg({ color: "crimson" });
          setMessage(error);
          return;
        }
        setPet((prev) => {
          return { ...prev, likes: pet.likes - 1 };
        });
      } catch (err) {
        return console.log(err);
      }
    }
    setLiked(!liked);
  };

  const saveChanges = async () => {
    setLoadingEdit(true);
    try {
      const response = await editPet(pet.petId, pet);
      const { error } = response;
      if (error) {
        setColorMsg({ color: "crimson" });
        setMessage(error);
        setLoadingEdit(false);
        return;
      }
      if (response.data?.message) {
        setColorMsg({ color: "green" });
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (err) {
      return console.log(err);
    }
    setLoadingEdit(false);
    setEdit(false);
  };

  return (
    <>
      <section className="colored-section">
        <h1 className="pet-title">Pet Page</h1>
      </section>
      <section className="white-section">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Card className="pet-card">
              <img src={pet.img} className="pet-img" alt="pet" />
              <Card.Body>
                {edit ? (
                  <PetForm
                    setPet={setPet}
                    typeSelect={typeSelect}
                    adoptedSelect={adoptedSelect}
                    colorSelect={colorSelect}
                    setLoadingEdit={setLoadingEdit}
                    setColorMsg={setColorMsg}
                    setMessage={setMessage}
                    pet={pet}
                  />
                ) : (
                  <PetDetails pet={pet} />
                )}
              </Card.Body>
              {currentUser && (
                <Card.Footer className="pet-card-footer">
                  {!loadingEdit ? (
                    <>
                      <div className="two-btn-container">
                        {!liked ? (
                          <Button onClick={likeToggle} className="like-button">
                            <AiOutlineLike className="like" /> {pet.likes}
                          </Button>
                        ) : (
                          <Button onClick={likeToggle} className="like-button">
                            <AiFillLike className="like" /> {pet.likes}
                          </Button>
                        )}
                        {currentUser.isAdmin && (
                          <>
                            {edit ? (
                              <Button
                                onClick={saveChanges}
                                className="pet-button pet-button-ml pet-save-changes"
                              >
                                Save Changes
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setEdit(true)}
                                className="pet-button pet-button-ml"
                              >
                                Update
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                      <div className="two-btn-container">
                        {!fostered && (
                          <>
                            {fosteredByMe ? (
                              <Button
                                onClick={fosterOrUnfoster}
                                className="pet-button"
                              >
                                Unfoster
                              </Button>
                            ) : (
                              <Button
                                onClick={fosterOrUnfoster}
                                className="pet-button"
                              >
                                Foster
                              </Button>
                            )}
                          </>
                        )}
                        {!adopted && (
                          <>
                            {adoptedByMe ? (
                              <Button
                                onClick={adoptOrReturn}
                                className="pet-button pet-button-ml"
                              >
                                Return
                              </Button>
                            ) : (
                              <Button
                                onClick={adoptOrReturn}
                                className="pet-button pet-button-ml"
                              >
                                Adopt
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <Spinner animation="border" className="editpet-spinner" />
                  )}
                </Card.Footer>
              )}
            </Card>
            {message && (
              <p style={colorMsg} className="failed-from-server">
                {message}
              </p>
            )}
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Pet;
