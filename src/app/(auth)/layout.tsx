import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30">
      {children}
    </main>
  );
}
