import { Flex } from "antd";
import { Image } from "antd";
import { Modal } from "antd";

export default function SessionThumbnailModal({ open, setOpen, thumbnail }) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      width={"750px"}
    >
      <Flex align="center" justify="center">
        {thumbnail?.includes("images") ? (
          <Image
            src={thumbnail}
            alt="Session Thumbnail"
            height={500}
            width={700}
            className="rounded-xl object-cover object-center"
          />
        ) : (
          thumbnail?.includes("videos") && (
            <video src={thumbnail} height={500} width={700}></video>
          )
        )}
      </Flex>
    </Modal>
  );
}
