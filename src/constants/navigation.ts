// constants/navigation.ts

import {
  LayoutDashboard,
  FileText,
  History,
  Settings,
  User,
  Users,
  ScrollText,
} from "lucide-react";

export const commonNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Application",
    href: "/dashboard/loan/new",
    icon: FileText,
  },
  {
    title: "Loan History",
    href: "/dashboard/loan",
    icon: History,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
] as const;

export const adminNavigation = [
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Audit Logs",
    href: "/dashboard/audit-logs",
    icon: ScrollText,
  },
] as const;
