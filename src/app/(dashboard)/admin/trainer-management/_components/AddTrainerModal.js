"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import UUpload from "@/components/Form/UUpload";
import { useCreateTrainerMutation } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
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

    delete data["confirmPassword"];
    delete data["image"];

    formData.append("data", JSON.stringify(data));

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
      <FormWrapper onSubmit={onSubmit}>
        <UUpload
          name="image"
          label="Upload Profile Picture"
          uploadTitle="profile picture"
          required={false}
        />

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
          loading={isAddingTrainer}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
