import { Avatar } from "antd";

export default function CustomAvatar({ src, name, size = 24, ...props }) {
  return src ? (
    <Avatar src={src} size={size} {...props} />
  ) : (
    <Avatar size={size} {...props}>
      {name}
    </Avatar>
  );
}
