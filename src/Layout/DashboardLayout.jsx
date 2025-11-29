import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;