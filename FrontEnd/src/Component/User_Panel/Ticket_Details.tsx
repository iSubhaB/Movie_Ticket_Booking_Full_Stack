import axios from "axios";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  email: string;
  password: string;
}

export const Ticket_details: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state as Movie;

  const [name, setName] = React.useState<string>("");
  const [tickets, setTickets] = React.useState<number>(1);
  const [seatNumbers, setSeatNumbers] = React.useState<string>("");
  const [seatType, setSeatType] = React.useState<string>("");
  const [showTime, setShowTime] = React.useState<string>("");
   const [loginstate, setLoginstate] = React.useState<Test>({
      email: "",
      password: "",
    });


   React.useEffect(() => {     
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setLoginstate(JSON.parse(storedUser));  
    }
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingDetails = {
      movie: movie,
      name: name,
      tickets: tickets,
      seatNumbers: seatNumbers,
      seatType: seatType,
      showTime: showTime,
    };

    axios.post("http://localhost:3000/home/booking-details",{name:name,email:loginstate.email,Seat_No:seatNumbers,Seat_Type:seatType,Show_Time:showTime})
    navigate("/generate-ticket", { state: bookingDetails });
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3 text-center">🎟️ Book Your Ticket</h2>

      <div className="card shadow-sm" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="card-img-top"
          style={{ height: "280px", objectFit: "cover" }}
        />

        {/* Movie Info */}
        <div className="card-body p-3">
          <h4 className="mb-1">{movie.title}</h4>
          <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
            {movie.language} | {movie.type}
          </p>
          <p className="mb-1" style={{ fontSize: "0.9rem" }}>
            ⭐ {movie.rating}/10 | ❤️ {movie.totalLikes}
          </p>
          <p className="mb-1" style={{ fontSize: "0.85rem" }}>
            Release: {movie.releaseDate}
          </p>
          <p className="mb-3" style={{ fontSize: "0.85rem" }}>
            Duration: {movie.length}
          </p>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-2">
              <label className="form-label small">Your Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Number of Tickets */}
            <div className="mb-2">
              <label className="form-label small">Tickets</label>
              <input
                type="number"
                className="form-control form-control-sm"
                min="1"
                max="10"
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                required
              />
            </div>

            {/* Seat Numbers */}
            <div className="mb-2">
              <label className="form-label small">Seat Numbers</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g. A1, A2"
                value={seatNumbers}
                onChange={(e) => setSeatNumbers(e.target.value)}
                required
              />
              <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                Separate multiple seats with commas.
              </small>
            </div>

            {/* Seat Type */}
            <div className="mb-2">
              <label className="form-label small">Seat Type</label>
              <select
                className="form-select form-select-sm"
                value={seatType}
                onChange={(e) => setSeatType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            {/* Show Time */}
            <div className="mb-3">
              <label className="form-label small">Show Time</label>
              <select
                className="form-select form-select-sm"
                value={showTime}
                onChange={(e) => setShowTime(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="10:00 AM">Morning (10:00 AM)</option>
                <option value="1:00 PM">Afternoon (1:00 PM)</option>
                <option value="6:00 PM">Evening (6:00 PM)</option>
                <option value="9:00 PM">Night (9:00 PM)</option>
              </select>
            </div>

            {/* Confirm Button */}
            <button type="submit" className="btn btn-success btn-sm w-100">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
