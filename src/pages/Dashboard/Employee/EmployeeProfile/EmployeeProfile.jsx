import { Helmet } from "react-helmet-async";
import Profile from "../../../Shared/Profile/Profile";

const EmployeeProfile = () => {
    return (
        <div>
            <Helmet>
                <title>Employee | Profile</title>
            </Helmet>
            <Profile></Profile>
        </div>
    );
};

export default EmployeeProfile;