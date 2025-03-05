"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { resetPassSchema } from "@/schema/authSchema";
import catchAsync from "@/utils/catchAsync";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
} from "@/utils/sessionStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function SetPasswordForm() {
  const [updatePassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit = (data) => {
    catchAsync(async () => {
      await updatePassword({
        ...data,
        email: jwtDecode(getFromSessionStorage("changePassToken"))?.email,
      }).unwrap();

      toast.success("Password Updated Successfully");

      // Remove forget password token
      removeFromSessionStorage("changePassToken");

      // Send to login page
      router.push("/login");
    });
  };

  return (
    <div className="w-full py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start hover:text-primary-blue/85 mb-4 gap-x-2 font-medium"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Set New Password</h4>
        <p className="text-dark-gray">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
