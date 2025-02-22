"use client";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import { DatePicker } from "antd";
import { Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", earning: 1200 },
  { month: "Feb", earning: 1402 },
  { month: "Mar", earning: 1525 },
  { month: "Apr", earning: 1222 },
  { month: "May", earning: 1553 },
  { month: "Jun", earning: 1634 },
  { month: "Jul", earning: 1923 },
  { month: "Aug", earning: 1324 },
  { month: "Sep", earning: 1834 },
  { month: "Oct", earning: 1256 },
  { month: "Nov", earning: 1634 },
  { month: "Dec", earning: 2105 },
];

const EarningChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="rounded-xl p-6 w-full xl:w-1/2 bg-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold">Earnings Overview</h1>

        <div className="flex-center-start gap-x-4">
          <Flex
            align="center"
            justify="start"
            className="border border-gray-400 rounded-lg py-1.5 px-3"
          >
            <h1 className="font-medium">Monthly Growth:</h1>

            <Flex
              align="center"
              justify="start"
              gap={2}
              className="ml-2 font-bold text-green-500"
            >
              <Icon icon="iconamoon:trend-up-light" height={16} width={16} />{" "}
              35.80%
            </Flex>
          </Flex>

          <DatePicker
            // onChange={(_, dateString) =>
            //   setJoinYear(moment(dateString).format("YYYY"))
            // }
            picker="year"
            defaultValue={dayjs()}
            className="!text-white !border-none !py-1.5"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="var(--primary)" stopOpacity={1} />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            dataKey="month"
          />

          <YAxis tickMargin={20} axisLine={false} tickLine={false} />

          <CartesianGrid
            opacity={0.19}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Tooltip
            formatter={(value) => [`Monthly Earning: $${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "var(--primary)" }}
          />

          <Area
            activeDot={{ fill: "var(--primary)" }}
            type="monotone"
            dataKey="earning"
            strokeWidth={0}
            stroke="var(--primary)"
            fill="url(#color)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;
