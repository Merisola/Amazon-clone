import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataContext";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext); 
  const { user } = state; //

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  if (!user) return null; 

  return children;
};

export default ProtectedRoute;
