"use client";

import { Button } from "antd";
import "./HeaderContainer.css";
import Link from "next/link";
import { Layout } from "antd";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import { MainLayoutContext } from "@/context/MainLayoutContext";
import { useContext, useState } from "react";
import formatUrl from "@/utils/formatUrl";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import Image from "next/image";
import { Popover } from "antd";
import NotificationContainer from "./NotificationContainer";
import { Check } from "lucide-react";
import { useMarkAsReadMutation } from "@/redux/api/notificationApi";
import { toast } from "react-toastify";
const { Header } = Layout;

export default function HeaderContainer() {
  const { sidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed } =
    useContext(MainLayoutContext);
  const currentPathname = usePathname();
  const userId = useSelector((state) => state?.auth?.user?._id);

  // Get my profile
  const { data: myProfileRes } = useGetProfileQuery({}, { skip: !userId });
  const myProfile = myProfileRes?.data || {};

  return (
    <Header
      style={{
        backgroundColor: "white",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 0,
        paddingRight: "40px",
        borderBottom: "1px solid lightGray",
      }}
    >
      {/* Collapse Icon */}
      <div className={cn("flex items-center gap-x-2", !collapsed && "-ml-4")}>
        <Button
          type="text"
          icon={<Icon icon="ci:menu-duo-lg" width="26" height="26" />}
          onClick={() => setCollapsed(!collapsed)}
        />

        <h1 className="font-quicksand text-3xl font-bold capitalize">
          {currentPathname.length > 1
            ? formatUrl(currentPathname)
            : "dashboard"}
        </h1>
      </div>

      {/* Right --- notification, user profile */}
      <div className="header-button-group flex items-center gap-x-4">
        <NotificationContainer />

        {/* User */}
        <Link
          href={"/admin/profile"}
          className="group flex items-center gap-x-2"
        >
          {myProfile?.photoUrl ? (
            <Image
              src={myProfile?.photoUrl}
              alt={`Avatar image of admin: ${myProfile?.name}`}
              width={48}
              height={48}
              className="aspect-square rounded-full border-2 border-primary object-cover object-center p-0.5 group-hover:border"
            />
          ) : (
            <Avatar
              style={{
                backgroundColor: "var(--primary)",
                verticalAlign: "middle",
                textTransform: "uppercase",
                fontWeight: " bold",
              }}
              size={48}
            >
              {myProfile?.name && myProfile?.name[0]}
            </Avatar>
          )}
        </Link>
      </div>
    </Header>
  );
}
