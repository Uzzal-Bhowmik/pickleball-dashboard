import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
const { TextArea } = Input;

export default function UTextArea({
  name,
  label,
  labelStyles = {},
  placeholder,
  maxLength,
  minRows = 5,
  style,
  required = true,
}) {
  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: `${label} is required`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label htmlFor={name} style={labelStyles}>
                {label}
              </label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          <TextArea
            {...field}
            id={name}
            placeholder={placeholder}
            maxLength={maxLength}
            style={style}
            showCount={true}
            autoSize={{
              minRows: minRows,
            }}
          />
        </Form.Item>
      )}
    />
  );
}
