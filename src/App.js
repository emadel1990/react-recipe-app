import React, { useState, useEffect } from "react";
import { Recipe } from "./components/Recipe/Recipe";
import "./App.css";
import { Button, Icon } from "react-materialize";

export function App() {
  const APP_ID = "d00025be";
  const APP_KEY = "1c102e662dd5e7860c98abded7349dac";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("meat");
  /* const [pagination, setPagination] = useState([]); */

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2/?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public`
      );
      const data = await response.json();
      setRecipes(data.hits);
      /* setPagination([...pagination, data._links.next.href]);
      console.log(pagination); */
    };
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setQuery(search);
      setSearch("");
    }
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={() => handleSearch}
          placeholder="Insert a recipe to search..."
        ></input>
        <Button node="button" type="submit" waves="light">
          Search
          <Icon right>send</Icon>
        </Button>
      </form>
      <div className="recipes">
        {recipes ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.uri}
              title={recipe.recipe.label}
              imgUrl={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              url={recipe.recipe.url}
              nutrients={recipe.recipe.digest}
              serves={recipe.recipe.yield}
              kcal={parseFloat(recipe.recipe.calories).toFixed(0)}
            />
          ))
        ) : (
          <h1>Wait a minute and try again please.</h1>
        )}
      </div>
    </div>
  );
}
