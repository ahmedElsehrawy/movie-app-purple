import { useState, useEffect } from "react";
import Movie from "./components/Movie";
import "./App.css";
import "./components/Navbar.css";
import Navbar from "./components/layout/Navbar.jsx";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=54c081db8091c09bfa574339f528734d&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isclicked, setIsClicked] = useState(false);

  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort-by-popularity.desc&api_key=54c081db8091c09bfa574339f528734d&page=${pageNumber}`;
  useEffect(() => {
    const fetchFeatured = async (pageNum) => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?sort-by-popularity.desc&api_key=54c081db8091c09bfa574339f528734d&page=${pageNum}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          console.log(data.results);
        });
    };

    let pageFromUrl = window.location.search.replace("?", "").split("=")[1];
    if (pageFromUrl) {
      setPageNumber(+pageFromUrl);

      fetchFeatured(pageFromUrl);
    } else {
      fetchFeatured(pageNumber);
    }
  }, [pageNumber, window.location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      fetch(FEATURED_API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          console.log(data.results);
        });
      setIsClicked(false);
    } else {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          console.log(data.results);
        });
      setIsClicked(true);
    }
  };
  return (
    <>
      <Navbar
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="home">
        {!isclicked && (
          <div className="next-previous">
            <button
              className={`previous-page ${pageNumber === 1 ? "disabled" : ""}`}
              onClick={(e) => {
                window.location.assign(`?page=${pageNumber - 1}`);
              }}
              disabled={pageNumber === 1}
            >
              <i className="fas fa-angle-left"></i> Previous Page
            </button>

            <button
              className="next-page"
              onClick={(e) => {
                window.location.assign(`?page=${pageNumber + 1}`);
              }}
            >
              Next Page
            </button>
          </div>
        )}
        <div className="container">
          {movies.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
