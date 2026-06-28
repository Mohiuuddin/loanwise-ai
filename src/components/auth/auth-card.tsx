import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {children}

        {footer}
      </CardContent>
    </Card>
  );
}
