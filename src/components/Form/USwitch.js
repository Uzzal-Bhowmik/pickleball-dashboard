import { Switch } from "antd";
import { Form } from "antd";
import { Controller } from "react-hook-form";

export default function USwitch({ name, label }) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Switch defaultChecked onChange={field.onChange} size="large" />
        </Form.Item>
      )}
    />
  );
}
