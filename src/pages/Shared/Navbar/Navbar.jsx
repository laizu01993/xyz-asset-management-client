// import { useContext, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useUserData from "../../../hooks/useUserData";
// import { Bell, Menu, X } from "lucide-react";

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);

//     const [userData] = useUserData();

//     const location = useLocation();

//     const [menuOpen, setMenuOpen] = useState(false);

//     const [profileOpen, setProfileOpen] = useState(false);

//     const handleLogOut = () => {
//         logOut().catch(console.log);
//     };

//     /* LOGO */
//     const showXYZ =
//         !user || !userData || (userData.role === "employee" && !userData.companyLogo);

//     const companyLogo = userData?.companyLogo;

//     /* NAV STYLE */
//     const activeClass =
//         "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

//     const normalClass =
//         "text-gray-700 font-medium hover:text-blue-600 transition duration-200";

//     /* NAV ITEMS */
//     const guestNav = (
//         <>
//             <li><NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
//             <li><Link to="/joinEmployee" className={normalClass}>Join as Employee</Link></li>
//             <li><Link to="/joinHRManager" className={normalClass}>Join as HR Manager</Link></li>
//         </>
//     );

//     const employeeNav = (
//         <>
//             <li><NavLink to="/dashboard/employeeHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
//             <li><NavLink to="/dashboard/myRequestAssets" className={({ isActive }) => isActive ? activeClass : normalClass}>My Assets</NavLink></li>
//             <li><NavLink to="/dashboard/myTeam" className={({ isActive }) => isActive ? activeClass : normalClass}>My Team</NavLink></li>
//             <li><NavLink to="/dashboard/requestAsset" className={({ isActive }) => isActive ? activeClass : normalClass}>Request</NavLink></li>
//         </>
//     );

//     const hrNav = (
//         <>
//             <li><NavLink to="/dashboard/hrHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
//             <li><NavLink to="/dashboard/assetLists" className={({ isActive }) => isActive ? activeClass : normalClass}>Assets</NavLink></li>
//             <li><NavLink to="/dashboard/addAsset" className={({ isActive }) => isActive ? activeClass : normalClass}>Add</NavLink></li>
//             <li><NavLink to="/dashboard/allRequests" className={({ isActive }) => isActive ? activeClass : normalClass}>Requests</NavLink></li>
//         </>
//     );

//     const navItems =
//         !user ? guestNav :
//             userData?.role === "hr" ? hrNav :
//                 employeeNav;

//     return (
//         <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-sm">
//             <div className="navbar max-w-7xl mx-auto px-4">

//                 {/* LEFT */}
//                 <div className="navbar-start">

//                     {/* LOGO */}
//                     {showXYZ ? (
//                         <Link to="/" className="text-2xl font-bold text-blue-600">
//                             X<span className="text-black">YZ</span>
//                         </Link>
//                     ) : (
//                         <img
//                             src={companyLogo}
//                             alt="logo"
//                             className="w-10 h-10 rounded-full object-cover"
//                         />
//                     )}

//                     {/* MOBILE MENU */}
//                     <div className="lg:hidden  ml-3">
//                         <button
//                             onClick={() => setMenuOpen(prev => !prev)}
//                             className="btn btn-ghost text-xl hover:bg-gray-200 rounded-full"
//                         >
//                             {menuOpen ? (
//                                 <X className="w-6 h-6 text-gray-800" />
//                             ) : (
//                                 <Menu className="w-6 h-6 text-gray-800" />
//                             )}
//                         </button>

//                         {menuOpen && (
//                             <ul className="absolute mt-3 w-52 bg-white shadow-lg rounded-lg p-3 space-y-2">
//                                 {navItems}
//                             </ul>
//                         )}
//                     </div>
//                 </div>

//                 {/* CENTER */}
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal gap-6">
//                         {navItems}
//                     </ul>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="navbar-end flex items-center gap-4">

