import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";


const PendingRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ["pending-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/pending-requests");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="p-8 min-h-[200px]">
                <Skeleton height={40} width={200} className="mb-4" />
                <Skeleton count={5} className="mb-2" />
              </div>;
    }

    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
                Pending Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-gray-500">No pending requests</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th>#</th>
                                <th>Employee</th>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Request Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id}>
                                    <td>{index + 1}</td>
                                    <td>{req.employeeName}</td>
                                    <td>{req.assetName}</td>
                                    <td>{req.type}</td>
                                    <td>
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingRequests;
