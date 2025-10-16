import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1025"
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
        setError("Error loading Pokémons 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 30);
  };

  return (
    <main className="flex-grow-1 container text-center mt-4">
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }} // ocupa casi toda la pantalla
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "5rem", height: "5rem" }} // más grande
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {pokemons.slice(0, visibleCount).map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/perfil/${pokemon.name}`}
            className="text-decoration-none"
          >
            <PokemonCard pokemonData={pokemon} />
          </Link>
        ))}
      </div>

      {visibleCount < pokemons.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary btn-lg shadow"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default PokemonList;
