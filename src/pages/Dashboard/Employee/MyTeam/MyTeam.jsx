import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User, Shield } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();

    const { data: team = [], isLoading } = useQuery({
        queryKey: ["my-team"],
        queryFn: async () => {
            const res = await axiosSecure.get("/employee/my-team");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={30} width={180} className="mb-4" />
                <Skeleton count={4} height={80} className="mb-3" />
            </div>
        );
    }

    if (team.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No team members found
            </p>
        );
    }

    return (
        <div>
            <h2 className="text-3xl text-center p-6 font-bold text-blue-700 mb-6">
                My Team
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {team.map((member) => (
                    <motion.div
                        key={member._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition"
                    >
                        <div className="p-5 flex items-center gap-4">
                            {/* Avatar */}
                            <img
                                src={member.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt={member.name}
                                className="w-14 h-14 rounded-full object-cover border"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">
                                    {member.name}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    {member.role === "hr" ? (
                                        <>
                                            <Shield size={16} className="text-blue-600" />
                                            <span>HR</span>
                                        </>
                                    ) : (
                                        <>
                                            <User size={16} />
                                            <span>Employee</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MyTeam;
