import axios from 'axios';
import * as React from 'react';

interface Test {
  name: string,
  phone_no: string,
  email: string,
  password: string,
  conf_password: string,
}

export const Admin_Register = () => {
  const [data, setData] = React.useState<Test>({
    name: "",
    phone_no: "",
    email: "",
    password: "",
    conf_password: ""
  });
  const [actions, setActions] = React.useState<boolean>(false);
  const ref1 = React.useRef<HTMLHeadingElement>(null);

  const valUpd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handel_action = () => {
    if (
      data.name === "" ||
      data.phone_no === "" ||
      data.email === "" ||
      data.password === "" ||
      data.conf_password === ""
    ) {
      ref1.current!.innerHTML = "⚠️ Please Fill All Fields";
    } else {
      setActions(true);
    }
  };

  const handel_Submit = () => {
    if (data.password === data.conf_password) {
      axios
        .post("http://localhost:3000/home/register", {
          name: data.name,
          phone_no: data.phone_no,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          ref1.current!.innerHTML = "✅ Register Successfully";
          setActions(false);
             setTimeout(() => {
              ref1.current!.innerHTML =""
          }, 5000);
        })
        .catch(() => {
          ref1.current!.innerHTML = "❌ Registration Failed";
        });
    } else {
      alert("Please make sure Password and Confirm Password are Same");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Enter Your Register Details</h2>

      <div className="card shadow p-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={valUpd} />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone No</label>
          <input type="text" name="phone_no" className="form-control" onChange={valUpd} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={valUpd} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={valUpd} />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" name="conf_password" className="form-control" onChange={valUpd} />
        </div>

        {!actions && (
          <button className="btn btn-primary w-100" onClick={handel_action}>
            Submit
          </button>
        )}

        {actions && (
          <div className="d-flex justify-content-between">
            <button className="btn btn-success w-50 me-2" onClick={handel_Submit}>
              Confirm
            </button>
            <button className="btn btn-danger w-50" onClick={() => setActions(false)}>
              Cancel
            </button>
          </div>
        )}

        <div className="text-center mt-3">
          <h5 ref={ref1}></h5>
        </div>
      </div>
    </div>
  );
};
