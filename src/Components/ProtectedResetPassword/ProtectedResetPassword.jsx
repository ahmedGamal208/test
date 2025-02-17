import { Navigate } from "react-router-dom";

const ProtectedResetPassword = ({ children }) => {
  if (localStorage.getItem("resetCode") == null && localStorage.getItem("token") == null) {
    return <Navigate to={"/login"} />;
  }
  if (localStorage.getItem("resetCode") == null && localStorage.getItem("token") != null) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export default ProtectedResetPassword;
