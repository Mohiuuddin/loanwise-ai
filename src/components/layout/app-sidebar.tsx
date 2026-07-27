"use client";

import Link from "next/link";

import { commonNavigation, adminNavigation } from "@/constants/navigation";

import NavItem from "./nav-item";

interface AppSidebarProps {
  role: "USER" | "ADMIN";
}

export default function AppSidebar({ role }: AppSidebarProps) {
  const navigation =
    role === "ADMIN"
      ? [...commonNavigation, ...adminNavigation]
      : commonNavigation;

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold">LoanWise AI</h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
}
