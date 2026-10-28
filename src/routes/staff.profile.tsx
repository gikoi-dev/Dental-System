import { createFileRoute } from "@tanstack/react-router";
import { AccountProfile } from "@/features/account/AccountTools";
import { PageHeader } from "@/components/app/kit";

export const Route = createFileRoute("/staff/profile")({
  head: () => ({ meta: [{ title: "Profile — Dentriq" }] }),
  component: StaffProfile,
});

function StaffProfile() {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Review your authenticated staff identity and request permitted corrections."
      />
      <AccountProfile audience="staff" />
    </>
  );
}
