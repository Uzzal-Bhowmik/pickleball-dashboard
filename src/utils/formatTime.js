import dayjs from "dayjs";

const dateTimeObjToString = (date, format = "") => {
  if (format) {
    return dayjs(date).format(format);
  }

  return dayjs(date).toISOString();
};

export const formatTime = {
  dateTimeObjToString,
};
