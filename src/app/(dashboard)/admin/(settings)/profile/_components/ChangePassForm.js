"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";
import { changePasswordSchema } from "@/schema/profileSchema";
import catchAsync from "@/utils/catchAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function ChangePassForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    if (data?.newPassword === data?.oldPassword) {
      return toast.error("New password can't be same as old password");
    }

    if (data?.newPassword !== data?.confirmPassword) {
      return toast.error("Password doesn't match");
    }

    delete data["confirmPassword"];

    catchAsync(async () => {
      await changePassword(data).unwrap();
      const willLogout = window.confirm(
        "Password changed successfully. Do you want to logout?",
      );
      if (willLogout) {
        dispatch(logout());
        router.refresh();
        router.push("/login");
      }
    });
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="oldPassword"
          type="password"
          label="Old Password"
          placeholder="***********"
        />
        <UInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="***********"
        />
        <UInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="***********"
        />

        <Button
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
          loading={isLoading}
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}
