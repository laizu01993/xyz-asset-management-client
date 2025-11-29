const PackagesSection = () => {
    return (
        <div className="py-20">
            <h2 className="text-4xl md:text-4xl font-bold text-center text-gray-900 mb-14">
                Our Packages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">

                {/* Card 1 */}
                <div className="bg-blue-100 hover:bg-blue-200 border border-blue-200 shadow-sm 
                                hover:shadow-xl hover:-translate-y-2 transition-all rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-semibold text-blue-700">Maximum 5 Employees</h3>
                    <p className="text-4xl font-bold text-blue-600 mt-4">$5</p>
                    <p className="text-gray-600 mt-2">Perfect for small teams</p>
                    <button className=" btn mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                        Choose Plan
                    </button>
                </div>

                {/* Card 2 */}
                <div className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg 
            hover:shadow-2xl hover:-translate-y-2 transition-all rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-semibold">Maximum 10 Employees</h3>
                    <p className="text-4xl font-bold mt-4">$8</p>
                    <p className="mt-2 opacity-90">Most popular plan</p>
                    <button className="btn mt-6 w-full py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-100 transition">
                        Choose Plan
                    </button>
                </div>

                {/* Card 3 */}
                <div className="bg-blue-100 hover:bg-blue-200 border border-blue-200 shadow-sm 
                                hover:shadow-xl hover:-translate-y-2 transition-all rounded-2xl  p-8 text-center">
                    <h3 className="text-xl font-semibold text-blue-700">Maximum 20 Employees</h3>
                    <p className="text-4xl font-bold text-blue-600 mt-4">$15</p>
                    <p className="text-gray-600 mt-2">For growing companies</p>
                    <button className="btn mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                        Choose Plan
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PackagesSection;
