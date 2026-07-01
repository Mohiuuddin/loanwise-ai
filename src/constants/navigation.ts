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
    href: "/applications/new",
    icon: FileText,
  },
  {
    title: "Loan History",
    href: "/applications",
    icon: History,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;
