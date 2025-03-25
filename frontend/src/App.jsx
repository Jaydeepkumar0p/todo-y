import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Home from "./components/sign/Home";
import About from "./pages/About";
import SignIn from "./components/sign/SignIn";
import SignUp from "./components/sign/SignUp";
import Todo from "./pages/Todo";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signUp" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn && <Route path="/todo" element={<Todo />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
