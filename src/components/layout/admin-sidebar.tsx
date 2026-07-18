"use client";

import Link from "next/link";

import { adminNavigation } from "@/constants/admin-navigation";

import NavItem from "./nav-item";

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-6">
        <Link href="/admin">
          <h1 className="text-2xl font-bold">LoanWise Admin</h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {adminNavigation.map((item) => (
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
