
import LimitedStockItems from "./LimitedStockItems";
import PendingRequests from "./PendingRequests";
import RequestTypePieChart from "./RequestTypePieChart";
import TopRequestedAssets from "./TopRequestedAssets";

const HRHome = () => {
    return (
        <div className="space-y-6 p-6">
            <PendingRequests></PendingRequests>
            <TopRequestedAssets></TopRequestedAssets>
           <LimitedStockItems></LimitedStockItems>
           <RequestTypePieChart></RequestTypePieChart>
        </div>
    );
};

export default HRHome;