import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("token") == null) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
