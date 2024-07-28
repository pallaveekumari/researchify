import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
const PrivateRoutes = ({ children }) => {
  const {setIsLoggedIn}=useContext(AppContext)
  let token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    setIsLoggedIn(true)
    return children;
  }
};

export default PrivateRoutes;
