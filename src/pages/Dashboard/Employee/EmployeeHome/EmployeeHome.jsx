import MyMonthlyRequests from "./MyMonthlyRequests";
import MyPendingRequests from "./MyPendingRequests";
import SystemNotices from "./SystemNotices";

const EmployeeHome = () => {
    return (
        <div className="space-y-6 p-6">
            <MyPendingRequests></MyPendingRequests>
            <MyMonthlyRequests></MyMonthlyRequests>
            <SystemNotices></SystemNotices>
        </div>
    );
};

export default EmployeeHome;