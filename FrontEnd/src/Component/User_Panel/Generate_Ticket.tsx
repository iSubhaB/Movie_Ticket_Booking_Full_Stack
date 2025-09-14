import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

interface BookingDetails {
  movie: {
    poster: string;
    title: string;
    language: string;
    type: string;
  };
  name: string;
  tickets: number;
  seatNumbers: string;
  seatType: string;
  showTime: string;
}

export const Generate_Ticket: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as BookingDetails;

  // Generate unique ticket ID
  const ticketId = React.useMemo(
    () => "TCKT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    []
  );


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🎟️ Your Movie Ticket</h1>

      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          border: "2px dashed #333",
          borderRadius: "12px",
          background: "#fdfdfd",
        }}
      >
        <div className="row g-4 align-items-center">
          {/* Poster */}
          <div className="col-md-4 text-center">
            <img
              src={booking.movie.poster}
              alt={booking.movie.title}
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Ticket Details */}
          <div className="col-md-5">
            <h3>{booking.movie.title}</h3>
            <p className="text-muted">
              {booking.movie.language} | {booking.movie.type}
            </p>
            <p>
              <strong>Ticket ID:</strong> {ticketId}
            </p>
            <p>
              <strong>Name:</strong> {booking.name}
            </p>
            <p>
              <strong>Tickets:</strong> {booking.tickets}
            </p>
            <p>
              <strong>Seats:</strong> {booking.seatNumbers}
            </p>
            <p>
              <strong>Seat Type:</strong> {booking.seatType}
            </p>
            <p>
              <strong>Show Time:</strong> {booking.showTime}
            </p>
          </div>

          {/* QR Code */}
          <div className="col-md-3 text-center">
            <QRCodeSVG
              value={`${ticketId}-${booking.name}-${booking.movie.title}`}
              size={120}
              fgColor="#000000"
            />
            <p className="small mt-2 text-muted">Scan for details</p>
          </div>
        </div>

        <hr />

        {/* Actions */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Movies
          </button>
          <button className="btn btn-outline-dark" onClick={handlePrint}>
            🖨️ Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
