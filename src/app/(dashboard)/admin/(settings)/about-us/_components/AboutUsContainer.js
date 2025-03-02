"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import {
  useGetSettingsDataQuery,
  useUpdateSettingsDataMutation,
} from "@/redux/api/settingsApi";
import catchAsync from "@/utils/catchAsync";
import { Flex } from "antd";
import { Spin } from "antd";
import { Button } from "antd";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";

export default function AboutUsContainer() {
  const { data, isLoading: isLoadingData } = useGetSettingsDataQuery();
  const aboutUs = data?.data?.aboutUs || "";

  console.log({ aboutUs });

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("About Us Updated Successfully");
    });
  };

  if (isLoadingData) {
    return (
      <Flex align="center" justify="center">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">About Us</h3>

      <FormWrapper onSubmit={handleSubmit} defaultValues={{ aboutUs }}>
        <UTextEditor
          name="aboutUs"
          placeholder="Note: Enter details about the website here. (e.g How and why did you come up with the idea? etc)"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full rounded-xl"
          icon={<Edit size={18} />}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
