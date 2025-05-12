"use client";

import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import useQueryString from "@/hooks/useQueryString";
import {
  useDeleteCreditPackageMutation,
  useGetAllCreditPackagesQuery,
} from "@/redux/api/creditApi";
import catchAsync from "@/utils/catchAsync";
import { Table, Tooltip } from "antd";
import { Button, Flex } from "antd";
import { clearConfig } from "dompurify";
import { Trash2 } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { lazy, useState } from "react";
import { toast } from "react-toastify";

const AddCreditPackageModal = lazy(() => import("./AddCreditPackageModal"));

export default function CreditManagementContainer() {
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  const currentPathname = usePathname();
  const router = useRouter();
  const { createQueryString } = useQueryString();

  // Pagination
  const query = {};
  const currentPage = useSearchParams().get("page") || 1;
  const pageSize = useSearchParams().get("limit") || 10;

  if (currentPage) query.page = currentPage;
  if (pageSize) query.limit = pageSize;

  // Get all credit packages
  const { data: creditPackagesRes, isLoading } =
    useGetAllCreditPackagesQuery(query);
  const creditPackages = creditPackagesRes?.data || [];
  const meta = creditPackagesRes?.meta || {};
  console.log({ creditPackages });

  // Delete credit package
  const [deleteCreditPackage, { isLoading: isDeleting }] =
    useDeleteCreditPackageMutation();

  const handleDeleteCreditPackage = async (id) => {
    if (!id) {
      return toast.error("Credit package ID not found!");
    }

    catchAsync(async () => {
      await deleteCreditPackage(id).unwrap();
      toast.success("Credit package deleted successfully!");
    });
  };

  // ----------------------- Table Columns -----------------------
  const columns = [
    {
      key: "credit",
      title: "Credits",
      dataIndex: "credits",
      sorter: (a, b) => a.credits - b.credits,
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render(value) {
        return `£${value}`;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      key: "action",
      title: "Action",
      render(value) {
        return (
          <CustomConfirm
            title={"DeleteCredit"}
            description={"Are you sure you want to delete it?"}
            onConfirm={() => handleDeleteCreditPackage(value?._id)}
          >
            <Tooltip title="Delete Credit">
              <Button
                size="small"
                icon={<Trash2 size={16} />}
                variant="outlined"
                color="danger"
              />
            </Tooltip>
          </CustomConfirm>
        );
      },
    },
  ];

  console.log({ creditPackagesRes });

  return (
    <div className="min-h-[85vh] space-y-5 rounded-xl bg-white p-5">
      <Flex justify="between" align="center" gap={16}>
        <h4 className="flex-1 text-2xl font-semibold">Credit Management</h4>

        <Button
          type="primary"
          icon={<PlusCircle />}
          shape="round"
          style={{ boxShadow: "none" }}
          size="large"
          onClick={() => setShowAddCreditModal(true)}
        >
          Add Credit
        </Button>
      </Flex>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={creditPackages}
        scroll={{ x: "100%" }}
        loading={isLoading}
        pagination={{
          total: meta?.total,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            router.push(
              currentPathname + "?" + createQueryString({ page, pageSize }),
            );
          },
        }}
      />

      {/* Modals */}
      <AddCreditPackageModal
        open={showAddCreditModal}
        setOpen={setShowAddCreditModal}
      />
    </div>
  );
}
