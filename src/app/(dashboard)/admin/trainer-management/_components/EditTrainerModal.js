"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { Divider } from "antd";
import { Button, Modal } from "antd";
import { PlusCircle } from "lucide-react";

export default function EditTrainerModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Update Trainer Information"
      width={"55%"}
    >
      <FormWrapper onSubmit={onSubmit}>
        <UUpload
          name="profile"
          label="Upload Profile Picture"
          uploadTitle="profile picture"
        />

        <UInput name="name" label="Full Name" />
        <UInput type="email" name="email" label="Email" />
        <UInput
          type="tel"
          name="phone"
          label="Phone (Optional)"
          required={false}
        />
        <UInput type="number" name="experience" label="Years of Experience" />

        <UTextArea name="bio" label="Bio" />
        <UTextArea name="achievements" label="Achievements" />

        <USelect
          name="coachingExpertise"
          label="Coaching Expertise"
          mode="tags"
        />

        <USelect
          name="skillLevelExpertise"
          label="Skill Level Expertise"
          mode="tags"
        />

        <UInput name="availability" label="Availability" />

        <UInput type="number" name="perHourRate" label="Per Hour Rate" />

        <Divider
          type="horizontal"
          variant="dashed"
          className="border !border-gray-600 !text-gray-600"
        >
          Time Slot
        </Divider>
        <div className="flex items-center justify-between gap-x-4">
          <div className="w-full">
            <UTimePicker name="startTime" label="Start Time" />
          </div>

          <div className="w-full">
            <UTimePicker name="endTime" label="End Time" />
          </div>

          <div className="w-full">
            <UInput type="number" name="duration" label="Duration" />
          </div>

          <button>
            <PlusCircle className="text-gray-600" />
          </button>
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
