import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pokemons"); // te lleva a la lista de Pokémon
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 mb-3">Welcome to my Pokedex</h1>
      <p className="lead mb-4">Here you can find all you favorites Pokemons</p>
      <button className="btn btn-primary btn-lg" onClick={handleClick}>
        Ver Pokémon
      </button>
    </div>
  );
}

export default Home;
