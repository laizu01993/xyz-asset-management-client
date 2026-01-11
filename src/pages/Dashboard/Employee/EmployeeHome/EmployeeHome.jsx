import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyMonthlyRequests from "./MyMonthlyRequests";
import MyPendingRequests from "./MyPendingRequests";
import SystemNotices from "./SystemNotices";
import Skeleton from "react-loading-skeleton";

// const EmployeeHome = () => {
//     return (
//         <div className="space-y-6 p-6">
//             <MyPendingRequests></MyPendingRequests>
//             <MyMonthlyRequests></MyMonthlyRequests>
//             <SystemNotices></SystemNotices>
//         </div>
//     );
// };

// export default EmployeeHome;

const EmployeeHome = () => {
    const axiosSecure = useAxiosSecure();

    // fetch logged-in user profile
    const { data: user = {}, isLoading } = useQuery({
        queryKey: ["employee-profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/profile");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={250} className="mb-4" />
                <Skeleton count={4} />
            </div>
        );
    }

    // Not affiliated with any company
    if (!user?.companyId) {
        return (
            <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                        You are not affiliated with any company
                    </h2>
                    <p className="text-gray-600">
                        Please contact your HR to get added to a company team.
                    </p>
                </div>

                {/* Notices can still be shown */}
                <SystemNotices />
            </div>
        );
    }

    // Affiliated employee
    return (
        <div className="space-y-8 p-6">
            <MyPendingRequests />
            <MyMonthlyRequests />
            <SystemNotices />
        </div>
    );
};

export default EmployeeHome;