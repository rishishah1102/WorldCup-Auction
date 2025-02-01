import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivateRoute = ({ element, name }) => {
  if (localStorage.getItem("auction")) {
    // If the auction token is present, render the element (component)
    return (
      <div className="w-screen h-screen relative overflow-y-scroll">
        {name !== "auction" && <Navbar />}
        {element}
        {name !== "auction" && <Footer />}
      </div>
    );
  } else {
    // If there's no auction token, redirect to the /auth route
    return <Navigate to="/auth" />;
  }
};

export default PrivateRoute;
