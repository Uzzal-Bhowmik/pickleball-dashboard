"use client";

import { Button, Flex, Input, Image, Tooltip } from "antd";
import { Table } from "antd";
import { PlusCircle } from "lucide-react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import AddTrainerModal from "./AddTrainerModal";
import EditTrainerModal from "./EditTrainerModal";
import ViewTrainerModal from "./ViewTrainerModal";
import {
  useDeleteTrainerMutation,
  useGetAllTrainersQuery,
} from "@/redux/api/trainerApi";
import CustomAvatar from "@/components/CustomAvatar";
import catchAsync from "@/utils/catchAsync";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";

const { Search } = Input;

export default function TrainerManagementTable() {
  const [showViewTrainerModal, setShowViewTrainerModal] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showEditTrainerModal, setShowEditTrainerModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const currentPathname = usePathname();
  const router = useRouter();
  const { createQueryString } = useQueryString();

  // Query params
  const query = {};
  if (searchTerm) {
    query["searchTerm"] = searchTerm;
  }

  // Get all trainers
  const { data: trainersRes, isFetching } = useGetAllTrainersQuery(query);
  const trainers = trainersRes?.data || [];
  const trainersMeta = trainersRes?.meta || {};

  console.log({ trainers });

  // Delete Trainer
  const [deleteTrainer] = useDeleteTrainerMutation();
  const handleDeleteTrainer = async (trainerId) => {
    await catchAsync(async () => {
      await deleteTrainer(trainerId).unwrap();
      toast.success("Trainer Deleted Successfully");
    });
  };

  // =============== Table columns ===============
  const columns = [
    {
      title: "Trainer Id",
      dataIndex: "id",
    },

    {
      title: "Name",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <CustomAvatar name={value?.name} src={value?.photoUrl} size={35} />
            <p>{value?.name}</p>
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
      dataIndex: "per_hour_rate",
      render: (value) => `£${value}`,
    },
    {
      title: "Avg. Rating",
      dataIndex: "avgRating",
      render: (value) => (
        <Flex align="center" justify="start" gap={3}>
          {value}
          <Icon icon="tdesign:star" width="22" height="22" color="#fccb29" />
        </Flex>
      ),
    },
    {
      title: "Action",
      render: (_, record) => {
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
                onClick={() => {
                  setShowViewTrainerModal(true);
                  setSelectedTrainer(record);
                }}
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
                onClick={() => {
                  setShowEditTrainerModal(true);
                  setSelectedTrainer(record);
                }}
              />
            </Tooltip>

            <CustomConfirm
              title="Are you sure?"
              description="This trainer will be permanently deleted."
              onConfirm={() => handleDeleteTrainer(record?._id)}
            >
              <Tooltip title="Delete Trainer">
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
          placeholder="Search trainer by name, id..."
          onSearch={(value) => setSearchTerm(value)}
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
          onClick={() => setShowAddTrainerModal(true)}
        >
          Add Trainer
        </Button>
      </Flex>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={trainers}
        loading={isFetching}
        scroll={{ x: "100%" }}
        className="notranslate"
        pagination={{
          total: trainersMeta?.total,
          current: useSearchParams().get("page") || 1,
          pageSize: 10,
          onChange: (page, pageSize) => {
            router.push(
              currentPathname + "?" + createQueryString({ page, pageSize }),
            );
          },
        }}
      ></Table>

      {/* Session Modals */}
      <ViewTrainerModal
        open={showViewTrainerModal}
        setOpen={setShowViewTrainerModal}
        selectedTrainer={selectedTrainer}
      />

      <AddTrainerModal
        open={showAddTrainerModal}
        setOpen={setShowAddTrainerModal}
      />

      <EditTrainerModal
        open={showEditTrainerModal}
        setOpen={setShowEditTrainerModal}
        trainer={selectedTrainer}
      />
    </div>
  );
}
