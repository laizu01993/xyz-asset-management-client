// import { useQuery } from "@tanstack/react-query";

// import { useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

// const AllRequests = () => {
//     const axiosSecure = useAxiosSecure();
//     const [search, setSearch] = useState("");

//     const { data: requests = [], isLoading, refetch } = useQuery({
//         queryKey: ["all-requests", search],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/hr/all-requests?search=${search}`);
//             return res.data;
//         },
//     });

//     const handleApprove = async (id) => {
//         await axiosSecure.patch(`/hr/approve-request/${id}`);
//         refetch();
//     };

//     const handleReject = async (id) => {
//         await axiosSecure.patch(`/hr/reject-request/${id}`);
//         refetch();
//     };


//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold text-blue-700 mb-4">
//                 All Asset Requests
//             </h2>

//             {/* Search Bar */}
//             <input
//                 type="text"
//                 placeholder="Search by name or email"
//                 className="input input-bordered w-full mb-4"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//             />

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     <thead>
//                         <tr>
//                             <th>Asset</th>
//                             <th>Type</th>
//                             <th>Requester</th>
//                             <th>Email</th>
//                             <th>Date</th>
//                             <th>Note</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {requests.map((req) => (
//                             <tr key={req._id}>
//                                 <td>{req.assetName}</td>
//                                 <td>{req.type}</td>
//                                 <td>{req.employeeName}</td>
//                                 <td>{req.employeeEmail}</td>
//                                 <td>{req.createdAt}</td>
//                                 <td>{req.note || "—"}</td>
//                                 <td>
//                                     <span className={`badge ${req.status === "pending"
//                                             ? "badge-warning"
//                                             : req.status === "approved"
//                                                 ? "badge-success"
//                                                 : "badge-error"
//                                         }`}>
//                                         {req.status}
//                                     </span>
//                                 </td>
//                                 <td className="space-x-2">
//                                     <button
//                                         disabled={req.status !== "pending"}
//                                         onClick={() => handleApprove(req._id)}
//                                         className="btn btn-xs btn-success"
//                                     >
//                                         Approve
//                                     </button>
//                                     <button
//                                         disabled={req.status !== "pending"}
//                                         onClick={() => handleReject(req._id)}
//                                         className="btn btn-xs btn-error"
//                                     >
//                                         Reject
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllRequests;

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const {
        data: requests = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ["all-requests", debouncedSearch],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/hr/all-requests?search=${debouncedSearch}`
            );
            return res.data;
        },
        keepPreviousData: true
    });

    const handleApprove = async (id) => {
        await axiosSecure.patch(`/hr/approve-request/${id}`);
        refetch();
    };

    const handleReject = async (id) => {
        await axiosSecure.patch(`/hr/reject-request/${id}`);
        refetch();
    };

    
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
                All Asset Requests
            </h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name or email"
                className="input input-bordered w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Requester</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.assetName}</td>
                                <td>{req.type}</td>
                                <td>{req.employeeName}</td>
                                <td>{req.employeeEmail}</td>
                                <td>{req.createdAt}</td>
                                <td>{req.note || "—"}</td>
                                <td>
                                    <span
                                        className={`badge ${req.status === "pending"
                                                ? "badge-warning"
                                                : req.status === "approved"
                                                    ? "badge-success"
                                                    : "badge-error"
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        disabled={req.status !== "pending"}
                                        onClick={() => handleApprove(req._id)}
                                        className="btn btn-xs btn-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        disabled={req.status !== "pending"}
                                        onClick={() => handleReject(req._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {requests.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No requests found
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllRequests;

