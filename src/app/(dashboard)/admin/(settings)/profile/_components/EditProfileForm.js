"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { editProfileSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";

export default function EditProfileForm() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          name: "Glimm Catcher",
          email: "glimm-catcher@gmail.com",
          contact: "+1234567890",
        }}
      >
        <UInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
        />
        <UInput name="email" label="Email" type="email" disabled />
        <UInput
          name="contact"
          label="Contact"
          type="contact"
          placeholder="Enter your phone number"
        />

        <Button
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}
