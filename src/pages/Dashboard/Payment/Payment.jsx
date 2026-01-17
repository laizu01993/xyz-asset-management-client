import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Added publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    // coming from signup or upgrade page
    const { amount, teamLimit, from } = location.state || {};

    const [clientSecret, setClientSecret] = useState();

    // protect direct access
    if (!amount || !teamLimit || !from) {
        return (
            <p className="text-center text-red-500">Invalid payment request</p>
        )
    }

    useEffect(() => {
        if (amount > 0) {
            axiosSecure
                .post("/create-payment-intent", { price: amount })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => {
                    console.error("Payment intent error:", err);
                });
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

    return (
        <div>
            <div>
                {clientSecret ? (<Elements stripe={stripePromise} options={options}>
                    <CheckoutForm></CheckoutForm>
                </Elements>) : (
                    <p>Loading payment...</p>
                )}
            </div>
        </div>
    );
};

export default Payment;