import React, { useState, useEffect } from "react";
import { Recipe } from "./components/Recipe/Recipe";
import "./App.css";
import Form from "./components/Form/Form";
/* import { MdSend } from "react-icons/md"; */

export function App() {
  const [recipes, setRecipes] = useState([]);
  const [link, setLink] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("meat");
  const [pagination, setPagination] = useState({
    previous: 1,
    next: 10,
  });

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&type=public`
        );
        const data = await response.json();
        setRecipes(data.hits);
        setLink(data._links.next.href);
      } catch (error) {
        alert(error);
      }
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
  const callMoreRecipes = () => {
    if (recipes) {
      if (next >= recipes.length - 10 && link !== undefined) {
        console.log("la llamada entra");
        const getMoreRecipes = async () => {
          const response = await fetch(link);
          if (response.status === 200) {
            const data = await response.json();
            if (data.hits) {
              const newRecipes = [...recipes, ...data.hits];
              setRecipes(newRecipes);
              setLink(data._links.next.href);
            }
          }
        };
        getMoreRecipes();
      }
    }
  };
  const handlePagination = (e) => {
    e.preventDefault();
    /*  hacer que solo sume next cuando la response es 200 */
    if (e.target.innerText === "NEXT") {
      setPagination({ previous: previous + 10, next: next + 10 });
      if (next >= recipes.length - 10) {
        console.log(next);
        console.log(recipes.length);
        callMoreRecipes();
      }
      return;
    }
    if (e.target.innerText === "PREVIOUS" && previous >= 0) {
      setPagination({ previous: previous - 10, next: next - 10 });
      return;
    }
  };
  const { previous, next } = pagination;
  return (
    <div className="App">
      <Form search={search} getSearch={getSearch} handleSearch={handleSearch} />
      <div className="page">
        <p className="p">{`Recipes ${previous} - ${next}`}</p>
      </div>
      <div className="pagination">
        <div className="previous" onClick={handlePagination}>
          {previous >= 10 ? "PREVIOUS" : null}
        </div>
        <div className="next" onClick={handlePagination}>
          NEXT
        </div>
      </div>
      <div className="recipes">
        {recipes ? (
          // eslint-disable-next-line array-callback-return
          recipes.map((recipe, index) => {
            if (index > previous && index <= next + 1) {
              return (
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
              );
            }
          })
        ) : (
          <h1>Wait a minute and try again please.</h1>
        )}
      </div>
      <div className="pagination">
        <div className="previous" onClick={handlePagination}>
          {previous >= 10 ? "PREVIOUS" : null}
        </div>
        <div className="next" onClick={handlePagination}>
          NEXT
        </div>
      </div>
    </div>
  );
}
