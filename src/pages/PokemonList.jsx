import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(detailedData);
      } catch (err) {
        setError("Error al cargar los Pokémon 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Mi Pokedex</h1>

      {loading && <p>Cargando Pokémon...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemonData={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
