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
    week: WEEK_LABELS[i],
    baseline: b,
    scenario: scenario[i],
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />

          <XAxis
            dataKey="week"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            width={60}
          />

          <Tooltip
            contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: 6 }}
            labelStyle={{ color: "#a1a1aa", marginBottom: 4 }}
            itemStyle={{ color: "#e4e4e7" }}
            formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
          />

          <Legend wrapperStyle={{ color: "#a1a1aa", fontSize: 12 }} />

          <Line type="monotone" dataKey="baseline" stroke="#8884d8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="scenario" stroke="#82ca9d" strokeWidth={2} dot={false} />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;