import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const JoinEmployee = () => {

    const [errorMessage, setErrorMessage] = useState("");

    // show password state
    const [showPassword, setShowPassword] = useState(false);


    const handleSignUp = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = e.target.dob.value;
        console.log(name, email, password, dob)


        // reset error
        setErrorMessage("");

        // password validation
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            return;
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 py-10">
            <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-blue-100">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
                    Join as an Employee
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Create your employee account to access your dashboard
                </p>

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            name="password"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button onClick={() => setShowPassword(!showPassword)} type="button" className="btn btn-xs absolute right-4 mt-2">
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>
                    </div>
                    {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 py-3 rounded-xl text-lg"
                    >
                        Sign Up
                    </button>

                </form>
            </div>
        </div>
    );
};

export default JoinEmployee;
