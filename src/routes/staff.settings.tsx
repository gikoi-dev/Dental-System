import { createFileRoute } from "@tanstack/react-router";
import { AccountSettings } from "@/features/account/AccountTools";
import { PageHeader } from "@/components/app/kit";

export const Route = createFileRoute("/staff/settings")({
  head: () => ({ meta: [{ title: "Settings — Dentriq" }] }),
  component: StaffSettings,
});

function StaffSettings() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage supported session preferences without changing clinical workflows or permissions."
      />
      <AccountSettings audience="staff" />
    </>
  );
}
