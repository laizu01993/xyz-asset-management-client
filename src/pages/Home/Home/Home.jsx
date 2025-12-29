import { Helmet } from "react-helmet-async";
import AboutSection from "../AboutSection/AboutSection";
import Banner from "../Banner/Banner";
import Packages from "../PackagesSection/PackagesSection";
import Skeleton from "react-loading-skeleton";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useUserData from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { loading } = useContext(AuthContext);
    const [userData, isLoading] = useUserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isLoading) {
            if (userData?.role === "hr") {
                navigate("/dashboard/hrHome", { replace: true });
            } else if (userData?.role === "employee") {
                navigate("/dashboard/employeeHome", { replace: true });
            }
        }
    }, [userData, loading, isLoading, navigate]);

    if (loading || isLoading) {
        return <div className="p-8"><Skeleton height={40} width={200} /><Skeleton count={5} /></div>;
    } 

    return (
        <div>
            <Helmet>
                <title>xyz-asset-management | Home</title>
            </Helmet>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <Packages></Packages>
        </div>
    );
};

export default Home;