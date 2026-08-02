"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { UserRole, UserStatus } from "@/generated/prisma/enums";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserFilters() {
  const router = useRouter();

  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");

    router.push(`/dashboard/users?${params.toString()}`);
  }

  return (
    <div className="flex gap-4">
      <Select
        defaultValue={searchParams.get("role") ?? "ALL"}
        onValueChange={(value) => updateParam("role", value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
          <SelectItem value={UserRole.USER}>User</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get("status") ?? "ALL"}
        onValueChange={(value) => updateParam("status", value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
          <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
