// import { useQuery } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Skeleton from "react-loading-skeleton";



// const Profile = () => {
//     const axiosSecure = useAxiosSecure();


//     /* ================= GET PROFILE DATA ================= */
//     // Fetch logged-in user's data
//     const { data: user = {}, refetch, isLoading } = useQuery({
//         queryKey: ["profile"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/users/profile"); 
//             console.log(res.data)// backend API
//             return res.data;

//         }
//     });

//     /* ================= LOCAL STATE FOR NAME ================= */
//     const [name, setName] = useState("");

//     /* ================= SET NAME AFTER FETCH ================= */
//     useEffect(() => {
//         if (user?.name) {
//             setName(user.name); // pre-fill the input with fetched name
//         }
//     }, [user]);

//     /* ================= UPDATE HANDLER ================= */
//     const handleUpdate = async (e) => {
//         e.preventDefault();

//         await axiosSecure.patch("/users/profile", { name }); // PATCH API sends only name

//         Swal.fire("Updated!", "Profile updated successfully", "success");
//         refetch(); // refetch user data after update
//     };

//     /* ================= LOADING STATE ================= */
//     if (isLoading) {
//         return <div className="p-8 min-h-[200px]">
//             <Skeleton height={40} width={200} className="mb-4" />
//             <Skeleton count={5} className="mb-2" />
//         </div>
//     }

//     return (
//         <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
//             <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
//                 My Profile
//             </h2>

//             <form onSubmit={handleUpdate} className="space-y-4">

//                 {/* NAME */}
//                 <div>
//                     <label className="label">Full Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>

//                 {/* EMAIL (READ ONLY) */}
//                 <div>
//                     <label className="label">Email</label>
//                     <input
//                         type="email"
//                         value={user.email || ""}
//                         readOnly
//                         className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
//                     />
//                 </div>

//                 {/* UPDATE BUTTON */}
//                 <button type="submit" className="btn btn-primary w-full">
//                     Update Profile
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Profile;

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
    const axiosSecure = useAxiosSecure();

    const [name, setName] = useState("");

    const [updating, setUpdating] = useState(false);

    /* ================= GET PROFILE DATA ================= */
    const { data: user = {}, refetch, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/profile");
            return res.data;
        },
    });

    /* ================= SET NAME AFTER FETCH ================= */
    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    /* ================= UPDATE HANDLER ================= */
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            await axiosSecure.patch("/users/profile", { name });
            Swal.fire({
                icon: "success",
                title: "Updated",
                text: "Profile updated successfully",
                timer: 1500,
                showConfirmButton: false,
            });
            refetch();
        } catch (err) {
            Swal.fire("Error", "Failed to update profile", "error");
        } finally {
            setUpdating(false);
        }
    };

    /* ================= LOADING ================= */
    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6">
                <Skeleton circle height={80} width={80} className="mb-4" />
                <Skeleton height={30} className="mb-2" />
                <Skeleton count={4} />
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
                
                <h2 className="text-2xl font-semibold">{user?.name}</h2>
                <p className="text-sm opacity-90">{user?.email}</p>
            </div>

            {/* FORM */}
            <form onSubmit={handleUpdate} className="p-6 space-y-5">

                {/* NAME */}
                <div>
                    <label className="label font-medium">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="label font-medium">Email</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg"
                    disabled={updating}
                >
                    {updating ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default Profile;





