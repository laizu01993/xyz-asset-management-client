import { Helmet } from "react-helmet-async";
import Profile from "../../../Shared/Profile/Profile"


const HrProfile = () => {
    return (
        <div>
            <Helmet>
                <title>HR | Profile</title>
            </Helmet>
            <Profile></Profile>
        </div>
    );
};
export default HrProfile;
