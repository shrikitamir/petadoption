import React from "react";
import { ListGroup } from "react-bootstrap";
import { uploadImage } from "../../../src/lib/upload.api";
import { petType, petColor, adoptedStatus } from "../../lib/formOptions";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Select from "react-select";

const PetForm = (props) => {
  const {
    setLoadingEdit,
    setColorMsg,
    setMessage,
    setPet,
    typeSelect,
    adoptedSelect,
    colorSelect,
    pet,
  } = props;
  const handleFileInput = async (e) => {
    setLoadingEdit(true);
    const response = await uploadImage(e.target.files[0]);
    const { error } = response;
    if (error) {
      setColorMsg({ color: "crimson" });
      setMessage(error);
      return;
    }
    setPet((prev) => {
      return { ...prev, newImg: response.data, img: response.data };
    });
    setLoadingEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const selectChange = (e) => {
    const { name, value } = e;
    setPet((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <textarea
        onChange={handleChange}
        maxLength="85"
        className="advanced-field-input pet-page-bio"
        name="bio"
        value={pet.bio}
        type="text"
        placeholder="Pet Bio (Max 85 Letters)"
      />

      <ListGroup className="pet-list">
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">
            Name
            <span className="field-instructions">(2-20 Characters)</span>
          </div>
          <input
            className="pet-edit-input"
            autoComplete="off"
            placeholder="Name"
            value={pet.name}
            name="name"
            required
            onChange={handleChange}
            type="text"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Type</div>
          <Select
            onChange={selectChange}
            placeholder="Pet Type"
            name="type"
            required
            options={petType}
            defaultValue={typeSelect}
            className="basic-multi-select pet-select"
            classNamePrefix="select"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Adoption Status</div>
          <Select
            placeholder="Adoption Status"
            onChange={selectChange}
            name="status"
            required
            defaultValue={adoptedSelect}
            className="pet-select"
            options={adoptedStatus}
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">
            Height
            <span className="field-instructions">(1-3 Digits)</span>
          </div>
          <input
            className="pet-edit-input"
            type="number"
            onChange={handleChange}
            name="height"
            min="0"
            required
            value={pet.height}
            autoComplete="off"
            placeholder="Height (CM)"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">
            Weight
            <span className="field-instructions">(1-3 Digits)</span>
          </div>
          <input
            className="pet-edit-input"
            type="number"
            required
            min="0"
            autoComplete="off"
            onChange={handleChange}
            name="weight"
            value={pet.weight}
            placeholder="Weight (KG)"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Color</div>
          <Select
            onChange={selectChange}
            placeholder="Color"
            name="color"
            required
            defaultValue={colorSelect}
            options={petColor}
            className="pet-select"
            classNamePrefix="select"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Hypoallergenic</div>
          <BootstrapSwitchButton
            width={25}
            onlabel="V"
            required
            offlabel="X"
            checked={pet.hypoallergenic === 0 ? false : true}
            onChange={() => {
              pet.hypoallergenic === 1
                ? setPet((prev) => {
                    return {
                      ...prev,
                      hypoallergenic: 0,
                    };
                  })
                : setPet((prev) => {
                    return {
                      ...prev,
                      hypoallergenic: 1,
                    };
                  });
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">
            Dietary Restriction
            <span className="field-instructions">(2-50 Characters)</span>
          </div>
          <input
            className="pet-edit-input"
            autoComplete="off"
            placeholder="Dietary Restrictions"
            name="dietary"
            required
            onChange={handleChange}
            value={pet.dietary}
            type="text"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">
            Breed
            <span className="field-instructions">(2-20 Characters)</span>
          </div>
          <input
            className="pet-edit-input"
            autoComplete="off"
            placeholder="Breed"
            required
            name="breed"
            onChange={handleChange}
            value={pet.breed}
            type="text"
          />
        </ListGroup.Item>
        <ListGroup.Item className="pet-list-item">
          <div className="pet-list-item">Pet Picture</div>
          <input
            className="pet-edit-input pet-file-input"
            name="petimg"
            type="file"
            onChange={(e) => handleFileInput(e)}
          />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default PetForm;
