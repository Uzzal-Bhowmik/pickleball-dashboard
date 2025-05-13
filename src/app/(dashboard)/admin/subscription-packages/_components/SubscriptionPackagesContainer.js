"use client";

import {
  useDeletePackageMutation,
  useGetPackagesQuery,
} from "@/redux/api/packageApi";
import { Icon } from "@iconify/react";
import { Spin } from "antd";
import { Flex } from "antd";
import { Button } from "antd";
import { PlusCircle } from "lucide-react";
import { lazy, useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import catchAsync from "@/utils/catchAsync";
import { toast } from "react-toastify";
import EditSubscriptionPackageModal from "./EditSubscriptionPackage";

const AddSubscriptionPackageModal = lazy(
  () => import("./AddSubscriptionPackageModal"),
);

export default function SubscriptionPackagesContainer() {
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [showEditPackageModal, setShowEditPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  // Get packages
  const { data: packagesRes, isLoading: isPackagesLoading } =
    useGetPackagesQuery({ limit: 99999 });
  const packages = packagesRes?.data || [];

  const [deletePackage] = useDeletePackageMutation();

  const handleDeletePackage = (packageId) => {
    catchAsync(async () => {
      await deletePackage(packageId).unwrap();

      toast.success("Package deleted successfully");
    });
  };

  if (isPackagesLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <div>
      <Flex
        justify="between"
        align="center"
        gap={16}
        style={{ marginBottom: "1.5rem" }}
      >
        <h4 className="flex-1 text-2xl font-semibold">Manage Packages</h4>

        {/* <Button
          type="primary"
          icon={<PlusCircle />}
          shape="round"
          style={{ boxShadow: "none" }}
          size="large"
          onClick={() => setShowAddPackageModal(true)}
        >
          Add Package
        </Button> */}
      </Flex>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {packages?.map((pkg) => (
          <div
            key={pkg?._id}
            className="flex w-full flex-col justify-between gap-y-4 rounded-lg bg-white shadow-lg"
          >
            <div>
              <div className="rounded-t-lg bg-primary py-4 text-center text-white">
                <h2 className="text-2xl font-bold">{pkg?.title}</h2>
              </div>

              <div className="px-6 pt-6">
                <div className="mb-6 text-center text-3xl font-bold text-gray-800">
                  £{pkg?.price}/{pkg?.billingCycle}
                </div>

                <ul className="space-y-2 text-gray-600">
                  {pkg?.description?.map((feature, idx) => (
                    <li className="flex items-center gap-1" key={feature + idx}>
                      <Icon
                        icon="bitcoin-icons:check-outline"
                        height={20}
                        width={20}
                        color="green"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5">
              <Flex justify="between" align="center" gap={10}>
                {/* <CustomConfirm
                  title={"Delete Package"}
                  description="Are you sure you want to delete this package?"
                  onConfirm={() => handleDeletePackage(pkg?._id)}
                >
                  <Button color="danger" variant="outlined" className="w-full">
                    Delete
                  </Button>
                </CustomConfirm> */}

                <Button
                  type="primary"
                  className="w-full"
                  onClick={() => {
                    setShowEditPackageModal(true);
                    setSelectedPackage(pkg);
                  }}
                >
                  Edit
                </Button>
              </Flex>
            </div>
          </div>
        ))}
      </div>

      {/*------------------- Modals -------------------*/}
      <AddSubscriptionPackageModal
        open={showAddPackageModal}
        setOpen={setShowAddPackageModal}
      />

      <EditSubscriptionPackageModal
        open={showEditPackageModal}
        setOpen={setShowEditPackageModal}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}
