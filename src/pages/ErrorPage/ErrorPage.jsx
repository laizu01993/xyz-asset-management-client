import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
            <div className="max-w-lg w-full text-center bg-slate-900/70 border border-slate-700 rounded-2xl p-8 shadow-xl">

                {/* Error Code */}
                <h1 className="text-7xl font-extrabold text-red-500 mb-4">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-2">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                    Please check the URL or return to the homepage.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="btn btn-primary px-6"
                    >
                        Go to Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline btn-error px-6"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
