import React from 'react';
import style from './recipe.module.css';

export function Recipe({title, calories, imgUrl, ingredients}) {
    return (
       
            <div className={style.recipe}>
                <img className={style.image} src={imgUrl} alt=""></img>
                <h1 className={style.title}>{title}</h1>
                <ol className={style.ol}>
                    {ingredients.map((ingredient, idx)=>(
                        <li className={style.li} key={idx} >{ingredient.text}</li>
                    ))}
                </ol>
                <p className={style.calories}>Calories = {calories}</p>
               
                
            </div>
       
    )
}
