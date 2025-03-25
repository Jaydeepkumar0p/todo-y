import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear("id")
    naviGate("/");

  };
  const naviGate=useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">TodoList</div>

        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
          {isLoggedIn && <Link to="/todo" className="hover:text-gray-400">Todo</Link>}

          <div className="border-l border-gray-600 h-6 mx-2"></div>

          {!isLoggedIn ? (
            <>
              <Link to="/signIn" className="hover:text-gray-400">Sign In</Link>
              <Link to="/signUp" className="hover:text-gray-400">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
