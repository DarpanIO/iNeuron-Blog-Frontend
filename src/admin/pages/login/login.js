import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../../../context/Alert/alertContext";
import "./login.css";


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const contextAlert= useContext(alertContext)
  const {showAlert}= contextAlert
  const handleSubmit = async (e) => {
        e.preventDefault()
        const response= await fetch("http://localhost:4000/api/auth/signin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/admin/dashboard/news");
      showAlert("Login Successfully","success")
    } else {
      alert("Invalid Credentials")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login">
      <form className="" onSubmit={handleSubmit}>
        <img src={process.env.PUBLIC_URL + "/vibrant.png"} alt="" />
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label" name="password">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
