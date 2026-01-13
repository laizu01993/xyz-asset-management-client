import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const AddEmployee = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedIds, setSelectedIds] = useState([]);

    /* ================= PACKAGE STATUS ================= */
    const { data: packageInfo = {}, refetch } = useQuery({
        queryKey: ["hr-package"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/package-status");
            return res.data;
        }
    });

    /* ================= FREE EMPLOYEES ================= */
    const { data: employees = [], refetch: refetchEmployees } = useQuery({
        queryKey: ["free-employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/free-employees");
            return res.data;
        }
    });

    /* ================= SELECT HANDLER ================= */
    const handleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    /* ================= ADD SINGLE ================= */
    const handleAddOne = async (id) => {
        await axiosSecure.patch(`/hr/add-employee/${id}`);
        Swal.fire("Added!", "Employee added to team", "success");
        refetch();
        refetchEmployees();
    };

    /* ================= ADD MULTIPLE ================= */
    const handleAddSelected = async () => {
        if (selectedIds.length === 0) {
            return Swal.fire("No Selection", "Select employees first", "warning");
        }

        await axiosSecure.patch("/hr/add-selected-employees", {
            employeeIds: selectedIds
        });

        Swal.fire("Success!", "Selected employees added", "success");
        setSelectedIds([]);
        refetch();
    };

    return (
        <>
            <Helmet>
                <title>HR | Add Employee</title>
            </Helmet>
            <div className="p-6 space-y-8">

                {/* ================= PACKAGE SECTION ================= */}
                <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-blue-700">Team Package</h2>
                        <p>Members: {packageInfo.teamCount} / {packageInfo.teamLimit}</p>
                    </div>

                    {!packageInfo.canAddMore && (
                        <Link to="/dashboard/upgradePackage">
                            <button className="btn btn-warning">
                                Upgrade Package
                            </button>
                        </Link>
                    )}
                </div>

                {/* ================= EMPLOYEE LIST ================= */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Available Employees</h2>

                    {employees.length === 0 ? (
                        <p className="text-gray-500">No available employees</p>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-4">
                                {employees.map(emp => (
                                    <div
                                        key={emp._id}
                                        className="border rounded-lg p-4 flex justify-between items-center"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(emp._id)}
                                                onChange={() => handleSelect(emp._id)}
                                            />
                                            <img
                                                src={emp.photo}
                                                className="w-12 h-12 rounded-full"
                                                alt=""
                                            />
                                            <p className="font-medium">{emp.name}</p>
                                        </div>

                                        <button
                                            onClick={() => handleAddOne(emp._id)}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>


                            <button
                                onClick={handleAddSelected}
                                className="btn btn-success mt-6"
                            >
                                Add Selected Members to Team
                            </button>

                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
