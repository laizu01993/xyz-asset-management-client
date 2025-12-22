import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AssetList = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [sort, setSort] = useState("");

    const { data: assets = [], refetch, isLoading } = useQuery({
        queryKey: ["assets", search, status, type, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/assets?search=${search}&status=${status}&type=${type}&sort=${sort}`
            );
            return res.data;
        },
    });

    return (
        <>
            <Helmet>
                <title>HR | Asset list</title>
            </Helmet>
            <div className="p-6">
                {/* Page Title */}
                <h2 className="text-3xl text-center font-bold mb-6 text-blue-700">
                    Asset List
                </h2>

                {/* Search, Filter & Sort */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-xl shadow">
                    <input
                        type="text"
                        placeholder="Search by asset name"
                        className="input input-bordered"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="select select-bordered"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="available">Available</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>

                    <select
                        className="select select-bordered"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>

                    <select
                        className="select select-bordered"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort by Quantity</option>
                        <option value="asc">Low → High</option>
                        <option value="dsc">High → Low</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="table table-zebra">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Date Added</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {assets.map((asset, index) => (
                                <tr key={asset._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-semibold">{asset.name}</td>
                                    <td>{asset.type}</td>
                                    <td>{asset.quantity}</td>
                                    <td>
                                        <span
                                            className={`badge ${asset.availability === "available"
                                                ? "badge-success"
                                                : "badge-error"
                                                }`}
                                        >
                                            {asset.availability}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(asset.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="flex gap-2">
                                        <div className="tooltip" data-tip="Update Asset">
                                            <Link to="/dashboard/updateAsset">
                                                <button className="btn btn-sm btn-warning">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="tooltip tooltip-error" data-tip="Delete Asset">
                                            <button className="btn btn-sm btn-error">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {!isLoading && assets.length === 0 && (
                        <p className="text-center text-gray-500 py-6">
                            No assets found
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AssetList;
