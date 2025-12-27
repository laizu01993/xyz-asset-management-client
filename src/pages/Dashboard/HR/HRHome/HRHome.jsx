
import LimitedStockItems from "./LimitedStockItems";
import PendingRequests from "./PendingRequests";
import TopRequestedAssets from "./TopRequestedAssets";

const HRHome = () => {
    return (
        <div className="space-y-6 p-6">
            <PendingRequests></PendingRequests>
            <TopRequestedAssets></TopRequestedAssets>
           <LimitedStockItems></LimitedStockItems>
        </div>
    );
};

export default HRHome;