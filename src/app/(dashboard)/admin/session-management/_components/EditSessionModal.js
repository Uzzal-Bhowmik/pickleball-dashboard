"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import USwitch from "@/components/Form/USwitch";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { useEditSessionMutation } from "@/redux/api/sessionApi";
import { useGetAllTrainersQuery } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
import { Col, Row, Switch } from "antd";
import { Flex } from "antd";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditSessionModal({ open, setOpen, session }) {
  const [enableWaitlist, setEnableWaitlist] = useState(
    session?.enable_waitlist || false,
  );
  const thumbnailFilelist = session?.thumbnail
    ? [
        {
          uid: "-1",
          name: "thumbnail",
          status: "done",
          url: session.thumbnail,
        },
      ]
    : [];

  // Get all trainer/coach
  const { data: trainerRes } = useGetAllTrainersQuery();

  const [editSession, { isLoading: isEditing }] = useEditSessionMutation();
  const onSubmit = (data) => {
    const formdata = new FormData();
    // append image
    if (data?.image?.length > 0 && data?.image[0]?.originFileObj) {
      formdata.append("image", data?.image[0]?.originFileObj);
    }

    delete data["image"];

    formdata.append(
      "data",
      JSON.stringify({
        ...data,
        start_time: dayjs(data?.start_time).format("HH:mm"),
        end_time: dayjs(data?.end_time).format("HH:mm"),
        enable_waitlist: enableWaitlist,
      }),
    );

    catchAsync(async () => {
      await editSession({ id: session?._id, data: formdata }).unwrap();
      // toast.success("Session Updated Successfully");
      setOpen(false);
    });
  };

  useEffect(() => {
    if (!session) {
      return null;
    }

    setEnableWaitlist(session?.enable_waitlist);
  }, [session]);

  if (!session) return null;

  const defaultValues = {
    name: session?.name,
    skill_level: session?.skill_level,
    description: session?.description,
    coach: session?.coach?._id,
    start_time: dayjs(session?.start_time, "HH:mm"),
    end_time: dayjs(session?.end_time, "HH:mm"),
    image: thumbnailFilelist,
    max_participants: session?.max_participants,
    price: session?.price,
    status: session?.status,
    duration: session?.duration,
    location: session?.location,
    locationLink: session?.locationLink,
    max_waitlist: session?.max_waitlist,
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Update Session"
      width={"55%"}
    >
      <FormWrapper onSubmit={onSubmit} defaultValues={defaultValues}>
        <UUpload
          name="image"
          label="Upload Thumbnail Field"
          uploadTitle="thumbnail"
          fileType="image"
          required={false}
        />

        <div className="grid grid-cols-2 gap-x-8">
          <UInput name="name" label="Session Title" required />

          <USelect
            name="skill_level"
            label="Skill Level"
            options={[
              {
                label: "Beginner",
                value: "beginner",
              },
              {
                label: "Intermediate",
                value: "intermediate",
              },
              {
                label: "Advanced",
                value: "advanced",
              },
            ]}
            required
          />

          <UTextArea name="description" label="Description" required />

          <USelect
            name="coach"
            label="Select Coach"
            options={trainerRes?.data?.map((trainer) => ({
              label: trainer?.user?.name,
              value: trainer?._id,
            }))}
            required
          />

          <UInput
            type="number"
            name="max_participants"
            label="Max Participants Allowed"
            required
          />

          <Row gutter={20}>
            <Col span={12}>
              <UTimePicker
                name="start_time"
                label="Start Time"
                format="HH:mm"
                use12Hours={false}
                required
              />
            </Col>

            <Col span={12}>
              <UTimePicker
                name="end_time"
                label="End Time"
                format="HH:mm"
                use12Hours={false}
                required
              />
            </Col>
          </Row>

          <UInput
            type="number"
            name="duration"
            label="Duration (in minutes!)"
            required
          />

          <UInput
            type="number"
            name="price"
            label="Price"
            prefix={"£"}
            required
          />

          <UInput name="location" label="Location" required />
          <UInput
            name="locationLink"
            label="Location Link (Optional)"
            placeholder="https://maps.app.goo.gl/pTYQXSawQsUKMvsq5"
            required={false}
          />

          <Flex vertical align="start" gap={10}>
            <label htmlFor="enableWaitlist">Enable Waitlist</label>
            <Switch
              id="enableWaitlist"
              value={enableWaitlist}
              onChange={setEnableWaitlist}
              style={{
                width: "max-content",
              }}
            />
          </Flex>

          <UInput
            type="number"
            name="max_waitlist"
            label="Maximum Wait List Spots"
            disabled={!enableWaitlist}
            required={false}
          />
        </div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          loading={isEditing}
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
