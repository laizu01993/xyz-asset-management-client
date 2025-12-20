import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result =>{
            console.log(result.user)
        })
    }

    return (
        <div className="mt-6">
            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3
        border border-gray-300 py-2.5 px-4
        rounded-lg
        text-gray-700 font-medium
        transition-all duration-300
        hover:bg-green-50 hover:border-green-400
        hover:rounded-4xl hover:shadow-md"
            >
                <FaGoogle className="text-green-500 text-lg" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;