import axios from "axios";
import * as React from "react";

interface Test {
  name: string;
  email: string;
  phone_no: string;
  address: string;
  password: string;
  conf_password: string;
}

export const User_Register = () => {
  const ref1 = React.useRef<HTMLHeadingElement>(null);
  const [user, setUser] = React.useState<Test>({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    password: "",
    conf_password: "",
  });

  const valUpd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password === user.conf_password) {
      axios
        .post("http://localhost:3000/home/user-register", {
          name: user.name,
          email: user.email,
          phone_no: user.phone_no,
          address: user.address,
          password: user.password,
        })
        .then((res) => {
          if (res.data.success) {
            ref1.current!.innerHTML = res.data.msg;
            setTimeout(() => {
              ref1.current!.innerHTML = "";
            }, 3000);
          } else {
            ref1.current!.innerHTML = res.data.msg || "Registered Failed";
            setTimeout(() => {
              ref1.current!.innerHTML = "";
            }, 3000);
          }
        })
        .catch(() => {
          ref1.current!.innerHTML = "Server Error";
          setTimeout(() => {
            ref1.current!.innerHTML = "";
          }, 3000);
        });
    } else {
      ref1.current!.innerHTML =
        "Password and Confirm Password didn't matched";
      setTimeout(() => {
        ref1.current!.innerHTML = "";
      }, 3000);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light bg-gradient">
        <div className="card shadow-lg border-0 rounded-4" style={{ width: "450px" }}>
          <div className="card-header text-center bg-dark text-white rounded-top-4">
            <h3 className="m-0">👤 User Registration</h3>
          </div>
          <form className="p-4" onSubmit={handelSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={valUpd}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Phone No</label>
              <input
                type="number"
                name="phone_no"
                className="form-control"
                onChange={valUpd}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={valUpd}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={valUpd}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={valUpd}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Confirm Password</label>
              <input
                type="password"
                name="conf_password"
                className="form-control"
                onChange={valUpd}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 fw-bold rounded-pill"
            >
              🚀 Register
            </button>
          </form>
          <div className="text-center p-2">
            <h6 ref={ref1} className="fw-bold text-primary"></h6>
          </div>
        </div>
      </div>
    </>
  );
};
