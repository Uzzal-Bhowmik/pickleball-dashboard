"use client";

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const UInput = ({
  type,
  name,
  label,
  size,
  placeholder,
  disabled = false,
  labelStyles = {},
  className,
  suffix,
  prefix,
  style,
  max,
  min,
  minLength,
  required = true,
}) => {
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
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              className={`h-9 ${className}`}
            />
          ) : (
            <Input
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              className={`h-9 ${className}`}
              suffix={suffix}
              prefix={prefix}
              style={style}
              max={max}
              min={min}
              minLength={minLength}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default UInput;
