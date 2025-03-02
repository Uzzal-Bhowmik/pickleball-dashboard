"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useUpdateProfileMutation } from "@/redux/api/authApi";
import { editProfileSchema } from "@/schema/profileSchema";
import catchAsync from "@/utils/catchAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import toast from "react-hot-toast";

export default function EditProfileForm({ myProfile }) {
  const [editProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const handleSubmit = (data) => {
    catchAsync(async () => {
      await editProfile(data).unwrap();
      toast.success("Profile Updated Successfully");
    });
  };

  if (!myProfile) return <PageLoader />;

  const defaultValues = {
    name: myProfile?.name,
    email: myProfile?.email,
    contactNumber: myProfile?.contactNumber,
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper onSubmit={handleSubmit} defaultValues={defaultValues}>
        <UInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          required
        />
        <UInput name="email" label="Email" type="email" disabled />

        <UInput
          name="contactNumber"
          label="Contact"
          type="contact"
          placeholder="Enter your phone number"
          required={false}
        />

        <Button
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
          loading={isUpdating}
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}
