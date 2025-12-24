import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";

const UpdateAsset = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    // get data using tanstack
    const { data: asset, isLoading } = useQuery({
        queryKey: ["assets", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/${id}`);
            return res.data;
        },
        enabled: !!id
    });

    // handle update submit
    const handleUpdateAsset = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productType = form.productType.value;
        const productQuantity = parseInt(form.productQuantity.value);

        setErrorMessage("");

        // Validation
        if (isLoading) {
            return (
                <div className="p-8">
                    <Skeleton height={40} width={200} />
                    <Skeleton count={5} />
                </div>
            );
        }

        if (!asset) {
            return <p className="text-center text-red-500">Asset not found</p>;
        }

        if (!productName || !productType || !productQuantity) {
            setErrorMessage("All fields are required");
            return;
        }

        if (productQuantity <= 0) {
            setErrorMessage("Quantity must be greater than 0");
            return;
        }

        // Send asset data to backend or Firebase
        const updatedAsset = {
            name: productName,
            type: productType,
            quantity: productQuantity,
            availability: productQuantity > 0 ? "available" : "out of stock",
            updatedAt: new Date().toLocaleString()
        };

        const res = await axiosSecure.patch(`/assets/${id}`, updatedAsset);

        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: `${asset.name} is  updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/assetLists");
        }
    };

    if (isLoading) {
        return <div className="p-8">
            <Skeleton height={40} width={200} />
            <Skeleton count={5} />
        </div>
    }


    return (
        <>
            <Helmet>
                <title>HR | Update Asset</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
                <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-blue-100">

                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
                        Update Asset
                    </h2>

                    <form onSubmit={handleUpdateAsset} className="space-y-5">

                        {/* Product Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="productName"
                                defaultValue={asset?.name || ""}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Product Type */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Product Type
                            </label>
                            <select
                                name="productType"
                                defaultValue={asset?.type || "Returnable"}
                                className="select select-bordered w-full"
                            >
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>

                        {/* Product Quantity */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Product Quantity
                            </label>
                            <input
                                type="number"
                                name="productQuantity"
                                defaultValue={asset?.quantity || 1}
                                min={1}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Error */}
                        {errorMessage && (
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl text-lg"
                        >
                            Update Asset
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateAsset;