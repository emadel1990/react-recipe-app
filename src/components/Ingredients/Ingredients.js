import React, { useState } from "react";
import "./ingredients.css";
import { Collapsible, CollapsibleItem } from "react-materialize";

const Ingredients = ({ ingredients }) => {
  const [isExp, setExp] = useState(false);
  return (
    <div className="ingredients">
      <ol className="ol">
        {ingredients.map((ingredient, idx) =>
          idx < 4 ? (
            <li key={idx} className="li">
              {ingredient.text}
            </li>
          ) : null
        )}
        {ingredients.length > 5 ? (
          <Collapsible>
            <CollapsibleItem
              className="collapsible-component noselect"
              expanded={isExp}
              header={
                !isExp ? (
                  <p className="show-text">Show more...</p>
                ) : (
                  <p className="show-text">Show less...</p>
                )
              }
              onClick={() => setExp(!isExp)}
            >
              <ol start="5">
                {" "}
                {ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient.text}</li>
                ))}
              </ol>
            </CollapsibleItem>
          </Collapsible>
        ) : null}
      </ol>
    </div>
  );
};

export default Ingredients;
