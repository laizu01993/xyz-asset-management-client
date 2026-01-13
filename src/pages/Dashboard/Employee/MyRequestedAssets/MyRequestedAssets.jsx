import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, XCircle, RotateCcw, Printer } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const MyRequestedAssets = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["my-requests", search, status, type],
        queryFn: async () => {
            const res = await axiosSecure.get("/employee/my-requests", {
                params: { search, status, type },
            });
            return res.data;
        },
    });

    // cancel request
    const handleCancel = async (id) => {
        await axiosSecure.patch(`/employee/cancel-request/${id}`);
        refetch();
    };

    // return asset
    const handleReturn = async (id) => {
        await axiosSecure.patch(`/employee/return-asset/${id}`);
        refetch();
    };

    if (isLoading) {
        return <div className="max-w-xl mx-auto mt-10 p-6">
            <Skeleton circle height={80} width={80} className="mb-4" />
            <Skeleton height={30} className="mb-2" />
            <Skeleton count={4} />
        </div>;
    }

    return (
        <>
            <Helmet>
                <title>Employee | RequestedAssets</title>
            </Helmet>

            <div className="p-6 space-y-6">
                {/* Page Title */}
                <h2 className="text-3xl font-bold text-blue-700 text-center">My Requested Assets</h2>

                {/* Search & Filter Section */}
                <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by asset name..."
                            className="input input-bordered w-full pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        className="select select-bordered"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="returned">Returned</option>
                    </select>

                    {/* Type Filter */}
                    <select
                        className="select select-bordered"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>

                {/* Asset List */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="table">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Request Date</th>
                                <th>Approval Date</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((item) => (
                                <tr key={item._id} className="hover">
                                    <td className="font-medium">{item.assetName}</td>
                                    <td className="capitalize">{item.type}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {item.approvedAt
                                            ? new Date(item.approvedAt).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${item.status === "pending"
                                                ? "badge-warning"
                                                : item.status === "approved"
                                                    ? "badge-success"
                                                    : "badge-neutral"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="flex gap-2 justify-center">
                                        {item.status === "pending" && (
                                            <button
                                                onClick={() => handleCancel(item._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        )}

                                        {item.status === "approved" && (
                                            <>
                                                <button className="btn btn-sm btn-outline">
                                                    <Printer size={16} />
                                                </button>

                                                {item.type === "returnable" && (
                                                    <button
                                                        onClick={() => handleReturn(item._id)}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        <RotateCcw size={16} />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {requests.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No requested assets found.
                        </div>
                    )}
                </div>
            </div></>
    );
};

export default MyRequestedAssets;
