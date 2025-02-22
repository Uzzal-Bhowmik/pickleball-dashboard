"use client";

import { Button, Flex, Input, Image, Tooltip } from "antd";
import { Table } from "antd";
import { PlusCircle } from "lucide-react";
import trainerImage from "@/assets/images/session/user.png";
import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import AddTrainerModal from "./AddTrainerModal";
import EditTrainerModal from "./EditTrainerModal";
import ViewTrainerModal from "./ViewTrainerModal";

const { Search } = Input;

export default function TrainerManagementTable() {
  const [showViewTrainerModal, setShowViewTrainerModal] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showEditTrainerModal, setShowEditTrainerModal] = useState(false);

  // Table Data
  const data = Array.from({ length: 20 }).map((_, inx) => ({
    id: "SID0938",
    title: "Doubles Strategy Masterclass",
    location: "Ontario USA",
    perHourRate: 50,
    rating: 4.8,
    availability: "Mon - Sat",
    name: "John Smith",
    image: trainerImage,
    email: "john.smith@gmail.com",
    status: "Active",
  }));

  // =============== Table columns ===============
  const columns = [
    {
      title: "Trainer Id",
      dataIndex: "id",
      render: (value) => `#${value}`,
    },

    {
      title: "Name",
      render: (_, record) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <Image
              src={record.image.src}
              alt={record.name}
              height={30}
              width={30}
              className="aspect-square rounded-full object-cover"
            />
            <p>{record.name}</p>
          </Flex>
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Per Hour Rate",
      dataIndex: "perHourRate",
      render: (value) => `$${value}`,
    },
    {
      title: "Avg. Rating",
      dataIndex: "rating",
      render: (value) => (
        <Flex align="center" justify="start" gap={3}>
          {value.toFixed(1)}
          <Icon icon="tdesign:star" width="22" height="22" color="#fccb29" />
        </Flex>
      ),
    },
    {
      title: "Availability",
      dataIndex: "availability",
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
                onClick={() => setShowViewTrainerModal(true)}
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
                onClick={() => setShowEditTrainerModal(true)}
              />
            </Tooltip>

            <CustomConfirm
              title="Are you sure?"
              description="This trainer will be permanently deleted."
            >
              <Tooltip title="Cancel Trainer">
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
        <h4 className="flex-1 text-2xl font-semibold">Trainer Management</h4>

        <Search
          placeholder="Search Trainers..."
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
          onClick={() => setShowViewTrainerModal(true)}
        >
          Add Trainer
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
      <ViewTrainerModal
        open={showViewTrainerModal}
        setOpen={setShowViewTrainerModal}
      />

      <AddTrainerModal
        open={showAddTrainerModal}
        setOpen={setShowAddTrainerModal}
      />

      <EditTrainerModal
        open={showEditTrainerModal}
        setOpen={setShowEditTrainerModal}
      />
    </div>
  );
}
