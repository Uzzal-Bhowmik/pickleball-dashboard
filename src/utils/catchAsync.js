import { toast } from "react-toastify";

const catchAsync = async (fn) => {
  try {
    await fn();
  } catch (error) {
    toast.error(
      error?.message || error?.data?.message || "Something Went Wrong!",
    );
    return error;
  }
};

export default catchAsync;
