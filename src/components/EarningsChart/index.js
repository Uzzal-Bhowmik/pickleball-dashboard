"use client";

import { Tag } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyEarnings = [
  {
    month: "Jan",
    earning: 4000,
  },
  {
    month: "Feb",
    earning: 5000,
  },
  {
    month: "Mar",
    earning: 2000,
  },
  {
    month: "Apr",
    earning: 2780,
  },
  {
    month: "May",
    earning: 1890,
  },
  {
    month: "Jun",
    earning: 2390,
  },
  {
    month: "Jul",
    earning: 3490,
  },
  {
    month: "Aug",
    earning: 2490,
  },
  {
    month: "Sep",
    earning: 4490,
  },
  {
    month: "Oct",
    earning: 4890,
  },
  {
    month: "Nov",
    earning: 5490,
  },
  {
    month: "Dec",
    earning: 2590,
  },
];

export default function EarningsChart() {
  return (
    <div className="w-full rounded-xl bg-white p-6">
      <div className="mb-8 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-2xl font-semibold">Earnings Overview</h1>

        <div className="flex-center-end gap-x-3">
          <h3 className="text-lg font-semibold text-black/75">
            Monthly Growth: <Tag color="green">+ 10%</Tag>
          </h3>

          <DatePicker
            // onChange={(_, dateString) =>
            //   setJoinYear(moment(dateString).format("YYYY"))
            // }
            picker="year"
            defaultValue={dayjs()}
            className="!text-white !border-none"
          />
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
        className="px-4 border border-transparent"
      >
        <ComposedChart
          data={monthlyEarnings}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            content={({ payload, label }) => {
              if (!payload || payload.length === 0) return null;

              // Extract unique values
              const uniqueValues = [];
              payload.forEach((entry) => {
                if (!uniqueValues.some((item) => item.value === entry.value)) {
                  uniqueValues.push(entry);
                }
              });

              return (
                <div className="bg-white p-2 shadow-md rounded-md">
                  <p className="font-semibold">{label}</p>
                  {uniqueValues.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                      Monthly Earnings: {entry.value}
                    </p>
                  ))}
                </div>
              );
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={50}
            background={false}
            dataKey="earning"
            fill="var(--primary)"
          />

          <Line type="monotone" dataKey="earning" stroke="var(--primary-2)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
