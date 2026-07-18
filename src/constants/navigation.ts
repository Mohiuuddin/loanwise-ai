import {
  LayoutDashboard,
  FileText,
  History,
  Settings,
  User,
} from "lucide-react";

export const dashboardNavigation = [
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
