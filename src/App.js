import React, { useState, useEffect } from "react";
import { Recipe } from "./components/Recipe";
import "./App.css";

export function App() {
  const APP_ID = "d00025be";
  const APP_KEY = "1c102e662dd5e7860c98abded7349dac";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("meet");

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Insert a recipe to search..."
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.uri}
              title={recipe.recipe.label}
              calories={Math.round(recipe.recipe.calories)}
              imgUrl={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              url={recipe.recipe.url}
            />
          ))
        ) : (
          <h1>Wait a minute and try again please.</h1>
        )}
      </div>
    </div>
  );
}
