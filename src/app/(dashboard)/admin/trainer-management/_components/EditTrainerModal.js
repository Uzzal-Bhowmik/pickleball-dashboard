"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { useEditTrainerMutation } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
import { Divider } from "antd";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function EditTrainerModal({ open, setOpen, trainer }) {
  const [editTrainer, { isLoading: isUpdatingTrainer }] =
    useEditTrainerMutation();
  const profilePicFilelist = trainer?.user?.photoUrl
    ? [
        {
          uid: "-1",
          name: "profile_picture",
          status: "done",
          url: trainer?.user?.photoUrl,
        },
      ]
    : [];

  if (!trainer) return null;

  const defaultValues = {
    name: trainer?.user?.name,
    email: trainer?.user?.email,
    contactNumber: trainer?.user?.contactNumber,
    experience: trainer?.experience,
    bio: trainer?.bio,
    achievement: trainer?.achievement,
    coaching_expertise: trainer?.coaching_expertise,
    skill_expertise: trainer?.skill_expertise,
    per_hour_rate: trainer?.per_hour_rate,
    availability: trainer?.availability,
    startTime: dayjs(trainer?.start_time, "HH:mm"),
    endTime: dayjs(trainer?.end_time, "HH:mm"),
    duration: trainer?.duration,
    image: profilePicFilelist,
    password: "default_password",
  };

  // Handle submit
  const onSubmit = (data) => {
    const formdata = new FormData();

    // append image
    if (data?.image?.length > 0 && data?.image[0]?.originFileObj) {
      formdata.append("image", data?.image[0]?.originFileObj);
    }

    delete data["image"];

    formdata.append(
      "data",
      JSON.stringify({
        ...data,
        start_time: dayjs(data?.start_time).format("HH:mm"),
        end_time: dayjs(data?.end_time).format("HH:mm"),
      }),
    );

    catchAsync(async () => {
      await editTrainer({ id: trainer?._id, data: formdata }).unwrap();
      toast.success("Trainer Info Updated Successfully");
      setOpen(false);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Update Trainer Information"
      width={"55%"}
    >
      <FormWrapper onSubmit={onSubmit} defaultValues={defaultValues}>
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
          loading={isUpdatingTrainer}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
