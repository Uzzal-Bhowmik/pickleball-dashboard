export const getFormattedBookingData = (data) => {
  // Find min and max booking values
  const minBooking = Math.min(...data.map((d) => d.booking));
  const maxBooking = Math.max(...data.map((d) => d.booking));

  const formattedArray = data.map((item) => {
    const formatted =
      Number(data.booking) - minBooking !== 0
        ? ((Number(item.booking) - minBooking) / (maxBooking - minBooking)) *
          100
        : 0;

    let intensity;
    if (formatted < 25) {
      intensity = "low";
    } else if (formatted < 50) {
      intensity = "normal";
    } else if (formatted < 75) {
      intensity = "medium";
    } else {
      intensity = "high";
    }

    return { ...item, intensity };
  });

  return formattedArray;
};
