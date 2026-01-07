import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Profile = () => {
    const axiosSecure = useAxiosSecure();

    /* ================= GET PROFILE DATA ================= */
    const { data: user = {}, refetch, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/profile");
            return res.data;
        }
    });

    /* ================= LOCAL STATE ================= */
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    /* ================= SET DATA AFTER FETCH ================= */
    useEffect(() => {
        if (user?.name) {
            setName(user.name);
            setPhoto(user.photo || "");
        }
    }, [user]);

    /* ================= UPDATE HANDLER ================= */
    const handleUpdate = async (e) => {
        e.preventDefault();

        await axiosSecure.patch("/users/profile", {
            name,
            photo
        });

        Swal.fire("Updated!", "Profile updated successfully", "success");
        refetch();
    };

    if (isLoading) {
        return <div className="p-8 min-h-[200px]">
            <Skeleton height={40} width={200} className="mb-4" />
            <Skeleton count={5} className="mb-2" />
        </div>
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
                My Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">

                {/* NAME */}
                <div>
                    <label className="label">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* EMAIL (READ ONLY) */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* PHOTO */}
                <div>
                    <label className="label">Photo URL</label>
                    <input
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
