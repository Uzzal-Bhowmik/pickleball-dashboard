import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const UDatePicker = ({
  name,
  label,
  size = "large",
  placeholder,
  labelStyles = {},
  format,
  showTime = false,
  picker,
  style,
  required,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: label || "This field" + " is required",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label && label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          <DatePicker
            {...field}
            showTime={showTime}
            id={name}
            picker={picker}
            size={size}
            placeholder={placeholder}
            format={format}
            onChange={(date) => {
              field.onChange(date ? dayjs(date).format(format) : null);
            }}
            value={field.value ? dayjs(field.value) : null}
            style={style ? style : { height: "38px", width: "100%" }}
            disabledDate={disabled}
          />
        </Form.Item>
      )}
    />
  );
};

export default UDatePicker;
