import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "../../../backend/Controllers/User.controller";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
    </Routes>
  );
};

export default AllRoutes;
