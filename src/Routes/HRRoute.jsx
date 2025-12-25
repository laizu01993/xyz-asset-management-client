import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useUserData from "../hooks/useUserData";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const HRRoute = ({ children }) => {
  // Auth state from Firebase context (logged-in user + loading state)
  const { user, loading } = useContext(AuthContext);

  // Fetch user data (from DB) which includes role, and loading state
  const [userData, isLoading] = useUserData();

  // router location so we can redirect back after login
  const location = useLocation();


  // while auth or user-data is loading, show skeleton (avoid flicker / crashes)
  if (loading || isLoading) {
    return (
      <div className="p-8">
        <Skeleton height={40} width={200} />
        <Skeleton count={5} />
      </div>
    );
  }

  // Not Logged in -->Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
  }

  // Not HR → block
  if (userData?.role !== "hr") {
    return <Navigate to="/" replace />;
  }

  // HR but not paid → payment page
  if (!userData?.isPaid) {
    return <Navigate to="/payment" replace />;
  }

  // HR + paid → allow
  return children;
};


export default HRRoute;
