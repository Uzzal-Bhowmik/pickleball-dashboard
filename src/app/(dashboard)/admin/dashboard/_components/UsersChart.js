"use client";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const UsersChart = ({ data, setSelectedUserYear }) => {
  return (
    <div className="w-full rounded-xl bg-white p-6 xl:w-1/2">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-bold">Users Overview</h1>

        <DatePicker
          onChange={(_, dateString) => {
            setSelectedUserYear(dateString);
          }}
          picker="year"
          defaultValue={dayjs()}
          className="!py-1.5"
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
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
            angle={-45}
            textAnchor="start"
            interval={0}
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
                <div className="rounded-md bg-white p-2 shadow-md">
                  <p className="font-semibold">{label}</p>
                  {uniqueValues.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                      Monthly Joined Users: {entry.value}
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
            barSize={20}
            background={false}
            dataKey="count"
            fill="var(--primary)"
          />

          <Line type="monotone" dataKey="count" stroke="#305fa166" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersChart;