//                     {/* NOTIFICATION (ONLY DASHBOARD) */}
//                     {user && location.pathname.includes("/dashboard") && (


//                         <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition">

//                             {/* Icon */}
//                             <Bell className="w-5 h-5 text-gray-700" />

//                             {/* Notification dot */}
//                             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                         </button>
//                     )}

//                     {/* USER */}
//                     {user ? (
//                         <div className="relative">
//                             <img
//                                 onClick={() => setProfileOpen(!profileOpen)}
//                                 src={user.photoURL}
//                                 alt="profile"
//                                 className="w-9 h-9 rounded-full cursor-pointer border"
//                             />

//                             {profileOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
//                                     <p className="px-3 py-2 font-semibold text-sm">
//                                         {user.displayName}
//                                     </p>

//                                     <Link
//                                         to={userData?.role === "hr"
//                                             ? "/dashboard/hrProfile"
//                                             : "/dashboard/employeeProfile"}
//                                         className="block px-3 py-2 hover:bg-gray-100 rounded"
//                                     >
//                                         Profile
//                                     </Link>

//                                     <button
//                                         onClick={handleLogOut}
//                                         className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
//                                     >
//                                         Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <Link to="/login">
//                             <button className="btn bg-blue-600 text-white hover:bg-blue-700 rounded-full px-5">
//                                 Login
//                             </button>
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;

// import { useContext, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useUserData from "../../../hooks/useUserData";
// import { Bell, CheckCircle, Menu, Package, X } from "lucide-react";

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const [userData] = useUserData();
//     const location = useLocation();

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [profileOpen, setProfileOpen] = useState(false);
//     const [notifOpen, setNotifOpen] = useState(false);

//     const handleLogOut = () => {
//         logOut().catch(console.log);
//     };

//     /* ================= LOGO ================= */
//     const showXYZ =
//         !user || !userData || (userData.role === "employee" && !userData.companyLogo);

//     const companyLogo = userData?.companyLogo;

//     /* ================= NAV STYLE ================= */
//     const activeClass =
//         "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

//     const normalClass =
//         "text-gray-700 font-medium hover:text-blue-600 transition duration-200";

//     /* ================= NAV ITEMS ================= */
//     const guestNav = (
//         <>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
//             <li><Link onClick={() => setMenuOpen(false)} to="/joinEmployee" className={normalClass}>Join as Employee</Link></li>
//             <li><Link onClick={() => setMenuOpen(false)} to="/joinHRManager" className={normalClass}>Join as HR Manager</Link></li>
//         </>
//     );

//     const employeeNav = (
//         <>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/employeeHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/myRequestAssets" className={({ isActive }) => isActive ? activeClass : normalClass}>My Assets</NavLink></li>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/myTeam" className={({ isActive }) => isActive ? activeClass : normalClass}>My Team</NavLink></li>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/requestAsset" className={({ isActive }) => isActive ? activeClass : normalClass}>Request</NavLink></li>
//         </>
//     );

//     const hrNav = (
//         <>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/hrHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/assetLists" className={({ isActive }) => isActive ? activeClass : normalClass}>Assets</NavLink></li>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/addAsset" className={({ isActive }) => isActive ? activeClass : normalClass}>Add</NavLink></li>
//             <li><NavLink onClick={() => setMenuOpen(false)} to="/dashboard/allRequests" className={({ isActive }) => isActive ? activeClass : normalClass}>Requests</NavLink></li>
//         </>
//     );

//     const navItems =
//         !user ? guestNav :
//             userData?.role === "hr" ? hrNav :
//                 employeeNav;

//     return (
//         <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-sm">

//             <div className="navbar max-w-7xl mx-auto px-4">

//                 {/* ================= LEFT ================= */}
//                 <div className="navbar-start">

