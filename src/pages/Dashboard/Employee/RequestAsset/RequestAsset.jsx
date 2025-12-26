import { useContext, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const RequestAsset = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState("");

    // Fetch assets (server-side search & filter)
    const { data: assets = [], refetch } = useQuery({
        queryKey: ["assets-employee", search, status, type],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/employee/assets?search=${search}&status=${status}&type=${type}`
            );
            return res.data;
        }
    });

    // Submit request
    const handleRequest = async () => {
        const requestData = {
            assetId: selectedAsset._id,
            assetName: selectedAsset.name,
            type: selectedAsset.type,
            employeeName: user.displayName,
            employeeEmail: user.email,
            note
        };

        const res = await axiosSecure.post("/requests", requestData);

        if (res.data.insertedId) {
            Swal.fire("Success", "Request submitted", "success");
            setSelectedAsset(null);
            setNote("");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                Request for an Asset
            </h2>

            {/* Search & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-xl shadow">
                <input
                    className="input input-bordered"
                    placeholder="Search by asset name"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select className="select select-bordered" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Availability</option>
                    <option value="available">Available</option>
                    <option value="out of stock">Out of stock</option>
                </select>

                <select className="select select-bordered" onChange={(e) => setType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* Assets List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assets.map(asset => (
                    <div key={asset._id} className="card bg-white shadow p-5">
                        <h3 className="text-xl font-semibold">{asset.name}</h3>
                        <p>Type: {asset.type}</p>
                        <p>
                            Status:
                            <span className={`ml-2 badge ${asset.availability === "available"
                                ? "badge-success"
                                : "badge-error"
                                }`}>
                                {asset.availability}
                            </span>
                        </p>

                        <button
                            className="btn btn-primary mt-3"
                            disabled={asset.availability !== "available"}
                            onClick={() => setSelectedAsset(asset)}
                        >
                            Request
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal Section */}
            {selectedAsset && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            Request: {selectedAsset.name}
                        </h3>

                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Additional notes (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />



                        <div className="modal-action">
                            <button className="btn btn-success" onClick={handleRequest}>
                                Submit Request
                            </button>
                            <button className="btn" onClick={() => setSelectedAsset(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default RequestAsset;