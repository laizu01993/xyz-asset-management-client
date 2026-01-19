import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CheckoutForm = ({ amount, teamLimit, from }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {

            // update HR package AFTER successful payment
            await axiosSecure.patch("/hr/upgrade-package", {
                newLimit: teamLimit
            });

            Swal.fire({
                icon: "success",
                title: "Payment Successful",
                timer: 1500,
                showConfirmButton: false,
            });

            if (from === "signup") {
                navigate("/dashboard/hrHome");
            } else {
                navigate("/dashboard/addEmployee");
            }

        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement
                onChange={(event) => setIsFormComplete(event.complete)}
            />

            <button
                className="btn btn-primary w-full my-4"
                type="submit"
                disabled={!stripe || !elements || !isFormComplete || processing}
            >
                {processing ? "Processing..." : `Pay $${amount}`}
            </button>

            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
