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

interface Test {
  name: string;
  email: string;
  Seat_No: string;
  Seat_Type: string;
  Show_Time: string;
}

interface Test2 {
  email: string;
  password: string;
}

export const Book_Movie: React.FC = () => {
  const [movieList, setMovieList] = React.useState<Movie[]>([]);
  const navigate = useNavigate();
  const [booking, setBooking] = React.useState<Test[]>([]);
  const [loginstate, setLoginstate] = React.useState<Test2>({
    email: "",
    password: "",
  });

  // ✅ Load stored user
  React.useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setLoginstate(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch bookings for logged-in user
  React.useEffect(() => {
    if (!loginstate.email) return;

    axios
      .post("http://localhost:3000/home/your-ticket", {
        email: loginstate.email,
      })
      .then((res) => {
        if (res.data.success) {
          setBooking(res.data.bookings || []);
        } else {
          setBooking([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginstate.email]);

  // ✅ Fetch all movies
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/home/all-movies")
      .then((res) => {
        setMovieList(res.data.movies || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBookNow = (movie: Movie) => {
    navigate("/ticket-booking", { state: movie });
  };

  // ✅ Delete all bookings for the logged-in user
  const deleteBooking = (email: string) => {
    axios
      .post("http://localhost:3000/home/delete-booked", { email:email }, // ✅ send email in request body
      )
      .then((res) => {
        console.log("Deleted bookings:", res.data);
        setBooking([]); // clear from UI after delete
      })
      .catch((err) => {
        console.error("Error deleting booking:", err);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-center">🎬 Book Your Movie</h1>

      {/* ✅ Floating Booking Corner */}
   {booking.length > 0 && (
  <div
    className="position-fixed top-0 end-0 m-2 p-2 bg-light shadow rounded"
    style={{ width: "180px", fontSize: "0.8rem", zIndex: 1050 }}
  >
    <h6 className="mb-2 text-primary">🎟 Your Bookings</h6>
    {booking.map((b, idx) => (
      <div
        key={idx}
        className="border-bottom pb-1 mb-1"
        style={{ lineHeight: "1.2" }}
      >
        Show: {b.Show_Time}
      </div>
    ))}
    <button
      className="btn btn-sm btn-danger w-100 mt-2"
      onClick={() => deleteBooking(loginstate.email)}
    >
      Delete All
    </button>
  </div>
)}


      {/* Movies Grid */}
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
