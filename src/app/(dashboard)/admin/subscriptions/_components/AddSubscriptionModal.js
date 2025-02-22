import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import { Button, Modal } from "antd";
import React from "react";

export default function AddSubscriptionModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      title="Create new subscription plan"
    >
      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="title"
          label="Title"
          placeholder="Enter subscription title"
        />

        <UInput
          name="shortDescription"
          label="Short Description"
          placeholder="Enter short Description"
        />

        <UInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter subscription price"
        />

        <USelect
          name="billingCycle"
          label="Billing Cycle"
          options={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
        />

        <USelect
          mode="tags"
          name="features"
          label="Features"
          placeholder="Write features and press enter for adding more..."
          showDropdown={false}
        />

        {/* <UMultiSelect
          name="features"
          label="Features"
          placeholder="Write features and press enter for adding more..."
          showDropdown={false}
        /> */}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
