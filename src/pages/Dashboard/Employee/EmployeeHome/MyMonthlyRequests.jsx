import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyMonthlyRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ["my-monthly-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/employee/my-monthly-requests"
            );
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={36} width={220} className="mb-4" />
                <Skeleton count={4} height={110} className="mb-3" />
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
                My Monthly Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-gray-500 text-center">
                    You haven’t made any requests this month
                </p>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {requests.map((req) => (
                        <motion.div
                            key={req._id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="card bg-white shadow-md border border-blue-100 rounded-xl"
                        >
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">
                                    {req.assetName}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Type: <span className="font-medium">{req.type}</span>
                                </p>

                                <p className="text-sm text-gray-600">
                                    Requested on:{" "}
                                    {new Date(req.createdAt).toLocaleDateString()}
                                </p>

                                {req.note && (
                                    <p className="text-sm mt-2 text-gray-500">
                                        Note: {req.note}
                                    </p>
                                )}

                                <div className="mt-4">
                                    <span
                                        className={`badge ${req.status === "approved"
                                                ? "badge-success"
                                                : req.status === "rejected"
                                                    ? "badge-error"
                                                    : "badge-warning"
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyMonthlyRequests;
