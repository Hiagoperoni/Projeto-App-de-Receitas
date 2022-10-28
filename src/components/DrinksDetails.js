import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function DrinksDetails(props) {
  const { id } = props;

  const [details, setDetails] = useState({});
  const [mealsList, setmealsList] = useState([]);
  const [scrollIndex, setScrollIndex] = useState([0, 1]);

  const buscarAPIReceitasDetails = async (valorDeBusca) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${valorDeBusca}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const { drinks } = data;
    return setDetails(drinks[0]);
  };

  const buscarAPIMeals = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const data = await response.json();
    const { meals } = data;
    const LAST_INDEX = 6;
    setmealsList(meals.slice(0, LAST_INDEX));
  };

  const fetchInfo = (drinksId) => {
    buscarAPIReceitasDetails(drinksId);
    buscarAPIMeals();
  };
  const nextSuggestion = () => {
    const INDEX_3 = 3;
    const INDEX_4 = 4;
    const INDEX_5 = 5;
    if (scrollIndex[0] === 0) {
      setScrollIndex([2, INDEX_3]);
    }
    if (scrollIndex[0] === 2) {
      setScrollIndex([INDEX_4, INDEX_5]);
    }
    if (scrollIndex[0] === INDEX_4) {
      setScrollIndex([0, 1]);
    }
  };

  useEffect(() => {
    fetchInfo(id);
  }, []);
  console.log(mealsList);

  const resultadoDaReceita = Object.entries(details);
  const arrayIngredientes = resultadoDaReceita
    .filter((cadaChave) => cadaChave[0].includes('ngredient') && cadaChave[1]);

  const arrayMedidas = resultadoDaReceita
    .filter((cadaChave) => cadaChave[0].includes('Measure') && cadaChave[1]);
  const arrayDeIngredientesEMedidas = [];

  arrayIngredientes.forEach((e, i) => {
    arrayDeIngredientesEMedidas.push([e[1], arrayMedidas[i][1]]);
  });
  console.log(mealsList);
  return (

    <div className="recipe-details">
      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
      />
      <h1 data-testid="recipe-title">{details.strDrink}</h1>
      <p data-testid="recipe-category">
        {details.strAlcoholic}
      </p>
      {
        arrayDeIngredientesEMedidas.map((e, i) => (
          <p
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ e[0] }
          >
            {`${e[0]} ${e[1]}` }
          </p>
        ))
      }
      <p data-testid="instructions">{details.strInstructions}</p>
      <p>Recommended</p>
      <div
        className="recommendation-box"
      >
        {mealsList.map((r, i) => (
          <div
            className="recommendation-card"
            data-testid={ `${i}-recommendation-card` }
            key={ i }
            style={ { visibility: scrollIndex.includes(i) ? 'visible' : 'hidden' } }
          >
            <img src={ r.strMealThumb } alt={ r.strMeal } />
            <p data-testid={ `${i}-recommendation-title` }>
              { r.strMeal }
            </p>
          </div>
        ))}
        <button type="button" onClick={ nextSuggestion }>next</button>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

DrinksDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinksDetails;
