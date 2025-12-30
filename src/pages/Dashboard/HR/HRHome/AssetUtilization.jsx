import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AssetUtilization = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["asset-utilization"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/asset-utilization");
            return res.data;
        },
    });

    if (isLoading) {
        return <Skeleton height={150} />;
    }

    const {
        totalAssets,
        assignedAssets,
        availableAssets,
        utilizationPercent
    } = data;

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
                Asset Utilization
            </h2>

            <p className="text-3xl font-bold text-blue-600 mb-2">
                {utilizationPercent}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${utilizationPercent}%` }}
                ></div>
            </div>

            <div className="grid grid-cols-3 text-center gap-4">
                <div>
                    <p className="font-semibold">{totalAssets}</p>
                    <p className="text-sm text-gray-500">Total</p>
                </div>
                <div>
                    <p className="font-semibold">{assignedAssets}</p>
                    <p className="text-sm text-gray-500">Assigned</p>
                </div>
                <div>
                    <p className="font-semibold">{availableAssets}</p>
                    <p className="text-sm text-gray-500">Available</p>
                </div>
            </div>
        </div>
    );
};

export default AssetUtilization;
