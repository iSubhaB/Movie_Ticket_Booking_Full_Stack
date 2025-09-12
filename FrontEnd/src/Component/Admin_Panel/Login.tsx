import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface Test {
    email: string;
    password: string;
}

export const Login = () => {
    const [user, setUser] = React.useState<Test>({ email: "", password: '' });
    const ref1 = React.useRef<HTMLHeadingElement>(null);
    const navigate = useNavigate();

    const valUpd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

const handel_Submit = () => {
    if(user.email.trim() === "" || user.password.trim() === "") {
        ref1.current!.innerHTML = "⚠️ Please Fill Email And Password";  
        return;
    }

    axios.post("http://localhost:3000/home/login", { email: user.email, password: user.password })
        .then((res) => {
            if(res.data.user) {  // check if user object exists
                ref1.current!.innerHTML = "✅ Login Successful. You will be redirected to Admin Panel";
                setTimeout(() => {
                    navigate("/admin-panel");
                }, 2000);
            } else {
                ref1.current!.innerHTML = res.data.msg; // show backend message
            }
        })
        .catch((err) => {
            console.log(err);
            ref1.current!.innerHTML = "❌ Server error. Try again.";
        });
};
0.0

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
                <h2 className="text-center mb-4">Login</h2>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email"
                        onChange={valUpd} 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        onChange={valUpd} 
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={handel_Submit}>Submit</button>

                <h5 ref={ref1} className="text-success mt-3 text-center"></h5>
            </div>
        </div>
    );
};
