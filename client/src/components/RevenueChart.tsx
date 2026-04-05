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

const WEEK_LABELS = [
  "Jul W1", "Jul W2", "Jul W3", "Jul W4",
  "Aug W1", "Aug W2", "Aug W3", "Aug W4",
  "Sep W1", "Sep W2", "Sep W3", "Sep W4",
];


function RevenueChart({ baseline, scenario }: Props) {
  const data = baseline.map((b, i) => ({
    week: WEEK_LABELS[i] ,

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