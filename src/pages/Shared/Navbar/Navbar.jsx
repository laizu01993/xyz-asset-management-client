// import { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useUserData from "../../../hooks/useUserData";

// const Navbar = () => {

//     const { user, logOut } = useContext(AuthContext);

//     const [userData] = useUserData();

//     const [open, setOpen] = useState(false);
//     let closeTimeout;


//     const handleLogOut = () => {
//         logOut()
//             .then(() => { })
//             .catch(error => console.log(error))
//     };

//     // default nav for visitors
//     const guestNav = <>
//         <li><a className="text-blue-600 hover:text-blue-400 transition text-lg font-medium">Home</a></li>

//         <li><Link to="/joinEmployee" className="hover:text-blue-600 transition text-lg font-medium">Join as Employee</Link></li>

//         <li><Link to="joinHRManager" className="hover:text-blue-600 transition text-lg font-medium">Join as HR Manager</Link></li>
//     </>;

//     const activeClass = "text-blue-600 font-medium text-lg";
//     const normalClass = "text-lg font-medium text-black hover:text-blue-500";


//     // menu for employee
//     const employeeNav = <>
//         <li>
//             <NavLink
//                 to="/dashboard/employeeHome"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Home
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/myRequestAssets"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 My Requested Assets
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/myTeam"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 My Team
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/requestAsset"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Request for an Asset
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/employeeProfile"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Profile
//             </NavLink>
//         </li>
//     </>;

//     // menu for HR manager
//     const hrNav = <>
//         <li>
//             <NavLink
//                 to="/dashboard/hrHome"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Home
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/assetLists"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Asset List
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/addAsset"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Add an Asset
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/allRequests"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 All Requests
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/employeeLists"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 My Employee List
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/addEmployee"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Add an Employee
//             </NavLink>
//         </li>

//         <li>
//             <NavLink
//                 to="/dashboard/hrProfile"
//                 className={({ isActive }) => isActive ? activeClass : normalClass}
//             >
//                 Profile
//             </NavLink>
//         </li>
//     </>;

//     // condition based on role
//     const navItems =
//         !user ? guestNav :
//             userData?.role === "hr" ? hrNav :
//                 userData?.role === "employee" ? employeeNav :
//                     guestNav;


//     return (
//         <div className="navbar sticky top-0 z-50 bg-black/30 backdrop-blur-md">
//             <div className="navbar-start">

//                 <div
//                     className="relative lg:hidden"
//                     onMouseEnter={() => {
//                         clearTimeout(closeTimeout);
//                         setOpen(true);
//                     }}
//                     onMouseLeave={() => {
//                         closeTimeout = setTimeout(() => {
//                             setOpen(false);
//                         }, 200);
//                     }}
//                 >
//                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                     </div>

//                     {/* Dropdown Menu */}
//                     <ul
//                         className={`absolute left-0 mt-3 w-52 bg-base-100 rounded-box shadow z-50
//       transition-all duration-800 ease-in-out
//       ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
//     `}
//                     >
//                         {navItems}
//                     </ul>
//                 </div>
//                 {/* <a className="btn btn-ghost text-4xl text-blue-900 font-bold">X<span className="text-red-600">Y</span>Z</a> */}
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">

//                     {navItems}
//                 </ul>
//             </div>
//             <div className="navbar-end">
//                 {
//                     user ? <>
//                         <div className="flex items-center gap-3">

//                             {/* Profile Photo */}
//                             <img
//                                 src={user.photoURL}
//                                 alt="profile"
//                                 className="w-10 h-10 rounded-full border"
//                             />

//                             {/* User Name */}
//                             <span className="font-semibold">{user.displayName}</span>

//                             {/* Logout Button */}
//                             <button
//                                 onClick={handleLogOut}
//                                 className="btn bg-red-600 text-white hover:bg-red-700"
//                             >
//                                 Logout
//                             </button>

//                         </div>
//                     </> :
//                         <><Link to="login">
//                             <button className="btn bg-blue-600 text-white hover:bg-blue-700">Log In</button>
//                         </Link></>
//                 }