//                     {/* LOGO */}
//                     {showXYZ ? (
//                         <Link to="/" className="text-2xl font-bold text-blue-600">
//                             X<span className="text-black">YZ</span>
//                         </Link>
//                     ) : (
//                         <img
//                             src={companyLogo}
//                             alt="logo"
//                             className="w-10 h-10 rounded-full object-cover"
//                         />
//                     )}

//                     {/* MOBILE MENU */}
//                     <div className="lg:hidden ml-3">
//                         <button
//                             onClick={() => setMenuOpen(prev => !prev)}
//                             className="btn btn-ghost text-xl"
//                         >
//                             {menuOpen ? <X /> : <Menu />}
//                         </button>

//                         {menuOpen && (
//                             <ul className="absolute mt-3 w-52 bg-white shadow-lg rounded-lg p-3 space-y-2">
//                                 {navItems}
//                             </ul>
//                         )}
//                     </div>
//                 </div>

//                 {/* ================= CENTER ================= */}
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal gap-6">
//                         {navItems}
//                     </ul>
//                 </div>

//                 {/* ================= RIGHT ================= */}
//                 <div className="navbar-end flex items-center gap-4">

//                     {/* NOTIFICATION */}
//                     {user && location.pathname.includes("/dashboard") && (
//                         <div className="relative">

//                             <button
//                                 onClick={() => setNotifOpen(!notifOpen)}
//                                 className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
//                             >
//                                 <Bell className="w-5 h-5" />
//                                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
//                             </button>

//                             {/* dropdown */}
//                             {notifOpen && (
//                                 <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl p-3 border">

//                                     {/* HEADER */}
//                                     <div className="flex items-center gap-2 mb-3">
//                                         <Bell className="w-4 h-4 text-blue-600" />
//                                         <p className="font-semibold text-sm">Notifications</p>
//                                     </div>

//                                     {/* LIST */}
//                                     <div className="space-y-3 text-sm">

//                                         <div className="flex items-center gap-2">
//                                             <CheckCircle className="w-4 h-4 text-green-500" />
//                                             <p>Request approved</p>
//                                         </div>

//                                         <div className="flex items-center gap-2">
//                                             <Package className="w-4 h-4 text-orange-500" />
//                                             <p>New asset added</p>
//                                         </div>

//                                     </div>
//                                 </div>
//                             )}

//                             {/* ================= PROFILE ================= */}
//                             {user ? (
//                                 <div className="relative">

//                                     <img
//                                         onClick={() => setProfileOpen(!profileOpen)}
//                                         src={user.photoURL}
//                                         alt="profile"
//                                         className="w-9 h-9 rounded-full cursor-pointer border"
//                                     />

//                                     {profileOpen && (
//                                         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">

//                                             <p className="px-3 py-2 font-semibold text-sm">
//                                                 {user.displayName}
//                                             </p>

//                                             <Link
//                                                 to={userData?.role === "hr"
//                                                     ? "/dashboard/hrProfile"
//                                                     : "/dashboard/employeeProfile"}
//                                                 className="block px-3 py-2 hover:bg-gray-100 rounded"
//                                             >
//                                                 Profile
//                                             </Link>

//                                             <button
//                                                 onClick={handleLogOut}
//                                                 className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
//                                             >
//                                                 Logout
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <Link to="/login">
//                                     <button className="btn bg-blue-600 text-white hover:bg-blue-700 rounded-full px-5">
//                                         Login
//                                     </button>
//                                 </Link>
//                             )}

//                         </div>
//             </div>
//             </div>
//             );
// };

//             export default Navbar;

