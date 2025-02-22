"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import { Icon } from "@iconify/react";

// Dummy table Data
const data = Array.from({ length: 10 }).map((_, inx) => ({
  key: inx + 1,
  name: "Robo Gladiators",
  userImg: userImage,
  email: "robogladiators@gmail.com",
  contact: "+1 (234) 567-890",
  date: "Oct 24 2024, 11:10 PM",
  status: "Active",
}));

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Block user handler
  const handleBlockUser = () => {
    message.success("User blocked successfully");
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
            width={40}
            height={40}
            className="aspect-square rounded-full object-cover object-center"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (value, record) => <Tag color={getTagColor(value)}>{value}</Tag>,
    },
    {
      title: "Action",
      render: () => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setProfileModalOpen(true)}>
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <button>
              <UserX color="#F16365" size={22} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="mb-3 ml-auto w-1/3 gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "100%" }}
      ></Table>

      <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} />
    </ConfigProvider>
  );
}
