import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({ email: "", password: "" });

  const change = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login request..."); // Debugging
      const response = await axios.post(`${window.location.origin}/api/v1/login`, input);
      console.log("Response Data:", response.data); // Debugging

      if (response.data._id) {
        // Store user ID in sessionStorage
        sessionStorage.setItem("id", response.data._id);
        setIsLoggedIn(true); // Update login state
        navigate("/todo");
      } else {
        setErrorMessage("❌ Unexpected error, please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message); // Debugging
      setErrorMessage(error.response?.data?.message || "❌ Sign-in failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input type="email" name="email" onChange={change} value={input.email} placeholder="Email" className="w-full p-3 border rounded-xl" required />
          <input type="password" name="password" onChange={change} value={input.password} placeholder="Password" className="w-full p-3 border rounded-xl" required />
          <button type="submit" className="w-full bg-black text-white p-3 rounded-xl">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
