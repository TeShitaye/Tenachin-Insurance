import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backImage from "../assets/option4.jpg";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    console.log("Login data:", values);
  
    axios.post("http://localhost:5000/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          // Save the token in local storage
          localStorage.setItem("token", res.data.Token);
          // Navigate to the profile page
          navigate("/profile");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-gray-800 to-gray-350"
    style={{
      backgroundImage: `url(${backImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    }}>
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={login}>
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">Login</h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="mx-20 w-1/2 px-2 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-pink-700 hover:scale-125 transition duration-200 ease-in-out 
              active:bg-white-100 active:text-blue-800 active:scale-95"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account? <a href="/register" className="text-blue-600">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;