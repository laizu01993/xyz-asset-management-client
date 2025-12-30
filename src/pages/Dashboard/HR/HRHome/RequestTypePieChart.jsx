import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#FF8042"]; // Returnable: blue, Non-returnable: orange

const RequestTypePieChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = [], isLoading } = useQuery({
        queryKey: ["request-type-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr/requests-type-stats");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="p-8 min-h-[300px]">
                <Skeleton height={40} width={200} className="mb-4" />
                <Skeleton count={5} />
            </div>
        );
    }

    // Custom shape for the pie chart
    const RADIAN = Math.PI / 180;


    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={14}
                fontWeight="bold"
            >
                {(percent * 100).toFixed(0)}%
            </text>
        );
    };

    const formattedData = stats.map(item => ({
        name: item._id,
        value: item.count
    }));

    return (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
            <h2 className="text-center text-2xl font-bold text-blue-700 mb-4">
                Requests: Returnable vs Non-returnable
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        startAngle={90}
                        endAngle={-270}
                        animationDuration={1200}
                        animationEasing="ease-out"
                        label={renderCustomizedLabel}
                        dataKey="value"
                        nameKey="name"
                        fill="#8884d8"
                        isAnimationActive={true}
                    >
                        {formattedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RequestTypePieChart;