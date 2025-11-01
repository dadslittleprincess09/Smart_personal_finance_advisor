import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./components/Home";
import Forms from "./inexforms/Forms";
import ChartPage from "./components/Chartpage";
import Aiassistence from "./components/Aiassistence";
import Fileuploading from "./inexforms/Fileuploading";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./components/Dashboard";
const App = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname == "/login" || location.pathname == "/signup";
  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/aiassistence" element={<Aiassistence />} />
        <Route path="/fileuploading" element={<Fileuploading />} />
         <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default App;
