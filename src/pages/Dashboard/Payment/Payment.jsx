// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// // Added publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {

//     const axiosSecure = useAxiosSecure();
//     const location = useLocation();


//     // coming from signup or upgrade page
//     const { amount, teamLimit, from } = location.state || {};


//     const [clientSecret, setClientSecret] = useState();

//     if (!amount || !teamLimit || !from) {
//         return <Navigate to="/dashboard/hrHome" replace />;
//     }

//     useEffect(() => {
//         if (amount > 0) {
//             axiosSecure
//                 .post("/hr/create-payment-intent", { price: amount })
//                 .then((res) => {
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch((err) => {
//                     console.error("Payment intent error:", err);
//                 });
//         }
//     }, [axiosSecure, amount]);

//     const appearance = {
//         theme: "stripe",
//         labels: "floating",
//     };

//     const options = {
//         clientSecret,
//         appearance,
//     };

//     return (
//         <div>
//             <Helmet>
//                 <title>HR | Payment</title>
//             </Helmet>
//             <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 md:p-8">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//                     {from === "signup"
//                         ? "Complete Your Signup Payment"
//                         : from === "upgrade"
//                             ? "Upgrade Your HR Package"
//                             : "Complete Payment"}
//                 </h2>
//                 {clientSecret ? (<Elements stripe={stripePromise} options={options}>
//                     <CheckoutForm
//                         amount={amount}
//                         teamLimit={teamLimit}
//                         from={from}></CheckoutForm>
//                 </Elements>) : (
//                     <p>Loading payment...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Payment;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    // coming from signup or upgrade page
    const state = location.state;

    // prevent accessing page without necessary data
    if (!state || !state.amount || !state.teamLimit || !state.from) {
        return <Navigate to="/dashboard/hrHome" replace />;
    }

    const { amount, teamLimit, from } = state;

    const [clientSecret, setClientSecret] = useState();

    useEffect(() => {
        if (amount > 0) {
            axiosSecure
                .post("/hr/create-payment-intent", { price: amount })
                .then((res) => setClientSecret(res.data.clientSecret))
                .catch((err) => console.error("Payment intent error:", err));
        }
    }, [axiosSecure, amount]);

    const appearance = {
        theme: "stripe",
        labels: "floating",
    };

    const options = {
        clientSecret,
        appearance,
    };

    // dynamic heading and subtext based on 'from'
    const headingText =
        from === "signup"
            ? "Complete Your Signup Payment"
            : from === "upgrade"
                ? "Upgrade Your HR Package"
                : "Complete Payment";

    const subText =
        from === "signup"
            ? `Finish your signup by making a payment of $${amount}.`
            : `You are about to upgrade your team limit to ${teamLimit} members for $${amount}.`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                    {headingText}
                </h2>
                <p className="text-gray-600 text-center mb-6">{subText}</p>

                {clientSecret ? (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm amount={amount} teamLimit={teamLimit} from={from} />
                    </Elements>
                ) : (
                    <p className="text-center text-gray-500">Loading payment...</p>
                )}
            </div>
        </div>
    );
};

export default Payment;

