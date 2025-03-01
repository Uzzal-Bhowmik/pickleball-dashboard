import { cn } from "@/utils/cn";
import { Spin } from "antd";
import React from "react";

export default function OverlayLoader({ height = "100dvh", className }) {
  return (
    <div
      className={cn(
        `${height} absolute inset-0 z-[999999] flex w-full items-center justify-center rounded-2xl bg-slate-300/10 p-6 backdrop-blur-md transition-all duration-0 ease-in-out`,
        className,
      )}
    >
      <Spin size="large" />
    </div>
  );
}
