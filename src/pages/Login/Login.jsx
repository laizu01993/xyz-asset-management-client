import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const { logIn } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // clear previous error
        setErrorMessage("");

        // validation
        if (!email || !password) {
            setErrorMessage("Email and password are required");
            return;
        }

        // firebase login
        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch((error) => {
                console.log('error', error.message);
                setErrorMessage(error.message)
            })

    }

    return (
        <>
            <Helmet>
                <title>XYZ-asset-management |  Log In</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
                        Login
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Login to access your dashboard
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl text-lg"
                        >
                            Login
                        </button>
                    </form>

                    {/* Divider */}

                </div>
            </div>
        </>
    );
};

export default Login;