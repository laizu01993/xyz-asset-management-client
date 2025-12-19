import { Helmet } from "react-helmet-async";
import AboutSection from "../AboutSection/AboutSection";
import Banner from "../Banner/Banner";
import Packages from "../PackagesSection/PackagesSection";

const Home = () => {
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