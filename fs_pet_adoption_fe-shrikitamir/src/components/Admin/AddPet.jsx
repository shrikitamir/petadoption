import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { addPet } from "./AddPet.api";
import { uploadImage } from "../../../src/lib/upload.api";
import { petType, petColor } from "../../lib/formOptions";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import "./AddPet.css";

const AddPet = () => {
  const [loading, setLoading] = useState(false);
  const [colorMsg, setColorMsg] = useState();
  const [message, setMessage] = useState();
  const [pet, setPet] = useState({
    type: "Dog",
    name: "",
    height: "",
    weight: "",
    color: "White",
    hypoallergenic: false,
    dietary: "",
    breed: "",
    bio: "",
    img: "",
  });

  const selectChange = (e) => {
    const { name, value } = e;
    setPet((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const checkboxChange = (e) => {
    const checked = e.target.checked;
    setPet((prev) => {
      return { ...prev, hypoallergenic: checked };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileInput = async (e) => {
    setLoading(true);
    const response = await uploadImage(e.target.files[0]);
    const { error } = response;
    if (error) return console.log(error);
    setPet((prev) => {
      return { ...prev, img: response.data };
    });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addPet(pet);
      const { error } = response;
      if (error) {
        if (error.sqlMessage) return console.log(error.sqlMessage);
        setColorMsg({ color: "red" });
        setMessage(error);
        setLoading(false);
      }
      if (response.data?.message) {
        document.querySelector("#addPetForm").reset();
        setPet((prev) => {
          return { ...prev, img: "" };
        });
        setColorMsg({ color: "green" });
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setLoading(false);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <section className="white-section">
      <div className="add-pet-container">
        <h1 className="add-pet-title">Add Pet</h1>
        <form onSubmit={handleSubmit} id="addPetForm" className="search-form">
          <label>Pet Type</label>
          <Select
            onChange={selectChange}
            placeholder="Pet Type"
            name="type"
            defaultValue={petType[0]}
            options={petType}
            className="form-field basic-multi-select"
            classNamePrefix="select"
          />
          <label>Name</label>
          <input
            className="form-field advanced-field-input no-margin-field"
            type="text"
            required
            maxLength="20"
            autoComplete="off"
            onChange={handleChange}
            name="name"
            placeholder="Pet Name"
          />
          <span className="max-value-form">2-20 Characters</span>
          <label>Color</label>
          <Select
            onChange={selectChange}
            placeholder="Color"
            name="color"
            defaultValue={petColor[0]}
            options={petColor}
            className="form-field basic-multi-select"
            classNamePrefix="select"
          />
          <label className="number-field">Height</label>
          <input
            className="form-field advanced-field-input number-field no-margin-field"
            type="number"
            name="height"
            max="200"
            min="0"
            required
            autoComplete="off"
            onChange={handleChange}
            placeholder="Height (CM)"
          />
          <span className="max-value-form">Max Height is 200CM</span>
          <label className="number-field">Weight</label>
          <input
            className="form-field advanced-field-input number-field no-margin-field"
            type="number"
            required
            max="100"
            min="0"
            autoComplete="off"
            name="weight"
            onChange={handleChange}
            placeholder="Weight (KG)"
          />
          <span className="max-value-form">Max Weight is 100KG</span>
          <label>Dietary Restriction</label>
          <input
            className="form-field advanced-field-input"
            type="text"
            required
            maxLength="50"
            autoComplete="off"
            name="dietary"
            onChange={handleChange}
            placeholder="Dietary Restriction"
          />
          <label>Breed of Animal</label>
          <input
            className="form-field advanced-field-input last-input no-margin-field"
            type="text"
            required
            maxLength="20"
            autoComplete="off"
            name="breed"
            onChange={handleChange}
            placeholder="Breed"
          />
          <span className="max-value-form">2-20 Characters</span>
          <label>Short Bio</label>
          <textarea
            onChange={handleChange}
            maxLength="85"
            className="form-field advanced-field-input pet-bio"
            name="bio"
            required
            type="text"
            placeholder="Pet Bio (Max 85 Letters)"
          />
          <label className="file-label">Pet Picture</label>
          <input
            onChange={(e) => handleFileInput(e)}
            className="form-field advanced-field-input"
            type="file"
          />
          <div className="checkbox-container">
            <input
              onChange={checkboxChange}
              name="hypoallergenic"
              type="checkbox"
            />
            <label className="addpet-last-label">Hypoallergenic</label>
          </div>
          {loading ? (
            <Spinner className="addpet-loader" animation="border" />
          ) : (
            <Button className="addpet-button" type="submit">
              Add Pet
            </Button>
          )}
          {message && (
            <span className="pet-message" style={colorMsg}>
              {message}
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default AddPet;
