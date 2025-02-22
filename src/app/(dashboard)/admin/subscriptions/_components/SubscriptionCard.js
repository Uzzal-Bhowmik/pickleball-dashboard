import { Button } from "antd";
import { Check } from "lucide-react";

export default function SubscriptionCard({ subscription }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-white p-4 transition-all hover:shadow-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-lg text-gray-600">{subscription.slogan}</p>
          <div className="space-y-1">
            <h3 className="text-2xl font-medium tracking-tight">
              {subscription.title}
            </h3>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">${subscription.cost}</span>
              <span className="text-gray-600">.00</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {subscription.features.map((feature, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <div className="rounded-full bg-primary/10 p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Button type="primary" className="w-full">
          Edit
        </Button>
        <Button
          style={{ backgroundColor: "var(--primary-red)", color: "white" }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
