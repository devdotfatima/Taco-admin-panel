import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "../../redux/store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.app);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
