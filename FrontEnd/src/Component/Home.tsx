import * as React from "react";
import { useNavigate } from "react-router-dom";

import pic1 from "../Document/2010-inception-movie-inception-poster-wallpaper-thumb.jpg";
import pic2 from "../Document/E_iq1p1VUAcuIDJ.jpg";
import pic3 from "../Document/Fighter_1705756151579_1705756165299.jpg";
import pic4 from "../Document/avenger.jpg";
import pic5 from "../Document/war-2.jpg";

export const Home = () => {
  const [signin, setSignin] = React.useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const navigate = useNavigate();

  const images = [pic1, pic2, pic3, pic4, pic5];

  // Auto slide every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handle_serach = () => {
    navigate("/search");
  };

  // Wrap index safely
  const getIndex = (idx: number) => {
    return (idx + images.length) % images.length;
  };

  const admin_Panel=()=>{
  navigate("/register_login")
  }

  return (
    <>
      <div>
        {/* Main div */}
        <div>
          {/* top header */}
          <nav className="d-flex justify-content-between align-items-center p-2 bg-light shadow-sm">
            {/* Left side */}
            <div className="d-flex align-items-center gap-3">
              <h2 className="m-0 fw-bold text-danger">BookMyMovie</h2>
              <input
                type="text"
                className="form-control"
                style={{ maxWidth: "300px" }}
                placeholder="Search for movies"
                onClick={handle_serach}
              />
            </div>

            {/* Right side */}
            <div className="d-flex align-items-center">
             <button className="btn btn-warning ms-3" onClick={admin_Panel}>Admin Panel</button>

              <select className="form-select" style={{ width: "150px" }}>
                <option value="kolkata">Kolkata</option>
                <option value="burdwan">Burdwan</option>
                <option value="siliguri">Siliguri</option>
                <option value="asansol">Asansol</option>
                <option value="durgapur">Durgapur</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Chennai</option>
                <option value="banglore">Bangalore</option>
                <option value="hydrabad">Hyderabad</option>
                <option value="pune">Pune</option>
              </select>

              {/* Toggle button */}
              <button
                className={`btn ms-3 px-4 ${
                  signin ? "btn-danger" : "btn-success"
                }`}
                onClick={() => setSignin(!signin)}
              >
                {signin ? "Sign Out" : "Sign In"}
              </button>
            
            </div>
          </nav>
        </div>

        {/* Smooth Slideshow */}
        <div
          className="position-relative w-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#111",
            height: "500px",
            overflow: "hidden",
          }}
        >
          {/* Left poster */}
          <div
            className="position-absolute"
            style={{
              left: "5%",
              top: "50%",
              transform: "translateY(-50%) scale(0.8)",
              opacity: 0.6,
              transition: "all 0.8s ease-in-out",
            }}
          >
            <img
              src={images[getIndex(currentIndex - 1)]}
              alt="left"
              style={{
                height: "400px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
              }}
            />
          </div>

          {/* Center poster with Book Now button */}
          <div
            style={{
              zIndex: 2,
              position: "relative",
              transition: "all 0.8s ease-in-out",
            }}
          >
            <img
              src={images[getIndex(currentIndex)]}
              alt="center"
              style={{
                height: "450px",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.8)",
              }}
            />

            {/* Book Now button */}
            <button className="btn btn-primary"
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#e50914",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                padding: "4px 20px",
                fontSize: "16px",
                fontWeight: "bold",            
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#910b12ff")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#e50914")
              }
            >
              Book Now
            </button>
          </div>

          {/* Right poster */}
          <div
            className="position-absolute"
            style={{
              right: "5%",
              top: "50%",
              transform: "translateY(-50%) scale(0.8)",
              opacity: 0.6,
              transition: "all 0.8s ease-in-out",
            }}
          >
            <img
              src={images[getIndex(currentIndex + 1)]}
              alt="right"
              style={{
                height: "400px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
              }}
            />
          </div>

          {/* Prev button */}
          <button
            className="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-2"
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0 ? images.length - 1 : currentIndex - 1
              )
            }
          >
            ◀
          </button>

          {/* Next button */}
          <button
            className="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-2"
            onClick={() =>
              setCurrentIndex(
                currentIndex === images.length - 1 ? 0 : currentIndex + 1
              )
            }
          >
            ▶
          </button>
        </div>
        <div> {/* Currently Running */}
            <h1>Currently Running</h1>
            <div>

            </div>
        </div> {/* Currently Running end div */}
        <div>

        </div>
      </div>
    </>
  );
};
