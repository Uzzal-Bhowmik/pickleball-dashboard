"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className=" p-5">
      {pathname !== "/admin/settings" && (
        <Link href="/admin/settings" className="flex-center-start mb-8 gap-x-2">
          <ArrowLeft size={16} className="mb-1" /> Settings
        </Link>
      )}

      {children}
    </div>
  );
}
