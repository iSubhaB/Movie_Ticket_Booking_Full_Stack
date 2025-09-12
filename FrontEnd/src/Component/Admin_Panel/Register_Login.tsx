import * as React from "react";
import { Admin_Register } from "./Admin_Register";
import { Login } from "./Login";

export const Admin_Register_login = () => {
  const [reg, setReg] = React.useState<boolean>(false);
  const [log, setLog] = React.useState<boolean>(false);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 bg-light text-dark bg-gradient" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Admin Panel</h2>

        {/* Register Part start */}
        <div className="mb-3 text-center">
          <button
            className="btn btn-primary btn-sm mb-3"
            style={{ width: "280px" }}   // 4–5 inch width
            onClick={() => {
              setReg(!reg);
              setLog(false);
            }}
          >
            Register
          </button>
          <div>{reg && <Admin_Register />}</div>
        </div>
        {/* Register Part Close */}

        {/* Login part start here */}
        <div className="text-center mt-4">
          <label className="form-label d-block">Already Registered?</label>
          <button
            className="btn btn-success btn-sm"
            style={{ width: "280px" }}   // 4–5 inch width
            onClick={() => {
              setLog(!log);
              setReg(false);
            }}
          >
            Log In
          </button>
          <div className="mt-3">{log && <Login />}</div>
        </div>
        {/* Login part close */}
      </div>
    </div>
  );
};
