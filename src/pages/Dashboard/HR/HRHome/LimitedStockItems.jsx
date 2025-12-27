import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";



const LimitedStockItems = () => {
    const axiosSecure = useAxiosSecure();

    const { data: limitedAssets = [], isLoading } = useQuery({
        queryKey: ["limited-stock-assets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/assets/limited-stock");
            return res.data;
        },
    });

    if (isLoading)
        return <div className="p-8 min-h-[200px]">
            <Skeleton height={40} width={200} className="mb-4" />
            <Skeleton count={5} className="mb-2" />
        </div>;

    return (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
            <h2 className="text-center text-2xl font-bold text-blue-700 mb-4">
                Limited Stock Items
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {limitedAssets.length === 0 && (
                    <p className="text-gray-500 col-span-2 text-center">
                        No limited stock assets found.
                    </p>
                )}

                {limitedAssets.map((asset) => (
                    <div
                        key={asset._id}
                        className="card p-4 border rounded-lg shadow-sm"
                    >
                        <h3 className="font-semibold text-lg">{asset.name}</h3>
                        <p>Type: {asset.type}</p>
                        <p>Available Quantity: {asset.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LimitedStockItems;
