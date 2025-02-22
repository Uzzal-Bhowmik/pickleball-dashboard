"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import USwitch from "@/components/Form/USwitch";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { Button, Modal } from "antd";

export default function EditSessionModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Create a new session"
      width={"55%"}
    >
      <FormWrapper onSubmit={onSubmit}>
        <UUpload
          name="thumbnail"
          label="Upload Thumbnail Field"
          uploadTitle="thumbnail"
        />

        <div className="grid grid-cols-2 gap-x-8">
          <UInput name="sessionTitle" label="Session Title" />
          <USelect
            name="skillLabel"
            label="Skill Label"
            placeholder="Select skill label"
            options={[
              {
                label: "Beginner",
                value: "Beginner",
              },
              {
                label: "Intermediate",
                value: "Intermediate",
              },
              {
                label: "Advanced",
                value: "Advanced",
              },
            ]}
          />

          <UTextArea name="description" label="Description" />
          <USelect
            name="coach"
            label="Select Coach"
            options={[
              {
                label: "John Doe",
                value: "John Doe",
              },
              {
                label: "John Doe 2",
                value: "John Doe 2",
              },
              {
                label: "John Doe 2",
                value: "John Doe 2",
              },
              {
                label: "John Doe 2",
                value: "John Doe 2",
              },
            ]}
          />

          <UInput name="participantsAllowed" label="Max Participants Allowed" />
          <UTimePicker
            name="time"
            label="Time"
            style={{ backgroundColor: "transparent" }}
          />

          <UInput type="number" name="duration" label="Duration" />

          <UInput type="number" name="memberPrice" label="Member Price" />

          <UInput
            type="number"
            name="nonMemberPrice"
            label="Non-Member Price"
          />

          <UInput name="Location" label="Location" />

          <UInput
            type="number"
            name="maxWaitListSpots"
            label="Maximum Wait List Spots"
          />

          <USwitch name="waitlist" label="Enable Waitlist" />
        </div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
