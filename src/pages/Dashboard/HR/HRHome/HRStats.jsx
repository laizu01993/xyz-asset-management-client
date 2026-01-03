// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

// const HRStats = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: stats = {}, isLoading } = useQuery({
//         queryKey: ["hr-stats"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/hr/stats");
//             return res.data;
//         }
//     });

//     if (isLoading) {
//         return <p>Loading stats...</p>;
//     }

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {/* Total Assets */}
//             <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500 text-sm">Total Assets</h3>
//                 <p className="text-3xl font-bold text-blue-600">
//                     {stats.totalAssets}
//                 </p>
//             </div>

//             {/* Total Requests */}
//             <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500 text-sm">Total Requests</h3>
//                 <p className="text-3xl font-bold text-green-600">
//                     {stats.totalRequests}
//                 </p>
//             </div>

//             {/* Pending Requests */}
//             <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500 text-sm">Pending Requests</h3>
//                 <p className="text-3xl font-bold text-orange-600">
//                     {stats.pendingRequests}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default HRStats;

import { useQuery } from "@tanstack/react-query";

import { FaBox, FaListAlt, FaClipboardList, FaClock } from "react-icons/fa";
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const { totalAssets = 0, totalQuantity = 0, totalRequests = 0, pendingRequests = 0 } = data;

    const stats = [
        {
            title: "Total Asset Types",
            value: totalAssets,
            icon: <FaBox className="text-4xl text-white" />,
            bg: "bg-blue-500"
        },
        {
            title: "Total Quantity",
            value: totalQuantity,
            icon: <FaListAlt className="text-4xl text-white" />,
            bg: "bg-green-500"
        },
        {
            title: "Total Requests",
            value: totalRequests,
            icon: <FaClipboardList className="text-4xl text-white" />,
            bg: "bg-yellow-500"
        },
        {
            title: "Pending Requests",
            value: pendingRequests,
            icon: <FaClock className="text-4xl text-white" />,
            bg: "bg-red-500"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            {stats.map((stat, index) => (
                <div key={index} className={`${stat.bg} flex items-center p-5 rounded-xl shadow-xl`}>
                    <div className="mr-4">{stat.icon}</div>
                    <div>
                        <p className="text-white font-bold text-2xl">{stat.value}</p>
                        <p className="text-white font-medium">{stat.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HRStats;

