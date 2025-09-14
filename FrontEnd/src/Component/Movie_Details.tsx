import * as React from "react";
import { useLocation } from "react-router-dom";

interface Test {
  poster: string;
  title: string;
  type: string;
  language: string;
  releaseDate: string;
  totalLikes: string;
  length: string;
  rating: string;
  totalHalls: string;
}

export const Movie_Details = () => {
  const location = useLocation();
  const movie = location.state as Test;

  if (!movie) {
    return <h3 className="text-center mt-5">No movie data found</h3>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <div className="row g-4 align-items-center">
          {/* Left side - Poster */}
          <div className="col-md-5 text-center">
            <img
              src={movie.poster}
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "700px", objectFit: "cover" }}
            />
          </div>

          {/* Right side - Details */}
          <div className="col-md-7">
            <h2 className="mb-3">{movie.title}</h2>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Type:</strong> {movie.type}
              </li>
              <li className="list-group-item">
                <strong>Language:</strong> {movie.language}
              </li>
              <li className="list-group-item">
                <strong>Release Date:</strong> {movie.releaseDate}
              </li>
              <li className="list-group-item">
                <strong>Length:</strong> {movie.length}
              </li>
              <li className="list-group-item">
                <strong>Rating:</strong> ⭐ {movie.rating}/10
              </li>
              <li className="list-group-item">
                <strong>Total Likes:</strong> {movie.totalLikes}
              </li>
              <li className="list-group-item">
                <strong>Total Halls:</strong> {movie.totalHalls}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
