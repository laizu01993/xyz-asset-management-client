import MyMonthlyRequests from "./MyMonthlyRequests";
import MyPendingRequests from "./MyPendingRequests";

const EmployeeHome = () => {
    return (
        <div className="space-y-6 p-6">
            <MyPendingRequests></MyPendingRequests>
            <MyMonthlyRequests></MyMonthlyRequests>
        </div>
    );
};

export default EmployeeHome;