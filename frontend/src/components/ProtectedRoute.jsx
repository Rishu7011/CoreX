import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) return <Spinner />;
  if (!user) { window.location.href = "/login"; return null; }
  return children;
};
export default ProtectedRoute;