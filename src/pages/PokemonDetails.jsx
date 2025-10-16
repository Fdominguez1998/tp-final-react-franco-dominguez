import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null); // Para descripción
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Petición al Pokémon
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!response.ok) throw new Error("No se encontró el Pokémon");
        const data = await response.json();
        setPokemon(data);

        // Petición a la especie para obtener descripción
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
        );
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  if (loading) return <p className="text-center mt-5">Cargando Pokémon...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 container mt-4">
        <h1 className="mb-4 text-capitalize">{pokemon.name}</h1>

        <div className="row">
          {/* Columna izquierda: Imagen */}
          <div className="col-md-4 text-center mb-4">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{
                width: "150px",
                height: "150px",
                imageRendering: "pixelated",
              }}
            />
            <h5 className="mt-3">Tipos:</h5>
            <div>
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="badge bg-primary mx-1 text-capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Columna derecha: estadísticas, habilidades y descripción */}
          <div className="col-md-8">
            <h5>Estadísticas:</h5>
            <ul className="list-group mb-3">
              {pokemon.stats.map((s) => (
                <li
                  key={s.stat.name}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span className="text-capitalize">{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </li>
              ))}
            </ul>

            <h5>Habilidades:</h5>
            <ul className="list-group mb-3">
              {pokemon.abilities.map((a) => (
                <li
                  key={a.ability.name}
                  className="list-group-item text-capitalize"
                >
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PokemonDetail;
