const DashboardNavbar = () => {

    // Dynamic active class function
    const activeClass = ({ isActive }) =>
  isActive
    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
    : "hover:text-blue-600 transition font-medium";


    const navItems = <>
        <li><NavLink to="" className={activeClass}>Home</NavLink></li>
        <li><NavLink to="" className={activeClass}>Asset List</NavLink></li>
        <li><NavLink to="" className={activeClass}>Add an Asset</NavLink></li>
        <li><NavLink to="" className={activeClass}>All Requests</NavLink></li>
        <li><NavLink to="" className={activeClass}>My Employee List</NavLink></li>
        <li><NavLink to="" className={activeClass}>Add an Employee</NavLink></li>
        <li><NavLink to="" className={activeClass}>Profile</NavLink></li>
    </>
    return (
        <div className="navbar sticky top-0 z-50 bg-black/30 backdrop-blur-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-4xl text-blue-900 font-bold">X<span className="text-red-600">Y</span>Z</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-blue-600 text-white hover:bg-blue-700">Log In</a>
            </div>
        </div>
    );
};

export default DashboardNavbar;