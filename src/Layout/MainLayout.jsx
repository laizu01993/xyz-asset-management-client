import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";

const MainLayout = () => {

    const location = useLocation();

    const noNavbar = location.pathname.includes('joinEmployee') || location.pathname.includes('joinHRManager') || location.pathname.includes('login');


    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            {noNavbar || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;