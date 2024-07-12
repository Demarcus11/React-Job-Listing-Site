import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// This is what will show on every page
const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet is whatever component is being displayed for the current route, so if we're on "/" then the HomePage component will show, etc  */}
      <Outlet />
      {/* Container is positioned absolutely so it can go anywhere and it will appear in the corner */}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
