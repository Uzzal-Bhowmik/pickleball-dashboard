import Image from "next/image";
import adminImg from "@/assets/images/user-avatar-md.png";
import { ImagePlus } from "lucide-react";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";
import { Tabs } from "antd";

export default function ProfileContainer() {
  const tabItems = [
    {
      key: "editProfile",
      label: "Edit Profile",
      children: <EditProfileForm />,
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
            <Image
              src={adminImg}
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="aspect-square h-auto w-[160px] rounded-full border-2 border-primary p-1"
            />

            {/* Edit button */}
            <button className="flex-center absolute bottom-2 right-2 aspect-square rounded-full bg-primary p-2 text-white/95">
              <ImagePlus size={18} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">Glimm Catcher</h3>
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
    </ConfigProvider>
  );
}
