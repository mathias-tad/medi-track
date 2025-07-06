import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  var decoded;
  var position;

  if (!token)
    return location.pathname == "/login" ? (
      children
    ) : (
      <Navigate to={"/login"} />
    );

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {}
    if (Date.now() / 1000 > decoded.exp) {
      localStorage.removeItem("token");
      return <Navigate to={"/login"} />;
    }
  }

  position = decoded.position;
  if (position == "admin" && location.pathname == "/admin/register")
    return children;
  if (position == "reg" && location.pathname == "/reg/patient-registration")
    return children;
  if (position == "reg" && location.pathname == "/reg/search") return children;
  if (`/${position}` == location.pathname) {
    return children;
  } else {
    toast.error("Access Denied!");
    return <Navigate to={`/${position}`} />;
  }
};

export default ProtectedRoute;
