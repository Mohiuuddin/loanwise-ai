import Link from "next/link";

import { Prisma } from "@/generated/prisma/client";
import { UserRole, UserStatus } from "@/generated/prisma/enums";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ToggleUserStatusButton from "./toggle-user-status-button";

type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    phone: true;
    image: true;
    role: true;
    status: true;
    createdAt: true;

    loanApplications: {
      select: {
        id: true;
        applicantName: true;
        loanAmount: true;
        status: true;
        createdAt: true;
      };
    };
  };
}>;

interface UserDetailsCardProps {
  user: User;
}

function roleVariant(role: UserRole) {
  return role === UserRole.ADMIN ? "default" : "secondary";
}

function statusVariant(status: UserStatus) {
  return status === UserStatus.ACTIVE ? "default" : "destructive";
}

export default function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image ?? ""} />

              <AvatarFallback className="text-3xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{user.name}</h2>

              <p className="text-muted-foreground">{user.email}</p>

              <div className="flex gap-2">
                <Badge variant={roleVariant(user.role)}>{user.role}</Badge>

                <Badge variant={statusVariant(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{user.phone ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p>{user.createdAt.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="pt-2">
            <ToggleUserStatusButton userId={user.id} status={user.status} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>

        <CardContent>
          {user.loanApplications.length === 0 ? (
            <p className="text-muted-foreground">No applications found.</p>
          ) : (
            <div className="space-y-4">
              {user.loanApplications.map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{loan.applicantName}</p>

                    <p className="text-sm text-muted-foreground">
                      {loan.loanAmount.toString()}
                    </p>

                    <Badge>{loan.status}</Badge>
                  </div>

                  <Button asChild size="sm">
                    <Link href={`/dashboard/loan/${loan.id}`}>View Loan</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
