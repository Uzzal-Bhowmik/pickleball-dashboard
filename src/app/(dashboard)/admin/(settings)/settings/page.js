import { ChevronRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata = {
  title: "Settings",
  description: "Admin settings page",
};

const SETTINGS_LINKS = [
  {
    key: "profile-information",
    label: {
      admin: "Admin Information",
      hotel: "Hotel Information",
      apartment: "Apartment Information",
    },
    route: "profile",
    allowedRole: ["admin", "hotel", "apartment"],
  },
  {
    key: "privacy-policy",
    label: "Privacy Policy",
    route: "privacy-policy",
    allowedRole: ["admin"],
  },
  {
    key: "terms-conditions",
    label: "Terms & Conditions",
    route: "terms-conditions",
    allowedRole: ["admin"],
  },
  {
    key: "about-us",
    label: "About Us",
    route: "about-us",
    allowedRole: ["admin"],
  },
];

export default async function SettingsPage() {
  const pathname = (await headers()).get("x-pathname");

  const role = pathname?.split("/")[1];

  console.log(role);

  return (
    <div className="space-y-5">
      {SETTINGS_LINKS.map((item) => {
        if (item.allowedRole.includes(role)) {
          return (
            <Link
              key={item.key}
              href={`/${role}/${item.route}`}
              className="flex-center-between rounded-lg bg-primary p-5 text-lg text-white"
            >
              <span>
                {item.key === "profile-information"
                  ? item.label[role]
                  : item.label}
              </span>

              <ChevronRight size={22} />
            </Link>
          );
        }
      })}
    </div>
  );
}
