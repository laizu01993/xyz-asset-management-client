import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TopRequestedAssets = () => {

    const axiosSecure = useAxiosSecure();

    // Fetch data from backend for top-requested-assets using tanstack query
    const { data: topAssets = [] } = useQuery({
        queryKey: ["top-requested-assets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/top-requested-assets");
            return res.data;
        }
    })
    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-blue-700 text-center mb-4">Top Requested Assets</h3>

            {topAssets.length === 0 ? (<p className="text-gray-400">No requests yet</p>) :
                (<ul className="space-y-3">
                    {topAssets.map((asset, index) => (
                        <li
                            key={asset._id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                            <span className="font-medium">{index + 1}. {asset.assetName}</span>
                            <span className="badge badge-primary">{asset.requestCount} requests</span>
                        </li>
                    ))}
                </ul>
                )}
        </div>
    );
};

export default TopRequestedAssets;