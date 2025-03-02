"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UOtpInput from "@/components/Form/UOtpInput";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";
import { otpSchema } from "@/schema/authSchema";
import catchAsync from "@/utils/catchAsync";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
  setToSessionStorage,
} from "@/utils/sessionStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyOtpForm() {
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(180); // Timer in seconds
  const router = useRouter();

  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();
  const handleResendOtp = async () => {
    catchAsync(async () => {
      const res = await resendOtp({
        email: jwtDecode(getFromSessionStorage("forgotPassToken"))?.email,
      }).unwrap();

      if (res?.success) {
        toast.success("OTP re-sent successful");
        setToSessionStorage("forgotPassToken", res?.data?.token);

        // Disable resend button and start the timer
        setIsResendDisabled(true);

        // Set the timer for 3 minutes (180 seconds)
        setTimer(180);

        // Countdown every second
        const countdownInterval = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsResendDisabled(false); // Re-enable the button after the timer ends
            }
            return prev - 1;
          });
        }, 1000);
      }
    });
  };

  // Format the timer to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVerifyOtp = async (data) => {
    catchAsync(async () => {
      const res = await verifyOtp(data).unwrap();

      toast.success("OTP Verification Successful");

      // remove forgotPassToken
      removeFromSessionStorage("forgotPassToken");

      // set change-pass token
      setToSessionStorage("changePassToken", res?.data?.accessToken);

      // navigate to login page
      router.push("/set-new-password");
    });
  };

  return (
    <div className="px-6 py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start hover:text-primary-blue/85 mb-4 gap-x-2 font-medium"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Verify OTP</h4>
        <p className="text-dark-gray">
          Enter the otp that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper onSubmit={handleVerifyOtp}>
        <UOtpInput name="otp" />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isVerifyOtpLoading}
        >
          Submit
        </Button>

        <p className="mx-auto mt-2 w-max font-medium text-[#8a8888]">
          Didn&apos;t get the code?{" "}
          <Button
            htmlType="button"
            type="link"
            className="text-primary-blue px-0"
            onClick={handleResendOtp}
            disabled={isResendDisabled || isResendOtpLoading}
          >
            {isResendDisabled ? `Resend in ${formatTime(timer)}` : "Resend"}
          </Button>
        </p>
      </FormWrapper>
    </div>
  );
}
