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
import { toast } from "react-toastify";

export default function TermsConditionsContainer() {
  const { data, isLoading: isLoadingData } = useGetSettingsDataQuery();
  const termsAndConditions = data?.data?.termsAndConditions || "";

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("Terms and Conditions Updated Successfully");
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
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={{
          termsAndConditions: termsAndConditions,
        }}
      >
        <UTextEditor
          name="termsAndConditions"
          placeholder="Note: Enter details about your terms and conditions here."
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
