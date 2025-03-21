"use client";

import { Button, Flex, Input, Tooltip } from "antd";
import { Table } from "antd";
import { PlusCircle } from "lucide-react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import AddSessionModal from "./AddSessionModal";
import EditSessionModal from "./EditSessionModal";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import {
  useChangeSessionStatusMutation,
  useDeleteSessionMutation,
  useGetAllSessionsQuery,
} from "@/redux/api/sessionApi";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CustomAvatar from "@/components/CustomAvatar";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import ViewSessionModal from "./ViewSessionModal";
import catchAsync from "@/utils/catchAsync";
import { toast } from "react-toastify";
import SessionThumbnailModal from "./SessionThumbnailModal";
import useQueryString from "@/hooks/useQueryString";

const { Search } = Input;

export default function SessionManagementTable() {
  const [showViewSessionModal, setShowViewSessionModal] = useState(false);
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [showEditSessionModal, setShowEditSessionModal] = useState(false);
  const [showThumbnailModal, setShowThumbnailModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const currentPathname = usePathname();
  const router = useRouter();
  const { createQueryString } = useQueryString();

  // Query params
  const query = {};
  if (searchTerm) {
    query["searchTerm"] = searchTerm;
  }

  // Get all sessions
  const { data: sessionsRes, isFetching: isLoading } =
    useGetAllSessionsQuery(query);
  const sessions = sessionsRes?.data || [];
  const sessionsMeta = sessionsRes?.meta || {};

  // Change session status
  const [changeSessionStatus] = useChangeSessionStatusMutation();
  const handleChangeSessionStatus = async (session) => {
    await catchAsync(async () => {
      await changeSessionStatus({
        id: session?._id,
        data: {
          status: session?.status === "active" ? "deactive" : "active",
        },
      }).unwrap();

      toast.success("Status Changed");
    });
  };

  // Delete Session
  const [deleteSession] = useDeleteSessionMutation();
  const handleDeleteSession = async (sessionId) => {
    await catchAsync(async () => {
      await deleteSession(sessionId).unwrap();
      // toast.success("Session Deleted Successfully");
    });
  };

  // =============== Table columns ===============
  const columns = [
    {
      title: "Session Id",
      dataIndex: "id",
    },
    {
      title: "Session Name",
      dataIndex: "name",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (value, record) =>
        value ? (
          <Tooltip title="See Thumbnail">
            <button
              onClick={() => {
                setShowThumbnailModal(true);
                setSelectedSession(record);
              }}
            >
              {value?.includes("images") ? (
                <Icon
                  icon="material-symbols:image-outline-sharp"
                  width="24"
                  height="24"
                />
              ) : (
                value?.includes("videos") && (
                  <Icon icon="ri:video-line" width="24" height="24" />
                )
              )}
            </button>
          </Tooltip>
        ) : (
          "--"
        ),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Trainer",
      dataIndex: "coach",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <CustomAvatar
              src={value?.user?.photoUrl}
              name={value?.user?.name}
              size={30}
            />
            <p>{value?.user?.name}</p>
          </Flex>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => {
        return <span>${value}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value, record) => {
        return (
          <Flex vertical align="center" gap={10}>
            <Tag color={getTagColor(value)} className="capitalize">
              {value}
            </Tag>

            <button
              className="rounded-xl border border-slate-400 px-2 text-xs text-slate-600 transition-colors duration-200 ease-in-out hover:border-primary hover:bg-primary hover:text-white"
              onClick={() => handleChangeSessionStatus(record)}
            >
              Change Status
            </button>
          </Flex>
        );
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Deactive", value: "deactive" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
                  setShowViewSessionModal(true);
                  setSelectedSession(record);
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
                  setShowEditSessionModal(true);
                  setSelectedSession(record);
                }}
              />
            </Tooltip>

            <CustomConfirm
              title="Are you sure?"
              description="This session will be permanently cancelled."
              onConfirm={() => handleDeleteSession(record?._id)}
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
    <div className="min-h-[85vh] space-y-5 rounded-xl bg-white p-5">
      <Flex justify="between" align="center" gap={16}>
        <h4 className="flex-1 text-2xl font-semibold">Session Management</h4>

        <Search
          placeholder="Search sessions by name, id..."
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
          onClick={() => setShowAddSessionModal(true)}
        >
          Add Session
        </Button>
      </Flex>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={sessions}
        scroll={{ x: "100%" }}
        loading={isLoading}
        pagination={{
          total: sessionsMeta?.total,
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
      <ViewSessionModal
        open={showViewSessionModal}
        setOpen={setShowViewSessionModal}
        session={selectedSession}
      />

      <AddSessionModal
        open={showAddSessionModal}
        setOpen={setShowAddSessionModal}
      />

      <EditSessionModal
        open={showEditSessionModal}
        setOpen={setShowEditSessionModal}
        session={selectedSession}
      />

      <SessionThumbnailModal
        open={showThumbnailModal}
        setOpen={setShowThumbnailModal}
        thumbnail={selectedSession?.thumbnail}
      />
    </div>
  );
}
