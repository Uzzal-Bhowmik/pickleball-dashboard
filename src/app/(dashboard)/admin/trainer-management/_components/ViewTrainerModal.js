import { Tag } from "antd";
import { Modal } from "antd";
import CustomAvatar from "@/components/CustomAvatar";
import { Flex } from "antd";

export default function ViewTrainerModal({ open, setOpen, selectedTrainer }) {
  console.log({ selectedTrainer });
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Trainer Details"
      width={"40%"}
    >
      <div className="mb-6 flex flex-col items-start space-y-3">
        <CustomAvatar
          src={selectedTrainer?.photoUrl}
          name={selectedTrainer?.name}
          size={150}
        />
        <h1 className="text-2xl font-bold">{selectedTrainer?.name}</h1>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Email Address
          </label>
          <p className="font-medium">{selectedTrainer?.email}</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Trainer ID
          </label>
          <p className="font-medium">{selectedTrainer?.id}</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Experience
          </label>
          <p className="font-medium">{selectedTrainer?.experience} years</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Rating
          </label>
          <div className="flex items-center gap-2">
            <span className="font-medium">{selectedTrainer?.avgRating}</span>
            <span className="text-yellow-400">★</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Rate
          </label>
          <p className="font-medium">${selectedTrainer?.per_hour_rate}/hour</p>
        </div>

        <div>
          <label className="text-muted-foreground text-sm font-bold">
            Contact Number
          </label>
          <p className="font-medium">
            {selectedTrainer?.contactNumber || "--"}
          </p>
        </div>

        <div>
          <label className="text-muted-foreground text-sm font-bold">
            Location
          </label>
          <p className="font-medium">{selectedTrainer?.location || "--"}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-muted-foreground mb-2 block text-sm font-bold">
            Coaching Expertise
          </label>

          <Flex>
            {selectedTrainer?.coaching_expertise?.map((expertise) => (
              <Tag key={expertise} color="blue" className="capitalize">
                {expertise}
              </Tag>
            ))}
          </Flex>
        </div>

        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">Bio</label>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {selectedTrainer?.bio}
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-muted-foreground text-sm font-bold">
            Achievements
          </label>

          <p>{selectedTrainer?.achievement}</p>
        </div>
      </div>
    </Modal>
  );
}
