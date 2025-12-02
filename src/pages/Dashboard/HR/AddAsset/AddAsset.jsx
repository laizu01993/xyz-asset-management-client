import { useState } from "react";

const AddAsset = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddAsset = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;

    setErrorMessage("");

    if (!productName || !productType || !productQuantity) {
      setErrorMessage("All fields are required");
      return;
    }

    if (productQuantity <= 0) {
      setErrorMessage("Quantity must be greater than 0");
      return;
    }

    // TODO: Send asset data to backend or Firebase
    console.log({ productName, productType, productQuantity });

    // Reset form
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Add a New Asset
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Add a new asset to your company inventory
        </p>

        {/* Form */}
        <form onSubmit={handleAddAsset} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Type
            </label>
            <select
              name="productType"
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option disabled selected>
                Select product type
              </option>
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
              placeholder="Enter quantity"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={1}
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}

          {/* Add Button */}
          <button
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl text-lg"
          >
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
