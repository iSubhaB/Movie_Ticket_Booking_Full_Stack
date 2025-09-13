import axios from "axios";
import * as React from "react";

// Define movie type for safety
type Movie = {
  title: string;
  poster: string;
  type: string;
  language: string;
  releaseDate: string;
  totalLikes: string;
  length: string;
  rating: string;
  totalHalls: string;
};

export const Search_Movie = () => {
  const [data, setData] = React.useState<string>("");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = React.useState<Movie[]>([]);

  const valUpd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .get("http://localhost:3000/home/search")
      .then((res) => {
        const allMovies: Movie[] = res.data.movies || [];
        setMovies(allMovies);

        // filter based on search text
        const filtered = allMovies.filter((v) =>
          v.title.toLowerCase().includes(data.toLowerCase())
        );
        setFilteredMovies(filtered);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  };

  return (
    <div className="container mt-4">
      {/* Search Box */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto d-flex">
          <input
            type="text"
            className="form-control me-2"
            name="title"
            placeholder="Search Your Movie Here"
            value={data}
            onChange={valUpd}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </div>

      {/* Movie Results */}
      <div className="row justify-content-center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((val, idx) => (
            <div key={idx} className="col-md-8 mb-4">
              <div className="card shadow-sm">
                <div className="row g-0">
                  {/* Poster on left */}
                  <div className="col-md-4">
                    {val.poster ? (
                      <img
                        src={val.poster}
                        alt={val.title}
                        className="img-fluid rounded-start"
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex align-items-center justify-content-center h-100"
                        style={{ minHeight: "300px" }}
                      >
                        No Poster
                      </div>
                    )}
                  </div>

                  {/* Details on right */}
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{val.title || "Unknown"}</h5>
                      <p className="card-text">
                        <strong>Type:</strong> {val.type}
                      </p>
                      <p className="card-text">
                        <strong>Language:</strong> {val.language}
                      </p>
                      <p className="card-text">
                        <strong>Length:</strong> {val.length}
                      </p>
                      <p className="card-text">
                        <strong>Rating:</strong> {val.rating}/10
                      </p>
                      <p className="card-text">
                        <strong>Release Date:</strong> {val.releaseDate}
                      </p>
                      <p className="card-text">
                        <strong>Total Likes:</strong> {val.totalLikes}k
                      </p>
                      <p className="card-text">
                        <strong>Total Halls:</strong> {val.totalHalls}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No movies found.</p>
        )}
      </div>
    </div>
  );
};
