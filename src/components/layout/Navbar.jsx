import React from "react";

const Navbar = ({ handleSubmit, setSearchTerm, searchTerm }) => {
  return (
    <nav className="navbar">
      <a href="/">
        <div className="logo">Pick A Movie</div>
      </a>

      <form className="search" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="search"
          name="search"
          className="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search here"
          value={searchTerm}
        />
        <button type="submit"></button>
      </form>
    </nav>
  );
};

export default Navbar;
