import typeColors from "../utils/typeColors";

function PokemonCard({ pokemonData }) {
  const { id, name, sprites, types } = pokemonData;

  return (
    <div
      className="card text-center shadow-sm p-3"
      style={{
        width: "12rem",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
    >
      <img
        src={sprites.front_default}
        className="card-img-top mx-auto"
        alt={name}
        style={{ width: "96px", height: "96px", imageRendering: "pixelated" }}
      />
      <h5 className="card-title text-capitalize mt-2">
        #{id} {name}
      </h5>
      <div>
        {types.map((t) => (
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
  );
}

export default PokemonCard;
