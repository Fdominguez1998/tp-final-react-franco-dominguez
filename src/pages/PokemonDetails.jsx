import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import typeColors from "../utils/typeColors";

function PokemonDetail() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!response.ok) throw new Error("Pokemon not found");
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [pokemonName]);

  if (loading) return <p className="text-center mt-5">Loading Pokémon...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="d-flex flex-column">
      <main
        className="flex-grow-1 container mt-4 p-3 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="row">
          {/* Left column */}
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm d-flex flex-column align-items-center text-center">
              <h1 className="text-capitalize mb-3">{pokemon.name}</h1>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{
                  width: "150px",
                  height: "150px",
                  imageRendering: "pixelated",
                }}
              />
              <h5 className="mt-3">Types:</h5>
              <div>
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="badge mx-1 text-capitalize"
                    style={{
                      backgroundColor: typeColors[t.type.name] || "#777",
                      color: "white",
                    }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-md-8">
            <div className="card p-3 shadow-sm mb-4">
              <h5>Stats:</h5>
              <ul className="list-group mb-3">
                {pokemon.stats.map((s) => (
                  <li key={s.stat.name} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <span className="text-capitalize">{s.stat.name}</span>
                      <span>{s.base_stat}</span>
                    </div>
                    <div className="progress mt-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${(s.base_stat / 255) * 100}%`,
                          backgroundColor: "#4caf50",
                        }}
                        aria-valuenow={s.base_stat}
                        aria-valuemin="0"
                        aria-valuemax="255"
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>

              <h5>Abilities:</h5>
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

              <h5>Moves:</h5>
              <ul
                className="list-group mb-3"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {pokemon.moves.map((m) => (
                  <li
                    key={m.move.name}
                    className="list-group-item text-capitalize"
                  >
                    {m.move.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PokemonDetail;
