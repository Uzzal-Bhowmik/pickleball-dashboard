"use client";

import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import EarningChart from "./EarningChart";
import RecentUserTable from "./RecentUserTable";
import UsersChart from "./UsersChart";
import { Icon } from "@iconify/react";
import { Tag } from "antd";
import { Flex } from "antd";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
import { useState } from "react";

// Dummy data

export default function DashboardContainer() {
  const [selectedUserYear, setSelectedUserYear] = useState(
    new Date().getFullYear(),
  );
  const [selectedEarningYear, setSelectedEarningYear] = useState(
    new Date().getFullYear(),
  );

  // Query Params
  const query = {};
  if (selectedEarningYear) query["earning_year"] = selectedEarningYear;
  if (selectedUserYear) query["user_year"] = selectedUserYear;

  // Get dashboard data
  const { data: dashboardData, isLoading: isDashboardDataLoading } =
    useGetDashboardDataQuery(query);

  const dashboardStats =
    !isDashboardDataLoading && dashboardData
      ? [
          {
            key: "users",
            label: "Total Users",
            value: dashboardData?.totalUserCount,
            // growth: { type: "up", value: "4.5%" },
            icon: "clarity:users-line",
          },
          {
            key: "session",
            label: "Active Sessions",
            value: dashboardData?.activeSession,
            // growth: { type: "up", value: "2.5%" },
            icon: "heroicons-solid:status-online",
          },
          {
            key: "registrations",
            label: "New Registrations",
            value: dashboardData?.newRegisterCount,
            // growth: { type: "down", value: "2%" },
            icon: "clarity:users-line",
          },
          {
            key: "revenue",
            label: "Total Revenue",
            value: dashboardData?.totalRevenue,
            // growth: { type: "up", value: "2%" },
            icon: "solar:hand-money-outline",
          },
        ]
      : [];

  return (
    <div className="relative">
      {isDashboardDataLoading && <OverlayLoader />}

      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {dashboardStats?.map((stat) => (
          <Flex
            key={stat.key}
            align="center"
            justify="start"
            gap={16}
            className="rounded-xl bg-white p-5"
          >
            <div className="flex-center aspect-square size-20 rounded-full bg-primary text-white">
              <Icon icon={stat.icon} height={42} width={42} />
            </div>

            <div className="space-y-2">
              <p className="text-base font-medium text-[#33363F]">
                {stat.label}
              </p>

              <h2 className="!mt-1 text-3xl font-bold">{stat.value}</h2>

              {/*! Don't remove this part */}
              {/* <div>
                <Tag
                  color={stat.growth.type === "up" ? "green" : "red"}
                  className="font-bold"
                >
                  <Flex gap={4}>
                    <Icon
                      icon={
                        stat.growth.type === "up"
                          ? "iconamoon:trend-up-light"
                          : "iconamoon:trend-down-light"
                      }
                      height={16}
                      width={16}
                    />
                    <span>{stat.growth.value}%</span>
                  </Flex>
                </Tag>

                <span>/ last month</span>
              </div> */}
            </div>
          </Flex>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between my-10 flex-col gap-5 xl:flex-row">
        <UsersChart
          data={dashboardData?.userOverview}
          setSelectedUserYear={setSelectedUserYear}
        />

        <EarningChart
          data={dashboardData?.earningOverview}
          setSelectedEarningYear={setSelectedEarningYear}
        />
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentUserTable />
      </section>
    </div>
  );
}
