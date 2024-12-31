import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backImage from "../assets/option4.jpg";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    console.log("Login data:", values);
  
    axios.post("http://localhost:5000/login", values)
      .then((res) => {
        console.log("Response from server:", res.data); // Log the response
        if (res.data.Status === "Success") {
          localStorage.setItem("token", res.data.Token);
          navigate("/profile");
        } else {
          setError(res.data.Error || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err.response ? err.response.data : err.message);
        setError("Login failed. Please try again.");
      }); }

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

          {error && (
            <div className="text-red-500 text-center mb-4">
              {error} {/* Display error messages */}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={values.email} // Bind input value
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={values.password} // Bind input value
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
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