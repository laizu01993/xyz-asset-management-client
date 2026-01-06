import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UpgradePackage = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    /* ================= CURRENT PACKAGE STATUS ================= */
    const { data: packageInfo = {}, refetch } = useQuery({
        queryKey: ["hr-package"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/package-status");
            return res.data;
        }
    });

    /* ================= UPGRADE HANDLER ================= */
    const handleUpgrade = async (newLimit, price) => {
        const confirm = await Swal.fire({
            title: "Confirm Upgrade",
            text: `Upgrade to ${newLimit} members for $${price}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Upgrade"
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch("/hr/upgrade-package", {
            newLimit
        });

        Swal.fire("Success!", "Package upgraded successfully", "success");
        refetch();
        navigate("/dashboard/addEmployee");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
                Upgrade Your Package
            </h1>

            {/* ================= CURRENT STATUS ================= */}
            <div className="bg-white shadow rounded-xl p-6 mb-10 text-center">
                <p className="text-lg">
                    Current Team Size:{" "}
                    <span className="font-bold text-blue-600">
                        {packageInfo.teamCount} / {packageInfo.teamLimit}
                    </span>
                </p>
            </div>

            {/* ================= PACKAGE CARDS ================= */}
            <div className="grid md:grid-cols-3 gap-6">

                {/* ===== PACKAGE 1 ===== */}
                <div className="border rounded-xl p-6 text-center shadow">
                    <h2 className="text-xl font-bold">Basic</h2>
                    <p className="text-3xl font-bold my-4">$5</p>
                    <p className="mb-6">5 Team Members</p>

                    <button
                        disabled={packageInfo.teamLimit >= 5}
                        onClick={() => handleUpgrade(5, 5)}
                        className="btn btn-primary w-full"
                    >
                        Upgrade
                    </button>
                </div>

                {/* ===== PACKAGE 2 ===== */}
                <div className="border rounded-xl p-6 text-center shadow">
                    <h2 className="text-xl font-bold">Pro</h2>
                    <p className="text-3xl font-bold my-4">$8</p>
                    <p className="mb-6">10 Team Members</p>

                    <button
                        disabled={packageInfo.teamLimit >= 10}
                        onClick={() => handleUpgrade(10, 8)}
                        className="btn btn-primary w-full"
                    >
                        Upgrade
                    </button>
                </div>

                {/* ===== PACKAGE 3 ===== */}
                <div className="border rounded-xl p-6 text-center shadow">
                    <h2 className="text-xl font-bold">Premium</h2>
                    <p className="text-3xl font-bold my-4">$15</p>
                    <p className="mb-6">20 Team Members</p>

                    <button
                        disabled={packageInfo.teamLimit >= 20}
                        onClick={() => handleUpgrade(20, 15)}
                        className="btn btn-primary w-full"
                    >
                        Upgrade
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UpgradePackage;
