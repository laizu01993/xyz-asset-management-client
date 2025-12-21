import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useUserData from "../hooks/useUserData";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const EmployeeRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [userData, isLoading] = useUserData();
    const location = useLocation();

    if (loading || isLoading) {
        return <div className="p-8">
            <Skeleton height={40} width={200} />
            <Skeleton count={5} />
        </div>;
    }

    if (user && userData?.role === "employee") {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default EmployeeRoute;
