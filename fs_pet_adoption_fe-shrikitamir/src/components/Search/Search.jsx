import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { petType, adoptedStatus } from "../../lib/formOptions";
import { searchPets } from "./Search.api";
import { Button } from "react-bootstrap";
import noMatchImg from "../../Assets/no-matching-results.png";
import Loader from "../../components/Loader/Loader";
import Select from "react-select";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import "./Search.css";

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const [advanced, setAdvanced] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [search, setSearch] = useState({
    type: "",
    status: "",
    name: "",
    maxheight: "",
    maxweight: "",
  });

  useEffect(() => {
    if (location.search.length > 1) {
      (async () => {
        try {
          setSubmitted(true);
          setLoading(true);
          const response = await searchPets(location.search);
          const { error } = response;
          if (error) return console.log(error);
          setSearchResults(response.data);
        } catch (err) {
          return console.log(err);
        }
      })();
    }
    setLoading(false);
  }, [location.search]);

  const selectChange = (e) => {
    setSearch((prev) => {
      return { ...prev, [e.name]: e.value };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitted(true);
      setLoading(true);
      const searchQuery = {};
      if (search.type) searchQuery.type = search.type;
      if (search.status) searchQuery.status = search.status;
      if (search.name) searchQuery.name = search.name;
      if (search.maxheight) searchQuery.maxheight = search.maxheight;
      if (search.maxweight) searchQuery.maxweight = search.maxweight;
      const query = "?" + new URLSearchParams(searchQuery).toString();
      history.push({
        pathname: "/search",
        search: query,
      });
      const response = await searchPets(query);
      const { error } = response;
      if (error) return console.log(error);
      setSearchResults(response.data);
      setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <>
      <div className="colored-section">
        <h1 className="search-title">Search to find your best friend.</h1>
        <form className="search-form">
          <label>Pet Type</label>
          <Select
            onChange={selectChange}
            placeholder="Pet Type"
            name="type"
            options={petType}
            className="form-field"
          />
          {advanced && (
            <>
              <label>Adoption Status</label>
              <Select
                placeholder="Adoption Status"
                onChange={selectChange}
                name="status"
                className="form-field"
                options={adoptedStatus}
              />
              <label>Name</label>
              <input
                className="form-field advanced-field-input"
                onChange={handleChange}
                autoComplete="off"
                name="name"
                maxLength="20"
                type="text"
                placeholder="Pet Name"
              />
              <label className="number-label">Max Height (CM)</label>
              <input
                className="form-field advanced-field-input number-field"
                type="number"
                min="0"
                onChange={handleChange}
                name="maxheight"
                placeholder="Max Height (CM)"
              />
              <label className="number-label">Max Weight (KG)</label>
              <input
                className="form-field advanced-field-input number-field"
                type="number"
                min="0"
                onChange={handleChange}
                name="maxweight"
                placeholder="Max Weight (KG)"
              />
            </>
          )}
          <p
            className="is-registered advanced"
            onClick={() => setAdvanced(!advanced)}
          >
            Advanced Search
          </p>
          <div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="search-button"
            >
              Find Pet
            </Button>
          </div>
        </form>
      </div>
      {submitted && (
        <section className="white-section search-result">
          {loading ? (
            <Loader className="addpet-loader" animation="border" />
          ) : searchResults && searchResults.length === 0 ? (
            <>
              <h1 className="no-matching-results">
                Sorry, No matching results.
              </h1>
              <img src={noMatchImg} alt="no-matching-results" />
            </>
          ) : (
            <>
              {searchResults &&
                searchResults.map((result) => (
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
        </section>
      )}
      <Footer />
    </>
  );
};
export default Search;
