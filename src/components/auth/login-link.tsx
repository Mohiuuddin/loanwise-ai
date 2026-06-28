import Link from "next/link";

export default function LoginLink() {
  return (
    <p className="text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link href="/login" className="font-medium text-primary hover:underline">
        Sign in
      </Link>
    </p>
  );
}
