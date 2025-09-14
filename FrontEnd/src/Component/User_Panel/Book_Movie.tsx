import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  _id?: string;
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



export const Book_Movie: React.FC = () => {
  const [movieList, setMovieList] = React.useState<Movie[]>([]);
  const navigate = useNavigate();

  


  React.useEffect(() => {
    axios
      .get("http://localhost:3000/home/all-movies")
      .then((res) => {
        setMovieList(res.data.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBookNow = (movie: Movie) => {
    navigate("/ticket-booking", { state: movie });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-center">🎬 Book Your Movie</h1>

      <div className="row g-4">
        {movieList.length === 0 ? (
          <div className="col-12 text-center">
            <p>No movies available</p>
          </div>
        ) : (
          movieList.map((movie) => (
            <div className="col-6 col-md-4 col-lg-3" key={movie._id}>
              <div className="card h-100 shadow-sm">
                {/* Poster */}
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="card-img-top"
                    style={{ height: "380px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "380px" }}
                  >
                    <span className="text-muted">No Poster</span>
                  </div>
                )}

                {/* Card Body */}
                <div className="card-body text-center">
                  <h5 className="card-title text-truncate">{movie.title}</h5>
                  <p className="card-text text-muted small">
                    {movie.language} | {movie.type}
                  </p>
                  <p className="card-text mb-2">
                    ⭐ {movie.rating}/10 | ❤️ {movie.totalLikes}
                  </p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleBookNow(movie)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
