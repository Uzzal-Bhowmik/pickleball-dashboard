"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UDatePicker from "@/components/Form/UDatePicker";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import UTimePicker from "@/components/Form/UTimePicker";
import UUpload from "@/components/Form/UUpload";
import { useCreateSessionMutation } from "@/redux/api/sessionApi";
import { useGetAllTrainersQuery } from "@/redux/api/trainerApi";
import catchAsync from "@/utils/catchAsync";
import { Row, Switch } from "antd";
import { Divider } from "antd";
import { Space } from "antd";
import { Col, Flex } from "antd";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddSessionModal({ open, setOpen }) {
  const [enableWaitlist, setEnableWaitlist] = useState(false);
  const [timeSlots, setTimeSlots] = useState([{ key: 1 }]);

  // Get all trainer/coach
  const { data: trainerRes } = useGetAllTrainersQuery();

  // Function to add more time slot fields
  const addTimeSlotField = () => {
    const newField = { key: timeSlots.length + 1 };
    setTimeSlots([...timeSlots, newField]);
  };

  const removeTimeSlotField = (key) => {
    const restFields = timeSlots.filter((field) => field.key !== key);
    setTimeSlots(restFields);
  };

  // Create session
  const [createSession, { isLoading: isCreatingSession }] =
    useCreateSessionMutation();

  // Handle submit
  const onSubmit = (data) => {
    const image = data?.image?.length > 0 ? data?.image[0] : null;

    const formData = new FormData();

    // Append image
    if (image) {
      formData.append("image", image.originFileObj);
    }

    // Format time slots
    const formattedTimeSlots = timeSlots?.map((timeSlot) => {
      const timeSlotData = {
        startTime: dayjs(data[`startTime_${timeSlot.key}`]).format("hh:mm A"),
        endTime: dayjs(data[`endTime_${timeSlot.key}`]).format("hh:mm A"),
      };

      delete data[`startTime_${timeSlot.key}`];
      delete data[`endTime_${timeSlot.key}`];

      return timeSlotData;
    });

    delete data["image"];

    formData.append(
      "data",
      JSON.stringify({
        ...data,
        startDate: dayjs(data?.startDate).format("YYYY-MM-DD"),
        slots: formattedTimeSlots,
        enable_waitlist: enableWaitlist,
      }),
    );

    catchAsync(async () => {
      await createSession(formData).unwrap();
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
          <UInput name="name" label="Session Title" required={true} />

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

        <Divider variant="dashed">Session Time Management</Divider>

        <div className="mb-10 grid grid-cols-2 gap-x-8">
          <UDatePicker
            name="startDate"
            label="Start Date"
            placeholder=""
            required={true}
            disabled={(current) => current && current < dayjs().startOf("day")}
          />
          <UInput name="duration" label="Duration (in days)" required={true} />

          {timeSlots.map((field, index) => (
            <Row key={field.key} align="middle" gutter={16}>
              <Col span={11}>
                <UTimePicker
                  label={`Start Time ${index + 1}`}
                  name={`startTime_${index + 1}`}
                />
              </Col>

              <Col span={11}>
                <UTimePicker
                  label={`End Time ${index + 1}`}
                  name={`endTime_${index + 1}`}
                />
              </Col>

              {index > 0 && (
                <Col span={2}>
                  <Button
                    icon={<Trash2 size={20} />}
                    color="danger"
                    onClick={() => removeTimeSlotField(field.key)}
                  />
                </Col>
              )}
            </Row>
          ))}
          <Space>
            <Button
              type="dashed"
              size="large"
              onClick={addTimeSlotField}
              icon={<PlusCircle size={20} />}
              className=""
            >
              Add Time Slot
            </Button>
          </Space>
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
