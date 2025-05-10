import CustomModal from "@/components/CustomModal";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import { useCreatePackageMutation } from "@/redux/api/packageApi";
import catchAsync from "@/utils/catchAsync";
import { Button } from "antd";
import { toast } from "react-toastify";

const billingCycleSelectOptions = [
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
];

export default function AddSubscriptionPackageModal({ open, setOpen }) {
  const [createPackage, { isLoading: isCreatingPackage }] =
    useCreatePackageMutation();

  const onSubmit = (data) => {
    let description = [`Buy credits at a ${data?.discount}% discounted rate`];

    if (data?.description) {
      inputtedDescription = data?.description?.split(",");
      description = [...description, ...inputtedDescription];
      delete data?.description;
    }

    catchAsync(async () => {
      await createPackage({
        ...data,
        description,
        price: Number(data?.price),
      }).unwrap();

      toast.success("Package created successfully");
      setOpen(false);
    });
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Add  new package">
      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="title"
          label="Package Title"
          placeholder="Enter name of the package"
          minLength={5}
          required
        />

        <USelect
          name="billingCycle"
          label="Billing Cycle"
          options={billingCycleSelectOptions}
          placeholder="Select billing cycle"
          required
        />

        <UInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter price"
          required
        />

        <UTextArea
          name="description"
          label="Description (Optional)"
          placeholder="Enter description with comma separation like: feature1, feature 2, ..."
          required={false}
        />

        <UInput
          name="discount"
          type="number"
          label="Discount (%)"
          placeholder="Enter the discount percentage user will get after purchasing this package."
          min={0}
          max={100}
          required
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full"
          loading={isCreatingPackage}
        >
          Submit
        </Button>
      </FormWrapper>
    </CustomModal>
  );
}
