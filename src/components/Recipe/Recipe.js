import React from "react";
import Ingredients from "../Ingredients/Ingredients";
import "./recipe.css";

export function Recipe({
  title,
  imgUrl,
  ingredients,
  url,
  nutrients,
  serves,
  kcal,
}) {
  return (
    <div className="recipe">
      <img className="image" src={imgUrl} alt=""></img>
      <div className="information">
        <div className="header-info">
          <p className="serves">{`Serves ${serves}`}</p>
          <p className="kcal">{`${kcal} Kcal`}</p>
        </div>
        <div className="information-nut">
          <p className="protein-circle"></p>
          <p>{`Protein: ${parseFloat(nutrients[2].total).toFixed(2)}g`}</p>
        </div>
        <div className="information-nut">
          <p className="carbs-circle"></p>
          <p>{`Carbs: ${parseFloat(nutrients[1].total).toFixed(2)}g`}</p>
        </div>
        <div className="information-nut">
          <p className="fat-circle"></p>
          <p>{`Fat: ${parseFloat(nutrients[0].total).toFixed(2)} g`}</p>
        </div>
      </div>
      <h1 className="title">{title}</h1>
      <Ingredients ingredients={ingredients} />

      <a className="url" href={url} rel="noopener noreferrer" target="_blank">
        👨‍🍳 How to prepare
      </a>
    </div>
  );
}
