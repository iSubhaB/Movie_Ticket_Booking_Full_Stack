import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import pic1 from "../Document/2010-inception-movie-inception-poster-wallpaper-thumb.jpg";
import pic2 from "../Document/E_iq1p1VUAcuIDJ.jpg";
import pic3 from "../Document/Fighter_1705756151579_1705756165299.jpg";
import pic4 from "../Document/avenger.jpg";
import pic5 from "../Document/war-2.jpg";
import { Currently_Running } from "./Currently_Running";

interface Test {
  email: string;
  password: string;
}

export const Home = () => {
  const [signin, setSignin] = React.useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref1 = React.useRef<HTMLHeadingElement>(null);
  const ref3 = React.useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const [popup, setPopup] = React.useState<boolean>(false); // for admin
  const [popup2, setPopup2] = React.useState<boolean>(false); // for user login
  const [loginstate, setLoginstate] = React.useState<Test>({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = React.useState<boolean>(false); //if login success. it will true

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

  const getIndex = (idx: number) => (idx + images.length) % images.length;

  const admin_Panel = () => {
    navigate("/register_login");
  };

  const login_handel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/home/user-login", {
        email: loginstate.email,
        password: loginstate.password,
      })
      .then((res) => {
       if (res.data.success) {
  setLoginStatus(true);
  if (ref3.current) ref3.current.innerHTML = res.data.msg; // "Login Successfully"
  localStorage.setItem("userLogin", JSON.stringify(res.data.user));
} else {
  setLoginStatus(false);
  if (ref3.current) ref3.current.innerHTML = res.data.msg; // "Incorrect password" / "User not found"
}

      })
      .catch((error) => {
        console.error(error);
        alert("Server Error");
      });
  };

  // login data reload
  React.useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setLoginStatus(true);
      setLoginstate(JSON.parse(storedUser));
    }
  }, []);

  const handel_Logout = () => {
    localStorage.removeItem("userLogin"); // ✅ clear saved login
    setLoginStatus(false); // ✅ update UI state
    setLoginstate({ email: "", password: "" }); // ✅ reset login form
    alert("You have logged out successfully"); // (optional)
  };

  const hanleBookNow = () => {
    if (!loginStatus) {
      setPopup2(true);
      // if NOT logged in
      if (ref1.current) ref1.current.innerHTML = "Please Login First";
      return;
    }
    navigate("/book-movie"); // only allow when logged in
  };

  return (
    <>
      <div>
        {/* Main div */}
        <div>
          {/* Top header */}
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
              <button
                className="btn btn-light ms-3"
                onClick={() => setPopup(true)}
              >
                Admin Access
              </button>

                                                         {/* Admin Panel POPUP */}
              {popup && (
                <div
                  className="modal fade show"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                      <div className="modal-header bg-warning text-dark rounded-top-4">
                        <h5 className="modal-title d-flex align-items-center">
                          ⚠️ Admin Confirmation
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setPopup(false)}
                        ></button>
                      </div>

                      <div className="modal-body text-center p-4">
                        <h5 className="fw-bold mb-3">
                          Are you sure you are an admin?
                        </h5>
                        <p className="text-muted">
                          Access to the Admin Panel is restricted to authorized
                          users only.
                        </p>
                      </div>

                      <div className="modal-footer border-0 d-flex justify-content-center pb-4">
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-4"
                          onClick={() => setPopup(false)}
                        >
                          ❌ No
                        </button>
                        <button
                          type="button"
                          className="btn btn-success px-4"
                          onClick={admin_Panel}
                        >
                          ✅ Yes, Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

                                                     {/* Sign In dropdown with logo */}
              <div className="dropdown ms-3">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setPopup2(true)}
                    >
                      LogIn
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/user_register")}
                    >
                      Register
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button onClick={handel_Logout} className="dropdown-item">
                      {" "}
                      <a className="dropdown-item">Logout</a>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* User Login POPUP2 start */}
            {popup2 && (
              <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0 shadow-lg rounded-4">
                    <div className="modal-header bg-primary text-white rounded-top-4">
                      <h5 className="modal-title d-flex align-items-center">
                        🔑 User Login
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setPopup2(false)}
                      ></button>
                    </div>

                    <form onSubmit={login_handel}>
                      <div className="modal-body p-4">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={loginstate.email}
                            onChange={(e) =>
                              setLoginstate({
                                ...loginstate,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-bold">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={loginstate.password}
                            onChange={(e) =>
                              setLoginstate({
                                ...loginstate,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="modal-footer border-0 d-flex justify-content-center pb-4">
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-4"
                          onClick={() => setPopup2(false)}
                        >
                          ❌ Cancel
                        </button>
                        <button type="submit" className="btn btn-success px-4">
                          ✅ Login
                        </button>
                        <h3 ref={ref3} className="text-center mt-3"></h3>
                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            )}
                                            {/* User Login POPUP2 Closed */}
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
            <button                                           // Book Now Button
              className="btn btn-primary"
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
              onClick={() => {
                hanleBookNow();
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
        <br />
        <br />
        {/* Currently Running */}
        <div>
          <div>
            <Currently_Running />
          </div>
        </div>
      </div>
    </>
  );
};
