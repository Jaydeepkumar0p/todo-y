import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [Input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting Data:", Input); // Debugging step
            const response = await axios.post(`${window.location.origin}/api/v1/register`, Input);

            console.log("Server Response:", response.data); // Debugging step

            if (response.data.message === "User already exists") {
                setErrorMessage("⚠️ User already exists. Try signing in.");
            } else {
                alert(response.data.message); 
                setInput({ username: "", email: "", password: "" });
                navigate("/signin"); // Corrected navigation
                setErrorMessage("");
            }
        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);
            setErrorMessage("❌ Registration failed. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
                <p className="text-gray-500 text-center mt-2">Create your account and get started!</p>

                {errorMessage && (
                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                )}

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-700">Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={Input.username}
                            onChange={change}
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={change}
                            value={Input.email}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={Input.password}
                            onChange={change}
                            placeholder="Create a password"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-black text-white p-3 rounded-xl shadow-md hover:bg-gray-900 transition"
                    >
                        Sign Up
                    </motion.button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/signIn" className="text-black font-semibold hover:underline">
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
