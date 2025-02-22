"use client";

import { Button, Flex, Input, Image, Tooltip } from "antd";
import { Table } from "antd";
import { PlusCircle } from "lucide-react";
import trainerImage from "@/assets/images/session/user.png";
import { Icon } from "@iconify/react";
import { useState } from "react";
import AddSessionModal from "./AddSessionModal";
import EditSessionModal from "./EditSessionModal";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";

const { Search } = Input;

export default function SessionManagementTable() {
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [showEditSessionModal, setShowEditSessionModal] = useState(false);

  // Table Data
  const data = Array.from({ length: 20 }).map((_, inx) => ({
    id: "SID0938",
    title: "Doubles Strategy Masterclass",
    location: "Dhaka, Bangladesh",
    date: "Aug, 15 2023",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    trainer: {
      name: "John Smith",
      image: trainerImage,
    },
    thumbnail: <Icon icon="lucide:file-video" height={24} width={24} />,
    status: "Active",
  }));

  // =============== Table columns ===============
  const columns = [
    {
      title: "Session Id",
      dataIndex: "id",
      render: (value) => `#${value}`,
    },
    {
      title: "Session Name",
      dataIndex: "title",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (icon) => (
        <Tooltip title="Thumbnail Video">
          <button>{icon}</button>
        </Tooltip>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      render: (_, record) => {
        return (
          <span>
            {record.startTime} - {record.endTime}
          </span>
        );
      },
    },
    {
      title: "Trainer",
      dataIndex: "trainer",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <Image
              src={value.image.src}
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
      title: "Action",
      render: () => {
        return (
          <Flex align="center" justify="start" gap={5}>
            <Tooltip title="Show Details">
              <Button
                type="outline"
                icon={
                  <Icon
                    icon="fa6-regular:eye"
                    height={24}
                    width={24}
                    color="var(--primary)"
                  />
                }
                style={{ boxShadow: "none" }}
              />
            </Tooltip>

            <Tooltip title="Edit Session">
              <Button
                type="outline"
                icon={
                  <Icon
                    icon="akar-icons:edit"
                    height={24}
                    width={24}
                    color="var(--primary)"
                  />
                }
                size="large"
                style={{ boxShadow: "none" }}
                onClick={() => setShowEditSessionModal(true)}
              />
            </Tooltip>

            <CustomConfirm
              title="Are you sure?"
              description="This session will be permanently cancelled."
            >
              <Tooltip title="Cancel Session">
                <Button
                  type="outline"
                  icon={
                    <Icon
                      icon="humbleicons:trash"
                      height={24}
                      width={24}
                      color="var(--primary-red)"
                    />
                  }
                  style={{ boxShadow: "none" }}
                />
              </Tooltip>
            </CustomConfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <div className="space-y-5 rounded-xl bg-white p-5">
      <Flex justify="between" align="center" gap={16}>
        <h4 className="flex-1 text-2xl font-semibold">Session Management</h4>

        <Search
          placeholder="Search Sessions..."
          onSearch={(value) => console.log(value)}
          size="large"
          style={{
            width: 300,
          }}
          allowClear
        />

        <Button
          type="primary"
          icon={<PlusCircle />}
          shape="round"
          style={{ boxShadow: "none" }}
          size="large"
          onClick={() => setShowAddSessionModal(true)}
        >
          Add Session
        </Button>
      </Flex>

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

      {/* Session Modals */}
      <AddSessionModal
        open={showAddSessionModal}
        setOpen={setShowAddSessionModal}
      />

      <EditSessionModal
        open={showEditSessionModal}
        setOpen={setShowEditSessionModal}
      />
    </div>
  );
}