//             </div>
//         </div>
//     );
// };

// export default Navbar;

import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useUserData from "../../../hooks/useUserData";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userData] = useUserData();

    const handleLogOut = () => {
        logOut().catch(console.log);
    };

    /* ================= DYNAMIC LOGO LOGIC ================= */

    const showXYZ =
        !user ||                              // not logged in
        !userData ||                         // user data not loaded
        (userData.role === "employee" && !userData.companyLogo);

    const companyLogo = userData?.companyLogo;

    /* ================= NAV CLASSES ================= */
    const activeClass = "text-blue-600 font-medium text-lg";
    const normalClass = "text-lg font-medium text-black hover:text-blue-500";

    /* ================= NAV ITEMS ================= */
    const guestNav = (
        <>
            <li><a className="text-blue-600 text-lg font-medium">Home</a></li>
            <li><Link to="/joinEmployee" className={normalClass}>Join as Employee</Link></li>
            <li><Link to="/joinHRManager" className={normalClass}>Join as HR Manager</Link></li>
        </>
    );

    const employeeNav = (
        <>
            <li><NavLink to="/dashboard/employeeHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
            <li><NavLink to="/dashboard/myRequestAssets" className={({ isActive }) => isActive ? activeClass : normalClass}>My Requested Assets</NavLink></li>
            <li><NavLink to="/dashboard/myTeam" className={({ isActive }) => isActive ? activeClass : normalClass}>My Team</NavLink></li>
            <li><NavLink to="/dashboard/requestAsset" className={({ isActive }) => isActive ? activeClass : normalClass}>Request Asset</NavLink></li>
            <li><NavLink to="/dashboard/employeeProfile" className={({ isActive }) => isActive ? activeClass : normalClass}>Profile</NavLink></li>
        </>
    );

    const hrNav = (
        <>
            <li><NavLink to="/dashboard/hrHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
            <li><NavLink to="/dashboard/assetLists" className={({ isActive }) => isActive ? activeClass : normalClass}>Asset List</NavLink></li>
            <li><NavLink to="/dashboard/addAsset" className={({ isActive }) => isActive ? activeClass : normalClass}>Add Asset</NavLink></li>
            <li><NavLink to="/dashboard/allRequests" className={({ isActive }) => isActive ? activeClass : normalClass}>All Requests</NavLink></li>
            <li><NavLink to="/dashboard/employeeLists" className={({ isActive }) => isActive ? activeClass : normalClass}>Employee List</NavLink></li>
            <li><NavLink to="/dashboard/addEmployee" className={({ isActive }) => isActive ? activeClass : normalClass}>Add Employee</NavLink></li>
            <li><NavLink to="/dashboard/hrProfile" className={({ isActive }) => isActive ? activeClass : normalClass}>Profile</NavLink></li>
        </>
    );

    const navItems =
        !user ? guestNav :
            userData?.role === "hr" ? hrNav :
                userData?.role === "employee" ? employeeNav :
                    guestNav;

    return (
        <div className="navbar sticky top-0 z-50 bg-black/30 backdrop-blur-md">
            <div className="navbar-start">
                {/* ================= DYNAMIC LOGO ================= */}
                {showXYZ ? (
                    <div className="btn btn-ghost text-4xl text-blue-900 font-bold">
                        X<span className="text-red-600">Y</span>Z
                    </div>
                ) : (
                    <div
                        className="tooltip tooltip-bottom"
                        data-tip={userData?.companyName}
                    >
                        <img
                            src={companyLogo}
                            alt="Company Logo"
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        />
                    </div>
                )}


            </div>

            {/* ================= DESKTOP MENU ================= */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={user.photoURL}
                            alt="profile"
                            className="w-10 h-10 rounded-full border"
                        />
                        <span className="font-semibold">{user.displayName}</span>
                        <button
                            onClick={handleLogOut}
                            className="btn bg-red-600 text-white hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="btn bg-blue-600 text-white hover:bg-blue-700">
                            Log In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;

