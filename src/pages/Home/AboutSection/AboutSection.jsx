const AboutSection = () => {
    return (
        <div className="mt-10">
            <h2 className="text-4xl text-gray-900 font-bold text-center mb-6">
                About Our Asset Management System
            </h2>

            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
                Our Asset Management System is designed to simplify how organizations
                manage their resources. From assigning assets to employees, monitoring
                requests, tracking returns and managing inventory — everything becomes
                faster, easier, and organized.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {/* Card 1 */}
                <div className="p-6 border rounded-lg shadow-sm bg-blue-100 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-3">For HR Managers</h3>
                    <p className="text-gray-600">
                        Add and manage company assets, approve requests, track asset
                        usage, and handle employee assignments effortlessly from a single dashboard.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 border rounded-lg shadow-sm bg-blue-100 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-3">For Employees</h3>
                    <p className="text-gray-600">
                        Request assets, track request status, view assigned items, and
                        stay updated with your team and asset allocations.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="p-6 border rounded-lg shadow-sm bg-blue-100 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                    <p className="text-gray-600">
                        To provide a seamless and efficient asset management experience
                        that reduces manual workload, increases productivity, and ensures
                        transparent resource usage across organizations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
