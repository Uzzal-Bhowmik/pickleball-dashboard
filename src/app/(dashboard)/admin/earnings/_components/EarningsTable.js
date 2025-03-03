"use client";

import { Button, Col, Flex, Row } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Filter } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
const { Search } = Input;
import { formatString } from "@/utils/formatString";
import { useState } from "react";
import getTagColor from "@/utils/getTagColor";
import { useGetAllEarningsQuery } from "@/redux/api/earningsApi";
import CustomAvatar from "@/components/CustomAvatar";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true);
  const router = useRouter();
  const currentPathname = usePathname();
  const { createQueryString } = useQueryString();
  const [searchText, setSearchText] = useState("");

  // Query params
  const query = {};
  if (searchText) {
    query["id"] = searchText;
  }

  // Get all earnings
  const { data: earningsRes, isLoading } = useGetAllEarningsQuery(query);
  const earningsData = earningsRes?.data || [];
  const earningsMeta = earningsRes?.meta || {};

  console.log(earningsData);

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
            <CustomAvatar src={value?.photoUrl} name={value?.name} size={30} />
            <p>{value?.name}</p>
          </Flex>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => {
        return "$" + value;
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
      dataIndex: "transaction_id",
      render: (value) => (
        <Tag
          color="magenta"
          className="!text-sm"
          onClick={() => setShowFormattedTnxId(!showFormattedTnxId)}
          role="button"
        >
          {showFormattedTnxId ? formatString.formatTransactionId(value) : value}
        </Tag>
      ),
    },
    // {
    //   title: "Subscription Type",
    //   dataIndex: "subscriptionType",
    //   render: (value) => {
    //     return <Tag color={getTagColor(value)}>{value}</Tag>;
    //   },
    // },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => {
        return dayjs(value).format("MMM D YYYY, h:mm A");
      },
    },

    // {
    //   title: "Action",
    //   render: () => {
    //     return <Button type="primary">View Details</Button>;
    //   },
    // },
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
                $ {earningsData?.todaysEarning}
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
                $ {earningsData?.totalEarning}
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
            />
          </Flex>
        </Col>
      </Row>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={earningsData?.earnings}
        scroll={{ x: "100%" }}
        loading={isLoading}
        pagination={{
          total: earningsMeta.total,
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
