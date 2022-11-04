import React from 'react';
import Header from './Header';
import manutencao from '../images/manutenção.png';

function DoneRecipes() {
  return (
    <div className="doneRecipes">
      <Header titulo="Done Recipes" pesquisa="false" />
      <h1>Em Manutenção!</h1>
      <img src={ manutencao } alt="manutencao" className="manutencao" />
    </div>
  );
}

export default DoneRecipes;
