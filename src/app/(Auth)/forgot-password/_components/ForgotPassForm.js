"use client";

import Link from "next/link";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import catchAsync from "@/utils/catchAsync";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { toast } from "react-toastify";

export default function ForgotPassForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const onSubmit = (data) => {
    catchAsync(async () => {
      const res = await forgotPassword(data).unwrap();
      toast.success("Success!! An otp has been sent to your email.");

      // set forgotPassToken in sessionStorage
      setToSessionStorage("forgotPassToken", res?.data?.verifyToken);
      router.push("/otp-verification");
    });
  };

  return (
    <div className="w-full px-6 py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start hover:text-primary-blue/85 mb-4 gap-x-2 font-medium"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Forgot Password</h4>
        <p className="text-dark-gray">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
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
