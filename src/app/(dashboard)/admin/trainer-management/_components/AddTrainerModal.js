"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import UTextEditor from "@/components/Form/UTextEditor";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { useCreateTrainerMutation } from "@/redux/api/trainerApi";
import { Divider } from "antd";
import { Button, Modal } from "antd";
import { PlusCircle } from "lucide-react";

export default function AddTrainerModal({ open, setOpen }) {
  const [addTrainer, { isLoading: isAddingTrainer }] =
    useCreateTrainerMutation();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Add a new trainer"
      width={"55%"}
    >
      <FormWrapper onSubmit={onSubmit}>
        <UUpload
          name="image"
          label="Upload Profile Picture"
          uploadTitle="profile picture"
          required
        />

        <UInput name="name" label="Full Name" required />
        <UInput type="email" name="email" label="Email" required />
        <UInput
          type="tel"
          name="contactNumber"
          label="Phone (Optional)"
          required={false}
        />
        <UInput
          type="number"
          name="experience"
          label="Years of Experience (in years)"
          required
        />

        <UTextArea name="bio" label="Bio" required />

        {/* <UTextEditor name="achievements" label="Achievements" required /> */}
        <UTextArea name="achievements" label="Achievements" required />

        <USelect
          name="coaching_expertise"
          label="Coaching Expertise"
          mode="tags"
          options={[
            { value: "tennis", label: "Tennis" },
            { value: "badminton", label: "Badminton" },
          ]}
          required
        />

        <USelect
          name="skill_expertise"
          label="Skill Expertise"
          options={[
            {
              label: "Beginner",
              value: "beginner",
            },
            {
              label: "Intermediate",
              value: "intermediate",
            },
            {
              label: "Advanced",
              value: "advanced",
            },
          ]}
          required
        />

        <USelect
          name="availability"
          label="Availability"
          options={[
            {
              label: "Saturday",
              value: "sat",
            },
            {
              label: "Sunday",
              value: "sun",
            },
            {
              label: "Monday",
              value: "mon",
            },
            {
              label: "Tuesday",
              value: "tue",
            },
            {
              label: "Wednesday",
              value: "wed",
            },
            {
              label: "Thursday",
              value: "thu",
            },
            {
              label: "Friday",
              value: "fri",
            },
          ]}
          required
        />

        <UInput
          type="number"
          name="per_hour_rate"
          label="Per Hour Rate"
          prefix={"$"}
          required
        />

        <Divider
          type="horizontal"
          variant="dashed"
          className="!border-gray-600 !text-gray-600"
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
