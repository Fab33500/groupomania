import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// importation des routes
import Home from "../../Containers/Home";
import Profile from "../../Containers/Profile";
import NotFound from "../../Containers/NotFound";

export default function index() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}
