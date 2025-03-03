import { Tag } from "antd";
import { Modal } from "antd";
import CustomAvatar from "@/components/CustomAvatar";
import { Flex } from "antd";

export default function ViewTrainerModal({ open, setOpen, selectedTrainer }) {
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
          src={selectedTrainer?.user?.photoUrl}
          name={selectedTrainer?.user?.name}
          size={150}
        />
        <h1 className="text-2xl font-bold">{selectedTrainer?.user?.name}</h1>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Email Address
          </label>
          <p className="font-medium">{selectedTrainer?.user?.email}</p>
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

        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Availability
          </label>
          <Flex align="center" justify="start" gap={5} wrap>
            {selectedTrainer?.availability?.map((day) => (
              <Tag key={day} color="green" className="capitalize">
                {day}
              </Tag>
            ))}
          </Flex>
        </div>

        <div>
          <label className="text-muted-foreground text-sm font-bold">
            Time Slot
          </label>
          <p className="font-medium">
            {selectedTrainer?.start_time} - {selectedTrainer?.end_time}
          </p>
        </div>

        <div>
          <label className="text-muted-foreground text-sm font-bold">
            Contact Number
          </label>
          <p className="font-medium">
            {selectedTrainer?.user?.contactNumber || "--"}
          </p>
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
          {/* <ul className="text-muted-foreground space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              Certified IPTPA Level II Coach – Recognized for excellence in
              player development
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              Coached 100+ Players to Tournament Wins – Including state and
              national titles
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              Former Professional Player – Competed in League/Tournament at an
              elite level
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              Featured Speaker at Pickleball Summits – Conducted training
              workshops and strategy sessions
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              Top-Ranked Doubles Player – Dominated competitive circuits
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              Developed Training Programs for Elite Players – Customized drills
              and performance-based coaching
            </li>
          </ul> */}

          <p>{selectedTrainer?.achievement}</p>
        </div>
      </div>
    </Modal>
  );
}
