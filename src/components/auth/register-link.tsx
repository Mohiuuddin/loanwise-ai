import Link from "next/link";

export default function RegisterLink() {
  return (
    <p className="text-center text-sm text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link
        href="/register"
        className="font-medium text-primary hover:underline"
      >
        Create one
      </Link>
    </p>
  );
}
