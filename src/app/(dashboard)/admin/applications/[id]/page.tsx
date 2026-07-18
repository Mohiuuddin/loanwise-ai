import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin";

import { getLoanById } from "@/data/admin/get-loan-by-id";

import AdminApplicationDetails from "@/components/admin/admin-application-details";

interface AdminApplicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminApplicationPage({
  params,
}: AdminApplicationPageProps) {
  await requireAdmin();

  const { id } = await params;

  const application = await getLoanById(id);

  if (!application) {
    notFound();
  }

  return <AdminApplicationDetails application={application} />;
}
