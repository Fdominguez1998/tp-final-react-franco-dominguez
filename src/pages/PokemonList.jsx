import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20); // cuantos mostrar inicialmente

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20); // cada vez muestra 20 más
  };

  return (
    <main className="flex-grow-1 container text-center mt-4">
      <h1 className="mb-4">Mi Pokedex</h1>

      {loading && <p>Cargando Pokémon...</p>}
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
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Cargar más
          </button>
        </div>
      )}
    </main>
  );
}

export default PokemonList;
