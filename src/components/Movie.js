import React from "react";
import "./Movie.css";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ title, poster_path, overview, vote_average }) => {
  return (
    <>
      {poster_path && (
        <div className="card">
          <img
            width="100%"
            height="280px"
            src={`${IMG_API}${poster_path}`}
            alt={title}
          />
          <div className="content">
            <span className="title">{title}</span>
            <span
              className={
                vote_average >= 8
                  ? "rating-green"
                  : vote_average > 6
                  ? "rating-orange"
                  : "rating-red"
              }
            >
              {vote_average}
            </span>
          </div>
          <div className="description">
            <h3>{title}</h3>
            {overview}
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
