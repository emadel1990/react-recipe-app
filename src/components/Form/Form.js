import React from "react";
import "./form.css";
import { Button, Icon } from "react-materialize";

const Form = ({ getSearch, search, handleSearch }) => {
  return (
    <form onSubmit={getSearch} className="search-form">
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Insert a recipe to search..."
      ></input>
      <Button node="button" type="submit" waves="light">
        Search
        <Icon right>send</Icon>
      </Button>
    </form>
  );
};

export default Form;
