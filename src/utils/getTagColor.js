const getTagColor = (value) => {
  let color = "";
  switch (value) {
    case "Active":
      color = "green-inverse";
      break;
    case "Blocked":
      color = "geekblue-inverse";
      break;
    case "Annual Fee":
      color = "green-inverse";
      break;
    case "Monthly Fee":
      color = "geekblue-inverse";
      break;
   
  }

  return color;
};

export default getTagColor;
