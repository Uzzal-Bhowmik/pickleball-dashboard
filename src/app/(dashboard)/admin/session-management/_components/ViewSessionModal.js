"use client";

import CustomAvatar from "@/components/CustomAvatar";
import { Modal } from "antd";
import { Image } from "antd";
import NextImage from "next/image";
import placeholderImage from "../../../../../../public/placeholder-image.jpg";
import dayjs from "dayjs";

export default function ViewSessionModal({ open, setOpen, session }) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      centered
      footer={null}
      onCancel={() => setOpen(false)}
      width={"45%"}
    >
      <div className="flex gap-6 p-6">
        {/* Left Section */}
        <div className="w-2/3">
          <h2 className="mb-4 text-xl font-semibold">Session Details</h2>

          {/* Thumbnail */}
          {session?.thumbnail ? (
            <Image
              src={session?.thumbnail}
              alt="Session Thumbnail"
              height={300}
              width={300}
              className="w-full rounded-lg object-cover"
            />
          ) : (
            <Image
              src={placeholderImage?.src}
              alt="Session Thumbnail"
              height={300}
              width={300}
              className="w-full rounded-lg object-cover"
            />
          )}
          {/* Session Title */}
          <h3 className="mt-4 text-lg font-bold">{session?.name}</h3>

          {/* Description */}
          <p className="mt-2 text-gray-700">{session?.description}</p>

          {/* Time */}
          <div className="mt-4">
            <p className="font-bold">Time</p>
            <p className="text-gray-700">
              {dayjs(session?.start_time).format("HH:mm")} -{" "}
              {dayjs(session?.end_time).format("HH:mm")}
            </p>
          </div>

          {/* Duration */}
          <div className="mt-4">
            <p className="font-bold">Duration</p>
            <p className="text-gray-700">{session?.duration} minutes</p>
          </div>

          {/* Location */}
          <div className="mt-4">
            <p className="font-bold">Location</p>
            <a
              href={session?.locationLink ? session?.locationLink : "#"}
              className="text-gray-700"
            >
              {session?.location}
            </a>
          </div>

          {/* Skill Level */}
          <div className="mt-4">
            <p className="font-bold">Skill Level</p>
            <p className="capitalize text-gray-700">{session?.skill_level}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/3">
          {/* Coach Info */}
          <div className="mb-4 flex items-center space-x-3">
            <CustomAvatar
              src={session?.coach?.user?.photoUrl}
              name={session?.coach?.user?.name}
              size={30}
            />
            <div>
              <p className="font-bold">Coach</p>
              <p className="text-gray-700">{session?.coach?.user?.name}</p>
            </div>
          </div>

          {/* Session Details */}
          <div>
            <div>
              <p className="font-bold">Max Participants Allowed</p>
              <p className="text-gray-700">{session?.max_participants}</p>
            </div>

            <div className="my-4">
              <p className="font-bold">Price</p>
              <p className="text-gray-700">${session?.price}</p>
            </div>

            {session?.enable_waitlist && (
              <>
                <p className="font-bold">Maximum Waitlist Spots</p>
                <p className="text-gray-700">{session?.max_waitlist}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
