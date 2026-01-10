import { Info, CalendarDays, ShieldCheck } from "lucide-react";

const SystemNotices = () => {
    const notices = [
        {
            id: 1,
            title: "Welcome to the Employee Portal",
            description:
                "Please make sure your profile information is accurate and up to date.",
            icon: Info,
        },
        {
            id: 2,
            title: "Asset Request Policy",
            description:
                "All asset requests require HR approval before being assigned.",
            icon: ShieldCheck,
        },
        {
            id: 3,
            title: "Monthly Review Reminder",
            description:
                "You can review all your submitted requests from the current month.",
            icon: CalendarDays,
        },
    ];

    return (
        <section className="mt-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
                System Notices
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {notices.map((notice) => {
                    const Icon = notice.icon;

                    return (
                        <div
                            key={notice.id}
                            className="bg-white border border-blue-100 rounded-xl shadow-sm p-5 hover:shadow-md transition"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                    <Icon size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {notice.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {notice.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SystemNotices;
