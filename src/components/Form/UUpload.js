import { Upload } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { CloudUpload } from "lucide-react";
import { message } from "antd";
import toast from "react-hot-toast";

export default function UUpload({
  name,
  label,
  uploadTitle,
  maxCount = 1,
  labelStyles = {},
  fileList,
  fileType = "image",
  fileSize = 5,
  required = true,
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={fileList}
      rules={{
        required: {
          value: required,
          message: `${label} is required`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-3">
          <label
            style={labelStyles}
            className="mb-2 flex items-center gap-x-1 font-medium"
          >
            {required && <span className="text-[#ff4d4f]">*</span>} {label}
          </label>

          <div className="flex-center scroll-hide max-h-32 w-full overflow-auto rounded-xl border-2 border-dashed border-gray-300">
            <Upload
              name={field.name}
              listType="picture"
              maxCount={maxCount}
              fileList={field.value || []}
              onChange={(info) => {
                field.onChange(info.fileList);
              }}
              multiple={maxCount > 1}
              beforeUpload={(file) => {
                const isValidFileType = file.type.startsWith(fileType);
                const isValidFileSize = file.size / 1024 / 1024 < fileSize; // default 5 MB

                // console.log(file);

                if (!file.type.startsWith(fileType)) {
                  toast.error(
                    `Invalid file type!! Only ${fileType} files are allowed.`,
                  );
                  return Upload.LIST_IGNORE;
                }

                if (!isValidFileSize) {
                  toast.error("File size exceeds 5MB!!");
                  return Upload.LIST_IGNORE;
                }

                return true;
              }}
              className="!h-32 !py-10"
            >
              <button
                type="button"
                className="flex-center !mx-auto w-max gap-x-2 rounded-md border border-black/10 bg-white px-4 py-2 font-medium shadow-sm transition-all duration-300 ease-in-out active:scale-95"
              >
                <CloudUpload size={20} /> Upload {uploadTitle}
              </button>
            </Upload>
          </div>

          {error && <p className="text-danger">{error.message}</p>}
        </div>
      )}
    />
  );
}
