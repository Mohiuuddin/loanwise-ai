import { Prisma } from "@/generated/prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ProfilePhotoUpload from "./profile-photo-upload";
import { formatEnum } from "@/utils/format";

type Profile = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    phone: true;
    role: true;
    image: true;
    createdAt: true;
  };
}>;

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-28 w-28">
            <AvatarImage src={profile.image ?? ""} />

            <AvatarFallback className="text-3xl">
              {profile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* <Button variant="outline">Change Profile Photo</Button> */}
          <ProfilePhotoUpload />
        </div>

        <Separator />

        {/* Profile Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>

            <p className="font-medium">{profile.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>

            <p className="font-medium">{profile.phone ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>

            <p className="font-medium">{formatEnum(profile.role)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>

            <p className="font-medium">
              {profile.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
