import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";

const MyPendingRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ["my-pending-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/employee/my-pending-requests"
            );
            return res.data;
        },
    });

    
    if (isLoading)
        return <div className="p-8 min-h-[200px]">
            <Skeleton height={40} width={200} className="mb-4" />
            <Skeleton count={5} className="mb-2" />
        </div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
                My Pending Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-gray-500 text-center">
                    You have no pending requests 
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {requests.map((req) => (
                        <motion.div
                            key={req._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.60,
                                ease: "easeOut"
                            }}
                            className="card bg-blue-50 shadow-md border border-blue-200 rounded-xl"
                        >
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">
                                    {req.assetName}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Type:{" "}
                                    <span className="font-medium">
                                        {req.type}
                                    </span>
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
                                    <span className="badge badge-warning">
                                        Pending
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

export default MyPendingRequests;
