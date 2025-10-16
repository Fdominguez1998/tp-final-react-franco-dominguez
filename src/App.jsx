import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PokemonCard from "./components/PokemonCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PokemonList from "./pages/PokemonList";
import Home from "./pages/Home";
import Info from "./pages/Info";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<PokemonList />} />
          <Route path="/perfil/:pokemonName" element={<PokemonDetails />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
