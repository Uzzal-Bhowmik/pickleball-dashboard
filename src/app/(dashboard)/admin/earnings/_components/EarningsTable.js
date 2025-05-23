"use client";

import { Col, Flex, Row } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Filter } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
import { useState } from "react";
import getTagColor from "@/utils/getTagColor";
import { useGetAllEarningsQuery } from "@/redux/api/earningsApi";
import CustomAvatar from "@/components/CustomAvatar";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
const { Search } = Input;

export default function EarningsTable() {
  const router = useRouter();
  const currentPathname = usePathname();
  const { createQueryString } = useQueryString();
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const page = useSearchParams().get("page") || 1;
  const limit = useSearchParams().get("pageSize") || 10;

  // Query params
  const query = {};
  if (searchText) {
    query["searchTerm"] = searchText;
  }

  if (filterDate) {
    query["date"] = filterDate;
  }

  if (page) {
    query["page"] = page;
  }

  if (limit) {
    query["limit"] = limit;
  }

  // Get all earnings
  const { data: earningsRes, isLoading } = useGetAllEarningsQuery(query);
  const earningsData = earningsRes?.data || {};
  const earningsMeta = earningsRes?.meta || {};

  // =============== Table columns ===============
  const columns = [
    {
      title: "Payment Id",
      dataIndex: "id",
    },
    {
      title: "Paid By",
      dataIndex: "account",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <CustomAvatar src={value?.photoUrl} name={value?.name} size={35} />
            <p>{value?.name}</p>
          </Flex>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => {
        return "£" + value;
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      filters: [
        {
          text: "Paid",
          value: "paid",
        },
        {
          text: "Refunded",
          value: "refunded",
        },
        {
          text: "Unpaid",
          value: "unpaid",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (value) => (
        <Tag color={getTagColor(value)} className="!text-sm capitalize">
          {value}
        </Tag>
      ),
    },

    {
      title: "Tnx Id",
      dataIndex: "transactionId",
      render: (value) => (
        <Tag color="magenta" className="!text-sm" role="button">
          {value}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => {
        return dayjs(value).format("MMM D YYYY, h:mm A");
      },
    },
  ];

  return (
    <div className="min-h-[85vh] space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>

        <Search
          placeholder="Search by Payment Id..."
          onSearch={(value) => setSearchText(value)}
          size="large"
          style={{
            width: 300,
          }}
          allowClear
        />
      </Flex>

      <Row gutter={16}>
        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="w-full rounded-lg bg-primary px-4 py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Today&apos;s Earnings</h4>
              <h4 className="text-lg font-bold">
                £ {earningsData?.todaysEarning}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="w-full rounded-lg bg-primary px-4 py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Total Earnings</h4>
              <h4 className="text-lg font-bold">
                £ {earningsData?.totalEarning}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex justify="end" gap={14} align="center" className="h-full w-full">
            <DatePicker
              picker="month"
              placeholder="Filter Month"
              style={{ height: "65%" }}
              onChange={(_, dateString) => setFilterDate(dateString)}
            />
          </Flex>
        </Col>
      </Row>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={earningsData?.earningList}
        scroll={{ x: "100%" }}
        loading={isLoading}
        pagination={{
          total: earningsMeta?.total,
          pageSize: 10,
          current: useSearchParams().get("page") || 1,
          onChange: (page, pageSize) => {
            router.push(
              currentPathname + "?" + createQueryString({ page, pageSize }),
            );
          },
        }}
      ></Table>
    </div>
  );
}
