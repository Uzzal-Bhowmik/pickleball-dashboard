"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { useCreateTrainerMutation } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
import { formatTime } from "@/utils/formatTime";
import { Divider } from "antd";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";

export default function AddTrainerModal({ open, setOpen }) {
  const [addTrainer, { isLoading: isAddingTrainer }] =
    useCreateTrainerMutation();

  const onSubmit = (data) => {
    const image = data?.image?.length > 0 ? data?.image[0] : null;

    const formData = new FormData();

    // Append image
    if (image) {
      formData.append("image", image.originFileObj);
    }

    // Format times
    const formattedStartTime = formatTime.dateTimeObjToString(
      data?.start_time,
      "HH:mm",
    );
    const formattedEndTime = formatTime.dateTimeObjToString(
      data?.end_time,
      "HH:mm",
    );

    delete data["confirmPassword"];
    delete data["image"];
    delete data["start_time"];
    delete data["end_time"];

    formData.append(
      "data",
      JSON.stringify({
        ...data,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
      }),
    );

    catchAsync(async () => {
      await addTrainer(formData).unwrap();

      toast.success("Trainer created successfully");
      setOpen(false);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Add a new trainer"
      width={"55%"}
    >
      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={{
          password: "default_password",
        }}
      >
        <UUpload
          name="image"
          label="Upload Profile Picture"
          uploadTitle="profile picture"
          required
        />

        <UInput name="name" label="Full Name" required />

        <UInput type="email" name="email" label="Email" required />

        <UInput name="password" label="Password" required={false} disabled />

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

        <UTextArea name="achievement" label="Achievements" required />

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

        <UInput
          type="number"
          name="per_hour_rate"
          label="Per Hour Rate"
          prefix={"$"}
          required
        />

        <USelect
          name="availability"
          label="Available Days"
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
          mode="tags"
          required
        />

        <Divider
          type="horizontal"
          variant="dashed"
          className="!border-gray-600 !text-sm !text-gray-600"
        >
          Time Slot for Available Days
        </Divider>

        <div className="flex items-center justify-between gap-x-4">
          <div className="w-full">
            <UTimePicker name="startTime" label="Start Time" />
          </div>

          <div className="w-full">
            <UTimePicker name="endTime" label="End Time" />
          </div>

          <div className="w-full">
            <UInput
              type="number"
              name="duration"
              label="Duration (in minutes)"
            />
          </div>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full"
          loading={isAddingTrainer}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
