import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const JoinHRManager = () => {
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const [selectedPackage, setSelectedPackage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    // show password state
    const [showPassword, setShowPassword] = useState(false);

    const { createUser, updateUserProfile } = useContext(AuthContext);


    const handleSignUp = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const companyName = form.companyName.value;
        const companyLogo = form.companyLogo.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = e.target.dob.value;


        // reset error
        setErrorMessage("");

        // password validation
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            return;
        }

        if (!selectedPackage) {
            setErrorMessage("Please select a package");
            return;
        }

        // create user in firebase auth
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // update firebase profile
                updateUserProfile(name, photo)
                    .then(() => {
                        // create user entry in the database
                        const newHR = {
                            name,
                            email,
                            companyName,
                            companyLogo,
                            dob,
                            role: "hr",
                            package: selectedPackage
                        }
                        axiosPublic.post('/users', newHR)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    form.reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title:"HR manager created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('dashboard')
                                }
                            })
                    })
            })

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    Join as <span className="text-red-600">HR Manager</span>
                </h2>

                <form onSubmit={handleSignUp} className="grid grid-cols-1 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="label font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            name="name"
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Photo URL */}
                    <div>
                        <label className="label font-medium">Photo</label>
                        <input
                            type="text"
                            placeholder="photoURL"
                            name="photo"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="label font-medium">Company Name</label>
                        <input
                            type="text"
                            placeholder="Enter company name"
                            name="companyName"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Company Logo */}
                    <div>
                        <label className="label font-medium">Company Logo URL</label>
                        <input
                            type="text"
                            placeholder="Enter company logo URL"
                            name="companyLogo"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="label font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            className="input input-bordered w-full"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} type="button" className="btn btn-xs absolute right-4 mt-2">
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>
                    </div>
                    {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}

                    {/* DOB */}
                    <div>
                        <label className="label font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Package Select */}
                    <div>
                        <label className="label font-medium">Select a Package</label>
                        <select
                            className="select select-bordered w-full"
                            value={selectedPackage}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                        >
                            <option disabled value="">
                                Choose package
                            </option>
                            <option value="5">$5 — 5 Members</option>
                            <option value="8">$8 — 10 Members</option>
                            <option value="15">$15 — 20 Members</option>
                        </select>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg">
                        Signup as HR Manager
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinHRManager;
