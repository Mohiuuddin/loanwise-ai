import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";
import RegisterLink from "@/components/auth/register-link";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your LoanWise AI account"
      footer={<RegisterLink />}
    >
      <LoginForm />
    </AuthCard>
  );
}
