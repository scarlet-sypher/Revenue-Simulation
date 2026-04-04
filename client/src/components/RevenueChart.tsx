import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  baseline: number[];
  scenario: number[];
};

function RevenueChart({ baseline, scenario }: Props) {
  const data = baseline.map((b, i) => ({
    week: `W${i + 1}`,
    baseline: b,
    scenario: scenario[i],
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="baseline" stroke="#8884d8" />
          <Line type="monotone" dataKey="scenario" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;