// import { useQuery } from "@tanstack/react-query";
// import { FaBox, FaListAlt, FaClipboardList, FaClock } from "react-icons/fa";
// import Skeleton from "react-loading-skeleton";
// import { motion } from "framer-motion"; 
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

// const HRStats = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data = {}, isLoading } = useQuery({
//         queryKey: ["hr-stats"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/hr/stats");
//             return res.data;
//         },
//     });


//     if (isLoading)
//         return (
//             <div className="p-8 min-h-[200px]">
//                 <Skeleton height={40} width={200} className="mb-4" />
//                 <Skeleton count={5} className="mb-2" />
//             </div>
//         );

//     const { totalAssets = 0, totalQuantity = 0, totalRequests = 0, pendingRequests = 0 } = data;

//     const stats = [
//         { title: "Total Asset Types", value: totalAssets, icon: <FaBox className="text-4xl text-white" />, bg: "bg-blue-500" },
//         { title: "Total Quantity", value: totalQuantity, icon: <FaListAlt className="text-4xl text-white" />, bg: "bg-green-500" },
//         { title: "Total Requests", value: totalRequests, icon: <FaClipboardList className="text-4xl text-white" />, bg: "bg-yellow-500" },
//         { title: "Pending Requests", value: pendingRequests, icon: <FaClock className="text-4xl text-white" />, bg: "bg-red-500" },
//     ];

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
//             {stats.map((stat, index) => (
//                 <motion.div
//                     key={index}
//                     className={`${stat.bg} flex items-center p-5 rounded-xl shadow-xl`}
//                     initial={{ opacity: 0, y: 30 }}     // start invisible, slightly below
//                     animate={{ opacity: 1, y: 0 }}      // animate to visible
//                     transition={{ duration: 0.5, delay: index * 0.2 }} // staggered effect
//                 >
//                     <div className="mr-4">{stat.icon}</div>
//                     <div>
//                         <p className="text-white font-bold text-2xl">{stat.value}</p>
//                         <p className="text-white font-medium">{stat.title}</p>
//                     </div>
//                 </motion.div>
//             ))}
//         </div>
//     );
// };

// export default HRStats;

import { useQuery } from "@tanstack/react-query";
import { FaBox, FaListAlt, FaClipboardList, FaClock } from "react-icons/fa";

import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const HRStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["hr-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/stats");
            return res.data;
        },
    });

    if (isLoading)
        return (
            <div className="p-8 min-h-[200px]">
                <Skeleton height={40} width={200} className="mb-4" />
                <Skeleton count={5} className="mb-2" />
            </div>
        );

    const { totalAssets = 0, totalQuantity = 0, totalRequests = 0, pendingRequests = 0 } = data;

    const stats = [
        { title: "Total Asset Types", value: totalAssets, icon: <FaBox className="text-4xl text-white" />, bg: "bg-blue-500" },
        { title: "Total Quantity", value: totalQuantity, icon: <FaListAlt className="text-4xl text-white" />, bg: "bg-green-500" },
        { title: "Total Requests", value: totalRequests, icon: <FaClipboardList className="text-4xl text-white" />, bg: "bg-yellow-500" },
        { title: "Pending Requests", value: pendingRequests, icon: <FaClock className="text-4xl text-white" />, bg: "bg-red-500" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    className={`${stat.bg} flex items-center p-5 rounded-xl shadow-xl cursor-pointer`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: [1, 1.02, 1], 
                    }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.2,
                        repeat: Infinity,  // continuous animation
                        repeatDelay: 2,    // wait 2s before repeating
                    }}
                    whileHover={{ scale: 1.05 }} // grow slightly on hover
                >
                    <div className="mr-4">{stat.icon}</div>
                    <div>
                        <p className="text-white font-bold text-2xl">{stat.value}</p>
                        <p className="text-white font-medium">{stat.title}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default HRStats;
