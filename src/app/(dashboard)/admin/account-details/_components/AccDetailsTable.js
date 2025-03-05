"use client";

import { ConfigProvider } from "antd";
import { Table } from "antd";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import getTagColor from "@/utils/getTagColor";
import { Icon } from "@iconify/react/dist/iconify";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/api/userApi";
import dayjs from "dayjs";
import catchAsync from "@/utils/catchAsync";
import { toast } from "react-toastify";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import CustomAvatar from "@/components/CustomAvatar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import { Flex, Input } from "antd";
const { Search } = Input;

const AccDetailsTable = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const { createQueryString } = useQueryString();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // Get Recent Users
  const { data: users, isLoading: isGetAllUsersLoading } = useGetAllUserQuery();

  // Block User
  const [blockUser] = useUpdateUserMutation();

  const handleBlockUser = async (userId, currentStatus) => {
    await catchAsync(async () => {
      const status = currentStatus === "active" ? "blocked" : "active";

      await blockUser({ userId, status }).unwrap();
      toast.success(
        currentStatus === "active"
          ? "User blocked successfully"
          : "User unblocked successfully",
      );
    });
  };

  // =============== Table columns ===============
  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomAvatar src={record?.photoUrl} size={40} name={record?.name} />
          <p className="font-medium">{record?.name}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      render: (value) => {
        return dayjs(value).format("DD MMM YYYY, hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (value) => (
        <Tag color={getTagColor(value)} className="capitalize">
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setSelectedUser(record);
                setShowProfileModal(true);
              }}
            >
              <Icon
                icon="fa6-regular:eye"
                color="#1B70A6"
                height={22}
                width={22}
              />

              <div className="sr-only">Show Details</div>
            </button>
          </Tooltip>

          <CustomConfirm
            title="Are you sure?"
            description="This user's status will be updated."
            onConfirm={() => handleBlockUser(record?._id, record?.status)}
          >
            <Tooltip
              title={
                record?.status === "active" ? "Block User" : "Unblock User"
              }
            >
              <Icon
                icon={
                  record?.status === "active"
                    ? "solar:user-block-rounded-linear"
                    : "solar:user-check-broken"
                }
                color={
                  record?.status === "active"
                    ? "var(--primary-red)"
                    : "var(--primary-green)"
                }
                height={22}
                width={22}
                role="button"
              />
              <div className="sr-only">Block User</div>
            </Tooltip>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[85vh] space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">User Management</h4>

        <Search
          placeholder="Search by user id, name or email..."
          onSearch={(value) => setSearchText(value)}
          size="large"
          style={{
            width: 300,
          }}
          allowClear
        />
      </Flex>

      <div className="my-5">
        <Table
          loading={isGetAllUsersLoading}
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={users}
          scroll={{ x: "100%" }}
          pagination={{
            pageSize: 10,
            current: useSearchParams().get("page") || 1,
            onChange: (page, pageSize) => {
              router.push(
                currentPathname +
                  "?" +
                  createQueryString({
                    page,
                    pageSize,
                  }),
              );
            },
          }}
          rowKey={(record) => record?._id}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={showProfileModal}
        setOpen={setShowProfileModal}
        user={selectedUser}
      />
    </div>
  );
};

export default AccDetailsTable;
