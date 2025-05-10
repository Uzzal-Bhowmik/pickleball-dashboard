import CustomModal from "@/components/CustomModal";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import UTextArea from "@/components/Form/UTextArea";
import { useUpdatePackageMutation } from "@/redux/api/packageApi";
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

export default function EditSubscriptionPackageModal({
  open,
  setOpen,
  selectedPackage,
}) {
  const [editPackage, { isLoading: isUpdatingPackage }] =
    useUpdatePackageMutation();

  const onSubmit = (data) => {
    let description = [];

    if (data?.description) {
      description = data?.description?.split(",");
    } else {
      description = [`Buy credits at a ${data?.discount}% discounted rate`];
    }

    catchAsync(async () => {
      await editPackage({
        id: selectedPackage?._id,
        data: {
          ...data,
          description,
          price: Number(data?.price),
        },
      }).unwrap();

      toast.success("Package created successfully");
      setOpen(false);
    });
  };

  console.log({ selectedPackage });
  if (!selectedPackage?._id) return null;

  return (
    <CustomModal open={open} setOpen={setOpen} title="Edit package">
      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={{
          title: selectedPackage?.title,
          billingCycle: selectedPackage?.billingCycle,
          price: selectedPackage?.price,
          discount: selectedPackage?.discount,
          description: selectedPackage?.description?.join(","),
        }}
      >
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
          loading={isUpdatingPackage}
        >
          Submit
        </Button>
      </FormWrapper>
    </CustomModal>
  );
}
