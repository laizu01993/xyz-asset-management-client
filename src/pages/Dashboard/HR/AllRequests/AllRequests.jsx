import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // 🔹 Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["all-requests", debouncedSearch],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/hr/all-requests?search=${debouncedSearch}`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    // 🔹 Approve handler
    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: "Approve request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/hr/approve-request/${id}`);
        refetch();
    };

    // 🔹 Reject handler
    const handleReject = async (id) => {
        const confirm = await Swal.fire({
            title: "Reject request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject",
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/hr/reject-request/${id}`);
        refetch();
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
                All Asset Requests
            </h2>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by employee name or email"
                className="input input-bordered w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Loading */}
            {isLoading ? (
                <Skeleton height={200} />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-blue-50">
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
                                    <td className="font-medium">{req.assetName}</td>
                                    <td>{req.type}</td>
                                    <td>{req.employeeName}</td>
                                    <td>{req.employeeEmail}</td>
                                    <td>
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </td>
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
                                    <td>
                                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
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
                                        </div>
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
            )}
        </div>
    );
};

export default AllRequests;
