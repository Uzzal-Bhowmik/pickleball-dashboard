"use client";

import "./Sidebar.css";
import logo from "@/assets/logos/logo.svg";
import { MainLayoutContext } from "@/context/MainLayoutContext";
import { logout } from "@/redux/features/authSlice";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// Sidebar Links
const adminLinks = [
  {
    id: "dashboard",
    icon: "ic:outline-dashboard",
    route: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    id: "account-details",
    icon: "heroicons:users",
    route: "/admin/account-details",
    label: "User Management",
  },
  {
    id: "earnings",
    icon: "lucide:hand-coins",
    route: "/admin/earnings",
    label: "Earnings",
  },
  {
    id: "trainer-management",
    icon: "hugeicons:teacher",
    route: "/admin/trainer-management",
    label: "Trainer Management",
  },
  {
    id: "session-management",
    icon: "heroicons-solid:status-online",
    route: "/admin/session-management",
    label: "Session Management",
  },
  // {
  //   id: "subscriptions",
  //   icon: "lineicons:crown-3",
  //   route: "/admin/subscriptions",
  //   label: "Subscriptions",
  // },
  {
    id: "settings",
    icon: "si:settings-fill",
    route: "/admin/settings",
    label: "Settings",
  },
];

const SidebarContainer = () => {
  const { sidebarCollapsed: collapsed } = useContext(MainLayoutContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const userRole = path.split("/")[1] || ""; // hotel | apartment | admin

  // Logout handler
  const onClick = (e) => {
    if (e.key === "logout") {
      dispatch(logout());
      router.refresh();
      router.push("/login");

      toast.success("Successfully Logged Out!");
    }

    console.log("logout success");
  };

  // Sidebar Links
  const sidebarLinks = [
    ...adminLinks.map((link) => ({
      key: link.id,
      icon: <Icon icon={link.icon} height={25} width={25} />,
      label: (
        <Link href={link.route} className="flex-center-between">
          {link.label}

          {link.id === "settings" && (
            <Icon icon="ri:arrow-right-s-line" height={25} width={25} />
          )}
        </Link>
      ),
    })),
    {
      key: "logout",
      icon: <Icon icon="ri:logout-circle-line" height={25} width={25} />,
      label: <Link href="/login">Logout</Link>,
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()
    ?.replace(`/${userRole}/`, "")
    ?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        backgroundColor: "white",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div
        style={{
          height: 80,
          borderBottom: "1px solid lightGray",
        }}
      >
        <Link
          href={`/${userRole}/dashboard`}
          className="flex h-full items-center justify-center px-2"
        >
          <Image
            src={logo}
            alt="Logo of Harrow Pickleball Club"
            height={900}
            width={900}
            className={cn("h-[80px] w-auto object-cover object-center")}
          />
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu space-y-2 !border !border-none !border-red-400 !bg-transparent !px-2 !pt-4"
        items={sidebarLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
