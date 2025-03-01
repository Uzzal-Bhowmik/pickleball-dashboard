const getTagColor = (value) => {
  let color = "";
  switch (value?.toLowerCase()) {
    case "active":
      color = "green-inverse";
      break;
    case "blocked":
      color = "red-inverse";
      break;
    case "annual fee":
      color = "green-inverse";
      break;
    case "monthly fee":
      color = "geekblue-inverse";
      break;
  }

  return color;
};

export default getTagColor;
