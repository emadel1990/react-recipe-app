import React from "react";
import "./recipe.css";

export function Recipe({ title, calories, imgUrl, ingredients, url }) {
  return (
    <div className="recipe">
      <img className="image" src={imgUrl} alt=""></img>
      <h1 className="title">{title}</h1>
      <ol className="ol">
        {ingredients.map((ingredient, idx) => (
          <li className="li" key={idx}>
            {ingredient.text}
          </li>
        ))}
      </ol>
      <p className="calories">Calories = {calories}</p>
      <a className="url" href={url}>
        👨‍🍳How to prepare
      </a>
    </div>
  );
}
