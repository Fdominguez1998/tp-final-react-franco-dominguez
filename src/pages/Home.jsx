import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/pokemons");

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="card p-5 shadow-sm text-center"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="display-4 mb-3">Welcome to My Pokedex</h1>
        <p className="lead mb-4">
          Here you can find all your favorite Pokémons
        </p>
        <button className="btn btn-primary btn-lg shadow" onClick={handleClick}>
          See Pokémons
        </button>
      </div>
    </div>
  );
}

export default Home;
