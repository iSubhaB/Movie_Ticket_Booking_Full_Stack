import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

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

export const Currently_Running = () => {
  const [movieList, setMovieList] = React.useState<Test[]>([]);
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

  // ✅ handle navigation with movie details
  const handleMovieClick = (movie: Test) => {
    navigate("/movie-details", { state: movie });
  };

  return (
    <>
      <h2 
  className="mb-4 fw-bold text-primary" 
  style={{ marginLeft: "20px", letterSpacing: "1px" }}
>
  🎬 Currently Running
</h2>

      <div className="container">
        <div className="row">
          {movieList.map((v, i) => (
            <div className="col-6 col-md-3 col-lg-2 mb-4" key={i}>
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => handleMovieClick(v)}
              >
                {/* Poster */}
                <img
                  src={v.poster}
                  className="card-img-top"
                  alt={v.title}
                  style={{ height: "250px", objectFit: "cover" }} // smaller height
                />

                {/* Card Body */}
                <div className="card-body text-center p-2">
                  <h6 className="card-title text-truncate">{v.title}</h6>
                  <p className="card-text text-muted small mb-1">
                    {v.language} | {v.type}
                  </p>
                </div>

                {/* Footer */}
                <div className="card-footer text-center bg-dark text-white p-1 small">
                  ⭐ {v.rating}/10 | {v.totalLikes} Likes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
