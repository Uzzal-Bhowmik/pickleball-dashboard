"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useAddCreditPackageMutation } from "@/redux/api/creditApi";
import catchAsync from "@/utils/catchAsync";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";

export default function AddCreditPackageModal({ open, setOpen }) {
  const [addCreditPackage, { isLoading }] = useAddCreditPackageMutation();
  const onSubmit = (data) => {
    catchAsync(async () => {
      await addCreditPackage({
        credits: Number(data?.credits),
        price: Number(data?.price),
      }).unwrap();
      toast.success("Credit package created successfully");
      setOpen(false);
    });
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Create new credit package"
    >
      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="credits"
          type="number"
          label="Credits"
          placeholder={"Enter number of credits"}
          required
        />
        <UInput
          name="price"
          type="number"
          label="Price"
          placeholder={"Enter price"}
          required
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          loading={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
