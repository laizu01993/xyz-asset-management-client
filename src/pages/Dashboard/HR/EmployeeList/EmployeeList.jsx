import { useQuery } from "@tanstack/react-query";
import { FaUserTie, FaUser, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";

const EmployeeList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: employees = [], refetch, isLoading } = useQuery({
        queryKey: ["hr-employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/employees");
            return res.data;
        }
    });

    const handleRemove = async (id) => {
        const confirm = await Swal.fire({
            title: "Remove employee?",
            text: "This member will be removed from your team",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove"
        });

        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/hr/remove-employee/${id}`);
            refetch();
            Swal.fire("Removed!", "Employee removed from team", "success");
        }
    };

    if (isLoading)
        return <div className="p-8 min-h-[200px]">
            <Skeleton height={40} width={200} className="mb-4" />
            <Skeleton count={5} className="mb-2" />
        </div>

    return (
        <div className="p-6">
            <h2 className="text-3xl text-center font-bold text-blue-700 mb-6">
                My Employee Lists
            </h2>

            {/* Empty State */}
            {employees.length === 0 ? (
                <div className="text-center bg-white rounded-xl shadow p-12">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/7486/7486800.png"
                        alt="No employees"
                        className="w-40 mx-auto mb-4 opacity-70"
                    />
                    <h3 className="text-xl font-semibold text-gray-700">
                        No team members found
                    </h3>
                    <p className="text-gray-500 mt-2">
                        Employees will appear here once they join your company
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {employees.map(emp => (
                        <div
                            key={emp._id}
                            className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={emp.photo || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                    alt={emp.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {emp.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {emp.email}
                                    </p>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-4">
                                {emp.role === "hr" ? (
                                    <FaUserTie
                                        className="text-blue-600 text-xl"
                                        title="HR Manager"
                                    />
                                ) : (
                                    <FaUser
                                        className="text-gray-600 text-xl"
                                        title="Employee"
                                    />
                                )}

                                <button
                                    onClick={() => handleRemove(emp._id)}
                                    className="btn btn-sm btn-error"
                                    title="Remove from team"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default EmployeeList;
