"use client";

import Link from "next/link";

import { dashboardNavigation } from "@/constants/navigation";

import NavItem from "./nav-item";

export default function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold">LoanWise AI</h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {dashboardNavigation.map((item) => (
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
