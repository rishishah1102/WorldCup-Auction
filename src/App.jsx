import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// component
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Retention from "./pages/Retention";
import Squads from "./pages/Squads";
import PointsTable from "./pages/PointsTable";
import Players from "./pages/Players";
import WeeklyTeams from "./pages/WeeklyTeams";
import Auction from "./components/Auction";

// toast
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use PrivateRoute for all protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute element={<Navigate to="/home" />} name={"home"} />
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} name={"profile"} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} name={"home"} />}
        />
        <Route
          path="/players"
          element={<PrivateRoute element={<Players />} name={"players"} />}
        />
        <Route
          path="/retention"
          element={<PrivateRoute element={<Retention />} name={"retention"} />}
        />
        <Route
          path="/squads"
          element={<PrivateRoute element={<Squads />} name={"squads"} />}
        />
        <Route
          path="/pointsTable"
          element={<PrivateRoute element={<PointsTable />} name={"pt"} />}
        />
        <Route
          path="/wt"
          element={<PrivateRoute element={<WeeklyTeams />} name={"wt"} />}
        />
        <Route
          path="/auction"
          element={<PrivateRoute element={<Auction />} name={"auction"} />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-3xl"
      />
    </BrowserRouter>
  );
}

export default App;
