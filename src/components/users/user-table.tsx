import Link from "next/link";

import { Prisma } from "@/generated/prisma/client";
import { UserRole, UserStatus } from "@/generated/prisma/enums";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    phone: true;
    role: true;
    status: true;
    createdAt: true;
  };
}>;

interface UserTableProps {
  users: User[];
  page: number;
  totalPages: number;
}

function roleVariant(role: UserRole) {
  switch (role) {
    case UserRole.ADMIN:
      return "default";

    default:
      return "secondary";
  }
}

function statusVariant(status: UserStatus) {
  switch (status) {
    case UserStatus.ACTIVE:
      return "default";

    case UserStatus.INACTIVE:
      return "destructive";

    default:
      return "secondary";
  }
}

export default function UserTable({ users, page, totalPages }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No users found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Email</TableHead>

              <TableHead>Phone</TableHead>

              <TableHead>Role</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Joined</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.phone ?? "-"}</TableCell>

                <TableCell>
                  <Badge variant={roleVariant(user.role)}>{user.role}</Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={statusVariant(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>

                <TableCell className="text-right">
                  <Button asChild size="sm">
                    <Link href={`/dashboard/users/${user.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        {page > 1 ? (
          <Button asChild variant="outline">
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Previous
          </Button>
        )}

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Button asChild variant="outline">
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