import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useUserData from "../../../hooks/useUserData";
import { Bell, Menu, X } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {

    const axiosSecure = useAxiosSecure();

    const { user, logOut, loading } = useContext(AuthContext);
    const [userData] = useUserData();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    // Unread count
    const { data: unreadData, refetch: refetchCount } = useQuery({
        queryKey: ["unread-count", user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/notifications/unread-count");
            return res.data;
        }
    })

    // Notifications list
    const { data: notifications = [], refetch } = useQuery({
        queryKey: ["notifications"],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/notifications");
            return res.data;
        }
    })

    const handleOpenNotif = async () => {
        setNotifOpen(prev => {
            const next = !prev;

            if (!prev) {
                axiosSecure.patch("/notifications/mark-all-read")
                    .then(() => {
                        refetch();
                        refetchCount();
                    });
            }

            return next;
        });
    };

    const handleLogOut = () => {
        logOut().catch(console.log);
    };

    /* LOGO */
    const showXYZ =
        !user || !userData || (userData.role === "employee" && !userData.companyLogo);

    const companyLogo = userData?.companyLogo;

    /* NAV STYLE */
    const activeClass =
        "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

    const normalClass =
        "text-gray-700 font-medium hover:text-blue-600 transition duration-200";

    /* NAV ITEMS */

    const guestNav = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
            <li><Link to="/joinEmployee" className={normalClass}>Join as Employee</Link></li>
            <li><Link to="/joinHRManager" className={normalClass}>Join as HR Manager</Link></li>
        </>
    );

    const employeeNav = (
        <>
            <li><NavLink to="/dashboard/employeeHome" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
            <li><NavLink to="/dashboard/myRequestAssets" className={({ isActive }) => isActive ? activeClass : normalClass}>My Assets</NavLink></li>
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
                employeeNav;

    return (
        <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-sm">

            <div className="navbar max-w-7xl mx-auto px-4">

                {/* LEFT */}
                <div className="navbar-start">

                    {showXYZ ? (
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            X<span className="text-black">YZ</span>
                        </Link>
                    ) : (
                        <img
                            src={companyLogo}
                            alt="logo"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    )}

                    {/* MOBILE MENU */}
                    <div className="lg:hidden ml-3">
                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className="btn btn-ghost text-xl"
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>

                        {menuOpen && (
                            <ul className="absolute mt-3 w-52 bg-white shadow-lg rounded-lg p-3 space-y-2">
                                {navItems}
                            </ul>
                        )}
                    </div>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6">
                        {navItems}
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end flex items-center gap-4">

                    {/* NOTIFICATION (ONLY DASHBOARD) */}
                    {user && location.pathname.includes("/dashboard") && (
                        <div className="relative">

                            <button
                                onClick={handleOpenNotif}
                                className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-gray-100"
                            >
                                <Bell className="w-5 h-5 text-gray-700" />

                                {unreadData?.count > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                                        {unreadData.count}
                                    </span>
                                )}
                            </button>

                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl p-3">

                                    <p className="font-semibold text-sm mb-2">
                                        Notifications
                                    </p>

                                    <div className="space-y-2 text-sm max-h-60 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <p className="text-gray-500">No notifications</p>
                                        ) : (
                                            notifications.map((n) => (
                                                <div
                                                    key={n._id}
                                                    onClick={async () => {
                                                        await axiosSecure.patch(`/notifications/read/${n._id}`);
                                                        await refetch();
                                                        await refetchCount();
                                                    }}
                                                    className={`p-2 rounded cursor-pointer ${n.isRead ? "opacity-50" : "font-semibold bg-gray-100"
                                                        }`}
                                                >
                                                    {n.message}
                                                </div>
                                            ))
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    )}

                    {/* PROFILE */}
                    {user ? (
                        <div className="relative">
                            <img
                                onClick={() => setProfileOpen(!profileOpen)}
                                src={user.photoURL}
                                className="w-9 h-9 rounded-full border cursor-pointer"
                            />

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">

                                    <p className="px-3 py-2 font-semibold text-sm">
                                        {user.displayName}
                                    </p>

                                    <Link
                                        to={userData?.role === "hr"
                                            ? "/dashboard/hrProfile"
                                            : "/dashboard/employeeProfile"}
                                        className="block px-3 py-2 hover:bg-gray-100 rounded"
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        onClick={handleLogOut}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn bg-blue-600 text-white rounded-full px-5">
                                Login
                            </button>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;