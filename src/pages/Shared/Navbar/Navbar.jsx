import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useUserData from "../../../hooks/useUserData";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const [userData] = useUserData();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    };

    // default nav for visitors
    const guestNav = <>
        <li><a className="text-blue-600 hover:text-blue-400 transition text-lg font-medium">Home</a></li>

        <li><Link to="/joinEmployee" className="hover:text-blue-600 transition text-lg font-medium">Join as Employee</Link></li>

        <li><Link to="joinHRManager" className="hover:text-blue-600 transition text-lg font-medium">Join as HR Manager</Link></li>
    </>;

    const activeClass = "text-blue-600 font-medium text-lg";
    const normalClass = "text-lg font-medium text-black hover:text-blue-500";


    // menu for employee
    const employeeNav = <>
        <li>
            <NavLink
                to="/dashboard/employeeHome"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Home
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/myAssets"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                My Assets
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/myTeam"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                My Team
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/requestAsset"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Request for an Asset
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/employeeProfile"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Profile
            </NavLink>
        </li>
    </>;

    // menu for HR manager
    const hrNav = <>
        <li>
            <NavLink
                to="/dashboard/hrHome"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Home
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/assetLists"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Asset List
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/addAsset"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Add an Asset
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/allRequests"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                All Requests
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/employeeLists"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                My Employee List
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/addEmployee"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Add an Employee
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard/hrProfile"
                className={({ isActive }) => isActive ? activeClass : normalClass}
            >
                Profile
            </NavLink>
        </li>
    </>;

    // condition based on role
    const navItems =
    !user ? guestNav :
    userData?.role === "hr" ? hrNav :
    userData?.role === "employee" ? employeeNav :
    guestNav;


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
                {
                    user ? <>
                        <div className="flex items-center gap-3">

                            {/* Profile Photo */}
                            <img
                                src={user.photoURL}
                                alt="profile"
                                className="w-10 h-10 rounded-full border"
                            />

                            {/* User Name */}
                            <span className="font-semibold">{user.displayName}</span>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogOut}
                                className="btn bg-red-600 text-white hover:bg-red-700"
                            >
                                Logout
                            </button>

                        </div>
                    </> :
                        <><Link to="login">
                            <button className="btn bg-blue-600 text-white hover:bg-blue-700">Log In</button>
                        </Link></>
                }

            </div>
        </div>
    );
};

export default Navbar;