import { Select } from "antd";
import { Form } from "antd";
import { Controller } from "react-hook-form";

const USelect = ({
  name,
  label,
  placeholder,
  options,
  size,
  defaultValue,
  showSearch,
  mode,
  disabled = false,
  filterOption,
  style,
  labelStyles = {},
  required = true,
  showDropdown,
}) => {
  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: true,
          message: `${label} is required`,
        },
      }}
      render={({
        field: { onChange, value: fieldValue },
        fieldState: { error },
      }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          required={required}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Select
            mode={mode}
            filterOption={filterOption}
            showSearch={showSearch}
            value={fieldValue || defaultValue}
            size={size}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            style={{ ...style, height: style?.height || "35px" }}
            disabled={disabled}
            open={showDropdown}
          />
        </Form.Item>
      )}
    />
  );
};

export default USelect;
