"use client";

import { Image } from "antd";
import adminImg from "@/assets/images/user-avatar-md.png";
import { ImagePlus } from "lucide-react";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";
import { Tabs } from "antd";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useSelector } from "react-redux";
import placeholderImage from "@/assets/images/placeholder-image.webp";
import ChangeProfilePicModal from "./ChangeProfilePicModal";
import { useState } from "react";

export default function ProfileContainer() {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [showChangePicModal, setShowChangePicModal] = useState(false);

  const { data: myProfileRes } = useGetProfileQuery({}, { skip: !userId });
  const myProfile = myProfileRes?.data || {};

  const tabItems = [
    {
      key: "editProfile",
      label: "Edit Profile",
      children: <EditProfileForm myProfile={myProfile} />,
    },
    {
      key: "changePassword",
      label: "Change Password",
      children: <ChangePassForm />,
    },
  ];

  return (
    <ConfigProvider>
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            {myProfile?.photoUrl ? (
              <Image
                src={myProfile?.photoUrl}
                alt="Admin avatar"
                height={150}
                width={150}
                className="aspect-square h-auto w-[160px] rounded-full border-2 border-primary object-cover object-center p-1"
                fallback={"/placeholder-image.webp"}
              />
            ) : (
              <Image
                src={adminImg}
                alt="Admin avatar"
                height={150}
                width={150}
                className="aspect-square h-auto w-[160px] rounded-full border-2 border-primary object-cover object-center p-1"
              />
            )}

            {/* Edit button */}
            <button
              className="flex-center absolute bottom-2 right-2 aspect-square rounded-full bg-primary p-2 text-white/95"
              onClick={() => setShowChangePicModal(true)}
            >
              <ImagePlus size={18} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">{myProfile?.name}</h3>
            <p className="text-primary-blue mt-1 text-lg font-medium">
              Administrator
            </p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered items={tabItems} />
        </section>
      </div>

      <ChangeProfilePicModal
        open={showChangePicModal}
        setOpen={setShowChangePicModal}
        profile={myProfile}
      />
    </ConfigProvider>
  );
}
