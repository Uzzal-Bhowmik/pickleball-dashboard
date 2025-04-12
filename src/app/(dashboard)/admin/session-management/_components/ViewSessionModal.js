"use client";

import CustomAvatar from "@/components/CustomAvatar";
import { Modal } from "antd";
import { Image } from "antd";
import placeholderImage from "@/assets/images/placeholder-image.webp";
import dayjs from "dayjs";
import { useGetSessionTimeSlotsQuery } from "@/redux/api/sessionApi";

export default function ViewSessionModal({ open, setOpen, session }) {
  // Get session time slots by session id
  const { data: sessionTimeSlotsRes } = useGetSessionTimeSlotsQuery(
    { sessionId: session?._id, arg: { limit: 999999 } },
    { skip: !session?._id },
  );

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      centered
      footer={null}
      onCancel={() => setOpen(false)}
      width={"45%"}
    >
      <div className="view-session-modal flex gap-6 p-6">
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
              src={session?.coach?.photoUrl}
              name={session?.coach?.name}
              size={30}
            />
            <div>
              <p className="font-bold">Coach</p>
              <p className="text-gray-700">{session?.coach?.name}</p>
            </div>
          </div>

          {/* Session Details */}
          <div>
            <div>
              <p className="font-bold">Max Participants Allowed</p>
              <p className="text-gray-700">{session?.max_participants}</p>
            </div>

            <div className="my-4">
              <p className="font-bold">Required Credits</p>
              <p className="text-gray-700">{session?.credit}</p>
            </div>

            {session?.enable_waitlist && (
              <>
                <p className="font-bold">Maximum Waitlist Spots</p>
                <p className="text-gray-700">{session?.max_waitlist}</p>
              </>
            )}

            {/* Duration */}
            <div className="mt-4">
              <p className="font-bold">Duration</p>
              <p className="text-gray-700">{session?.duration} minutes</p>
            </div>

            {/* Start Date */}
            <div className="mt-4">
              <p className="font-bold">Start Date</p>
              <p className="text-gray-700">
                {dayjs(session?.startDate).format("MMM DD, YYYY")}
              </p>
            </div>

            {/* Session Time Slots */}
            {sessionTimeSlotsRes?.data?.length > 0 && (
              <div className="mt-4">
                <p className="font-bold">
                  Time Slots ({sessionTimeSlotsRes?.data?.length})
                </p>
                <table className="mt-2">
                  <thead>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </thead>
                  <tbody>
                    {sessionTimeSlotsRes?.data?.map((timeSlot, idx) => (
                      <tr key={timeSlot._id}>
                        <td>{timeSlot?.startTime}</td>
                        <td>{timeSlot?.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
