"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UUpload from "@/components/Form/UUpload";
import { useUpdateProfileMutation } from "@/redux/api/authApi";
import catchAsync from "@/utils/catchAsync";
import { Modal } from "antd";
import { Button } from "antd";

export default function ChangeProfilePicModal({ open, setOpen, profile }) {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleSubmit = async (data) => {
    if (data?.image?.length > 0) {
      if (!data?.image[0]?.originFileObj) {
        return errorToast("Please select a new image!!");
      }
    }

    const formData = new FormData();
    formData.append("image", data?.image[0]?.originFileObj);

    catchAsync(async () => {
      await updateProfile(formData).unwrap();
      setOpen(false);
    });
  };

  if (!profile?._id) {
    return;
  }

  const defaultValues = {
    image: profile?.photoUrl
      ? [
          {
            uid: "-1",
            name: "profile_picture",
            url: profile?.photoUrl,
            status: "completed",
          },
        ]
      : [],
  };

  return (
    <Modal
      centered
      onCancel={() => setOpen(false)}
      open={open}
      footer={null}
      title="Change Profile Picture"
    >
      <FormWrapper defaultValues={defaultValues} onSubmit={handleSubmit}>
        <UUpload
          name={"image"}
          label={"Profile Picture"}
          maxCount={1}
          uploadTitle={"profile picture"}
        />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isUpdating}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
