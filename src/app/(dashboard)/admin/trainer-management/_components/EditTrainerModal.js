"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import { useEditTrainerMutation } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
import { Button, Modal } from "antd";
import dayjs from "dayjs";

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
    name: trainer?.name,
    email: trainer?.email,
    contactNumber: trainer?.contactNumber,
    experience: trainer?.experience,
    bio: trainer?.bio,
    achievement: trainer?.achievement,
    coaching_expertise: trainer?.coaching_expertise,
    skill_expertise: trainer?.skill_expertise,
    per_hour_rate: trainer?.per_hour_rate,
    image: profilePicFilelist,
    location: trainer?.location,
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
        <div className="grid grid-cols-2 gap-4">
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

          <UInput type="text" name="location" label="Location" required />
        </div>

        <UTextArea name="bio" label="Bio" required />

        <UTextArea name="achievement" label="Achievements" required />

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
