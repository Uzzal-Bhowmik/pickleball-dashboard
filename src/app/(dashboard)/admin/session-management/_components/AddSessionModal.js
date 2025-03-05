"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import USwitch from "@/components/Form/USwitch";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { useCreateSessionMutation } from "@/redux/api/sessionApi";
import { useGetAllTrainersQuery } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
import { formatTime } from "@/utils/formatTime";
import { Switch } from "antd";
import { Col, Flex, Row } from "antd";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddSessionModal({ open, setOpen }) {
  const [enableWaitlist, setEnableWaitlist] = useState(false);

  // Get all trainer/coach
  const { data: trainerRes } = useGetAllTrainersQuery();

  // Create session
  const [createSession, { isLoading: isCreatingSession }] =
    useCreateSessionMutation();

  const onSubmit = (data) => {
    const image = data?.image?.length > 0 ? data?.image[0] : null;

    const formData = new FormData();

    // Append image
    if (image) {
      formData.append("image", image.originFileObj);
    }

    // Format times
    const formattedStartTime = formatTime.dateTimeObjToString(
      data?.start_time,
      "HH:mm",
    );
    const formattedEndTime = formatTime.dateTimeObjToString(
      data?.end_time,
      "HH:mm",
    );

    delete data["image"];
    delete data["start_time"];
    delete data["end_time"];

    formData.append(
      "data",
      JSON.stringify({
        ...data,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        enable_waitlist: enableWaitlist,
      }),
    );

    catchAsync(async () => {
      await createSession(formData).unwrap();

      toast.success("Session created successfully");
      setOpen(false);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Create a new session"
      width={"55%"}
    >
      <FormWrapper onSubmit={onSubmit}>
        <UUpload
          name="image"
          label="Upload Thumbnail Field"
          uploadTitle="thumbnail"
          fileType="image"
        />

        <div className="grid grid-cols-2 gap-x-8">
          <UInput name="name" label="Session Title" required />

          <USelect
            name="skill_level"
            label="Skill Label"
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
            prefix={"$"}
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
          loading={isCreatingSession}
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
