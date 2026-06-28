import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/auth/register-form";
import LoginLink from "@/components/auth/login-link";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Account"
      description="Create your LoanWise AI account"
      footer={<LoginLink />}
    >
      <RegisterForm />
    </AuthCard>
  );
}
