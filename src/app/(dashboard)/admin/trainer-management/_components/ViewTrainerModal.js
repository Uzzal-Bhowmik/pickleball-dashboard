import { Tag } from "antd";
import { Modal } from "antd";
import Image from "next/image";
import userImage from "@/assets/images/session/user.png";

export default function ViewTrainerModal({ open, setOpen }) {
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
        <div className="relative h-24 w-24">
          <Image
            src={userImage}
            alt="Trainer photo"
            fill
            className="rounded-full border-4 border-background object-cover shadow-xl"
          />
        </div>
        <h1 className="text-2xl font-bold">John Smith</h1>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Email Address
          </label>
          <p className="font-medium">john.smith@gmail.com</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Trainer ID
          </label>
          <p className="font-medium">1234</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Experience
          </label>
          <p className="font-medium">10 years</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Rating
          </label>
          <div className="flex items-center gap-2">
            <span className="font-medium">4.8</span>
            <span className="text-yellow-400">★</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Rate
          </label>
          <p className="font-medium">$50/hour</p>
        </div>
        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">
            Availability
          </label>
          <p className="font-medium">Mon-Sat</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-muted-foreground mb-2 block text-sm font-bold">
            Expertise
          </label>
          <Tag color="blue-inverse">Doubles Strategy</Tag>
        </div>

        <div className="space-y-2">
          <label className="text-muted-foreground text-sm font-bold">Bio</label>
          <p className="text-muted-foreground text-sm leading-relaxed">
            With over 12 years of coaching experience, Coach John specializes in
            doubles strategy, footwork patterns, and tournament preparation. An
            IPTPA-certified instructor and former national champion, he has
            helped players of all levels refine their technique and elevate
            their game. Passionate about precision and strategy, Coach
            John&apos;s training focuses on building confidence, smart shot
            selection, and court awareness. Whether you&apos;re a beginner or a
            competitive player, his tailored coaching approach ensures
            measurable improvement and on-court success. 🎾🔥
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-muted-foreground text-sm font-bold">
            Achievements
          </label>
          <ul className="text-muted-foreground space-y-2 text-sm">
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
          </ul>
        </div>
      </div>
    </Modal>
  );
}
