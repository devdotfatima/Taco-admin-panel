import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "../../redux/store";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.app);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-thm">
      <Outlet />
    </div>
  );
};

export default PublicRoute;
