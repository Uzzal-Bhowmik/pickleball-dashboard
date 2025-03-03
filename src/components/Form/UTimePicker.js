import { TimePicker } from "antd";
import { Form } from "antd";
import { Controller } from "react-hook-form";

export default function UTimePicker({
  label,
  name,
  use12Hours = true,
  format = "HH:mm a",
  placeholder,
  style = {},
  className,
  required = true,
}) {
  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: true,
          message: `${label} is required`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          <TimePicker
            {...field}
            use12Hours={use12Hours}
            format={format}
            placeholder={placeholder}
            style={{
              height: "35px",
              width: "100%",
              border: "1px solid gray",
              backgroundColor: "transparent",
              color: "black",
              ...style,
            }}
            className={className}
          />
        </Form.Item>
      )}
    />
  );
}
