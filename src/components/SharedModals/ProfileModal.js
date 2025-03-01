"use client";

import { Modal } from "antd";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import { Divider } from "antd";
import dayjs from "dayjs";
import CustomAvatar from "../CustomAvatar";

export default function ProfileModal({ user, open, setOpen }) {
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-primary py-4">
        <CustomAvatar src={user?.photoUrl} name={user?.name} size={160} />

        <h4 className="text-3xl font-bold text-white">{user?.name}</h4>
      </div>

      <div className="px-12 py-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <div className="text-black">
            <h5 className="font-bold">User ID</h5>
            <p className="text-base">{user?.id}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Name</h5>
            <p className="text-base">{user?.name}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Email</h5>
            <p className="text-base">{user?.email}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Contact</h5>
            <p className="text-base">{user?.contactNumber}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Status</h5>
            <Tag color={getTagColor(user?.status)} className="capitalize">
              {user?.status}
            </Tag>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Joined At</h5>
            <p>{dayjs(user?.createdAt).format("DD MMM YYYY, hh:mm A")}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
