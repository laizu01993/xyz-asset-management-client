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
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RequestTypePieChart;