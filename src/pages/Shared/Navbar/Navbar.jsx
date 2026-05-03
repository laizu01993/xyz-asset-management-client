import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useUserData from "../../../hooks/useUserData";
import { Bell, Menu, X } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const axiosSecure = useAxiosSecure();

    const { user, logOut, loading } = useContext(AuthContext);
    const [userData] = useUserData();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifLoading, setNotifLoading] = useState(false);

    // Outside click detection
    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Notifications

    const { data: unreadData, refetch: refetchCount } = useQuery({
        queryKey: ["unread-count", user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/notifications/unread-count");
            return res.data;
        }
    });

    const { data: notifications = [], refetch } = useQuery({
        queryKey: ["notifications", user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            setNotifLoading(true);
            const res = await axiosSecure.get("/notifications");
            setNotifLoading(false);
            return res.data;
        }
    });

    // Outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
            // MOBILE MENU (NEW FIX)
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Open notification
    const handleOpenNotif = async () => {
        const next = !notifOpen;
        setNotifOpen(next);

        if (!notifOpen) {
            await axiosSecure.patch("/notifications/mark-all-read");
            refetch();
            refetchCount();
        }
    };

    const handleLogOut = () => {
        logOut().catch(console.log);
    };

    // Nav data

    const showXYZ =
        !user || !userData || (userData.role === "employee" && !userData.companyLogo);

    const companyLogo = userData?.companyLogo;

    const activeClass =
        "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

    const normalClass =
        "text-gray-700 font-medium hover:text-blue-600 transition duration-200";

    const guestNav = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>
            <li><Link to="/joinEmployee"
                className={normalClass}>Join as Employee</Link></li>
            <li><Link to="/joinHRManager" className={normalClass}>Join as HR Manager</Link></li>
        </>
    );

    const employeeNav = (
        <>
            <li><NavLink to="/dashboard/employeeHome" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>

            <li><NavLink to="/dashboard/myRequestAssets" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>My Assets</NavLink></li>

            <li><NavLink to="/dashboard/myTeam" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>My Team</NavLink></li>

            <li><NavLink to="/dashboard/requestAsset" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Request Asset</NavLink></li>

            <li><NavLink to="/dashboard/employeeProfile" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Profile</NavLink></li>
        </>
    );

    const hrNav = (
        <>
            <li><NavLink to="/dashboard/hrHome" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink></li>

            <li><NavLink to="/dashboard/assetLists" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Asset List</NavLink></li>

            <li><NavLink to="/dashboard/addAsset" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Add Asset</NavLink></li>

            <li><NavLink to="/dashboard/allRequests" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>All Requests</NavLink></li>

            <li><NavLink to="/dashboard/employeeLists" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Employee List</NavLink></li>

            <li><NavLink to="/dashboard/addEmployee" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Add Employee</NavLink></li>

            <li><NavLink to="/dashboard/hrProfile" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Profile</NavLink></li>
        </>
    );

    const navItems =
        !user ? guestNav :
            userData?.role === "hr" ? hrNav :
                employeeNav;

    return (
        <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-4">

                {/* Left */}
                <div className="navbar-start">
                    {showXYZ ? (
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            X<span className="text-black">YZ</span>
                        </Link>
                    ) : (
                        <img src={companyLogo} className="w-10 h-10 rounded-full" />
                    )}

                    <div ref={menuRef} className="lg:hidden ml-3 relative">
                        <button
                            onClick={() => setMenuOpen(p => !p)}
                            className="btn btn-ghost text-xl"
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="absolute mt-3 w-52 bg-white shadow-lg rounded-lg p-3 space-y-2"
                                >
                                    {navItems}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6">
                        {navItems}
                    </ul>
                </div>

                {/* Right */}
                <div className="navbar-end flex items-center gap-4">

                    {/* Notifications */}
                    {user && location.pathname.includes("/dashboard") && (
                        <div ref={notifRef} className="relative">

                            <button
                                onClick={handleOpenNotif}
                                className="w-10 h-10 flex items-center justify-center border rounded-full"
                            >
                                <Bell className="w-5 h-5" />

                                {unreadData?.count > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                                        {unreadData.count}
                                    </span>
                                )}
                            </button>

                            <AnimatePresence>
                                {notifOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl p-3"
                                    >
                                        <p className="font-semibold text-sm mb-2">
                                            Notifications
                                        </p>

                                        {/* Loading state */}
                                        {notifLoading ? (
                                            <div className="space-y-2">
                                                {[1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="p-3 rounded-lg bg-gray-100 animate-pulse"
                                                    >
                                                        <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
                                                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-2 text-sm max-h-60 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <p className="text-gray-500">No notifications</p>
                                                ) : (
                                                    notifications.map((n) => (
                                                        <div
                                                            key={n._id}
                                                            className={`p-2 rounded ${n.isRead
                                                                ? "text-gray-500"
                                                                : "font-bold bg-gray-100  text-gray-800"
                                                                }`}
                                                        >
                                                            {n.message}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Profile*/}
                    {user ? (
                        <div ref={profileRef} className="relative">
                            <img
                                onClick={() => setProfileOpen(p => !p)}
                                src={user.photoURL}
                                className="w-9 h-9 rounded-full cursor-pointer"
                            />

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                                    <p className="px-3 py-2 font-semibold text-sm">
                                        {user.displayName}
                                    </p>

                                    <button onClick={handleLogOut} className="text-red-500 w-full text-left px-3 py-2">
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
        </div >
    );
};

export default Navbar;

