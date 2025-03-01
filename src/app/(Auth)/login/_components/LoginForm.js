"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import logo from "@/assets/logos/logo.svg";
import Image from "next/image";
import { useSignInMutation } from "@/redux/api/authApi";
import catchAsync from "@/utils/catchAsync";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/features/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  const onLoginSubmit = async (data) => {
    await catchAsync(async () => {
      const res = await signIn(data).unwrap();
      toast.success("Successfully Logged In!");

      // set user
      dispatch(
        setUser({
          user: jwtDecode(res?.data?.accessToken),
          token: res?.data?.accessToken,
        }),
      );

      // send user back or home
      router.push("/");
      router.refresh();
    });
  };

  return (
    <div className="w-full">
      <section className="mb-4">
        <Image
          src={logo}
          alt="Logo of Harrow Pickleball Club"
          height={150}
          width={150}
        />

        <h4 className="mb-1 mt-4 text-2xl font-bold">
          Welcome back to Harrow Pickleball Club
        </h4>
        <p className="text-dark-gray">Sign in to your account</p>
      </section>

      <FormWrapper
        onSubmit={onLoginSubmit}
        resolver={zodResolver(loginSchema)}
        defaultValues={{
          email: "pikleballadmin@gmail.com",
          password: "admin123",
        }}
      >
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
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
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="text-primary-blue hover:text-primary-blue/85 mt-2 block text-center font-medium"
        >
          Forgot Password?
        </Link>
      </FormWrapper>
    </div>
  );
}
