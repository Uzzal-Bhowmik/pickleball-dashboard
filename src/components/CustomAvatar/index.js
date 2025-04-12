import { Image } from "antd";

export default function CustomAvatar({ src, name, size = 24, ...props }) {
  return (
    <Image
      src={src}
      alt={name || "Avatar"}
      height={size}
      width={size}
      {...props}
      className="rounded-full object-cover object-center ring-2 ring-primary/75"
      fallback={"/placeholder-image.webp"}
    />
  );
}
