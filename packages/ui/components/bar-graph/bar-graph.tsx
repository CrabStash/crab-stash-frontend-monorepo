import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export type BarField = {
  name: string;
  total: number;
};

export interface BarGraphProps {
  data: BarField[];
  color?: string;
  tickFormatter?: (value: number) => string;
}

export function BarGraph({ data, color, tickFormatter }: BarGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={tickFormatter}
        />
        <Bar dataKey="total" className="fill-primary" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
