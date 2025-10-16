import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Mi Pokedex</p>
        <small>
          Hecho con <span style={{ color: "red" }}>♥</span>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
