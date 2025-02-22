"use client";

import { Button, Col, Flex, Row } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Filter } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
const { Search } = Input;
import userImg from "@/assets/images/user-avatar.png";
import { Image } from "antd";
import { formatString } from "@/utils/formatString";
import { useState } from "react";
import getTagColor from "@/utils/getTagColor";

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true);

  // Table Data
  const data = Array.from({ length: 20 }).map((_, inx) => ({
    id: "INV0938",
    guest: {
      name: "Sarah Johnson",
      img: userImg,
    },
    amount: "499",
    status: "Paid",
    tnxId: "454842343454",
    date: "Aug, 15 2023 02:29 PM",
    subscriptionType: inx % 5 === 0 ? "Annual Fee" : "Monthly Fee",
  }));

  // =============== Table columns ===============
  const columns = [
    {
      title: "Invoice Id",
      dataIndex: "id",
      render: (value) => `#${value}`,
    },
    {
      title: "Paid By",
      dataIndex: "guest",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <Image
              src={value.img.src}
              alt={value.name}
              height={30}
              width={30}
              className="aspect-square rounded-full object-cover"
            />
            <p>{value.name}</p>
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
          value: "Paid",
        },
        {
          text: "Unpaid",
          value: "Unpaid",
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
        <Tag color="green" className="!text-sm">
          {value}
        </Tag>
      ),
    },

    {
      title: "Tnx Id",
      dataIndex: "tnxId",
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
    {
      title: "Subscription Type",
      dataIndex: "subscriptionType",
      render: (value) => {
        return <Tag color={getTagColor(value)}>{value}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Action",
      render: () => {
        return <Button type="primary">View Details</Button>;
      },
    },
  ];

  

  return (
    <div className="space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>

        <Search
          placeholder="Search Earnings..."
          onSearch={(value) => console.log(value)}
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
              <h4 className="text-lg font-bold">$ 1,000</h4>
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
              <h4 className="text-lg font-bold">$ 10,000</h4>
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

      <div className="">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          className="notranslate"
          pagination={{
            pageSize: 15,
          }}
        ></Table>
      </div>
    </div>
  );
}
