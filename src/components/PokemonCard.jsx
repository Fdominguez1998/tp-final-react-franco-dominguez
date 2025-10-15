function PokemonCard({ pokemonData }) {
  const { id, name, sprites, types } = pokemonData;

  return (
    <div className="card text-center shadow-sm" style={{ width: "12rem" }}>
      <img
        src={sprites.front_default}
        className="card-img-top mx-auto mt-2"
        alt={name}
        style={{ width: "96px", height: "96px", imageRendering: "pixelated" }}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">
          #{id} {name}
        </h5>
        <div>
          {types.map((t) => (
            <span
              key={t.type.name}
              className="badge bg-primary mx-1 text-capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
