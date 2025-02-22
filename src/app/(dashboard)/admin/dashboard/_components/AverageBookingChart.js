import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getFormattedBookingData } from "../_utils/formatAverageBookingData";
import { Tooltip } from "antd";

const bookingData = {
  2024: [
    { month: "Jan", booking: 400 },
    { month: "Feb", booking: 240 },
    { month: "Mar", booking: 252 },
    { month: "Apr", booking: 222 },
    { month: "May", booking: 253 },
    { month: "Jun", booking: 264 },
    { month: "Jul", booking: 293 },
    { month: "Aug", booking: 234 },
    { month: "Sep", booking: 399 },
    { month: "Oct", booking: 226 },
    { month: "Nov", booking: 264 },
    { month: "Dec", booking: 500 },
  ],
};

export default function AverageBookingChart() {
  /**
   *
   * This function takes intensity as a number
   * and returns a background color based on the intensity
   *
   * @param {number} - intensity
   * @returns {string} - tailwind bg class
   */
  const getBackgroundColor = (intensity) => {
    if (intensity === "low") {
      return "bg-primary/40";
    } else if (intensity === "normal") {
      return "bg-primary/60";
    } else if (intensity === "medium") {
      return "bg-primary/80";
    } else {
      return "bg-primary";
    }
  };

  return (
    <div className="rounded-xl p-6 pb-10 w-full xl:w-1/2 bg-white">
      <Flex align="start" justify="space-between">
        <div>
          <h4 className="font-bold text-xl mb-3">Average Booking</h4>
          <h1 className="text-2xl font-bold flex-center-start gap-x-2">
            <Icon icon="ic:outline-plus-minus" /> 52 Booking
          </h1>
          <p className="font-medium text-gray-500">This Year</p>
        </div>

        <DatePicker
          // onChange={(_, dateString) =>
          //   setJoinYear(moment(dateString).format("YYYY"))
          // }
          picker="year"
          defaultValue={dayjs()}
          className="!text-white !border-none !py-1.5"
        />
      </Flex>

      {/* Chart */}
      <div className="grid grid-cols-4 gap-8 mt-5  w-3/4 place-items-center mx-auto">
        {getFormattedBookingData(bookingData["2024"]).map((data) => (
          <div key={data.month} className="w-10 h-12">
            <Tooltip title={data.booking + " bookings"} className="!text-sm">
              <div
                className={cn("w-full h-9", getBackgroundColor(data.intensity))}
              />
            </Tooltip>

            <p className="mt-1 text-gray-500 font-medium text-center">
              {data.month}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
