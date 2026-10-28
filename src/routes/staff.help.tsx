import { createFileRoute } from "@tanstack/react-router";
import { HelpCenter } from "@/components/app/AccountTools";
import { PageHeader } from "@/components/app/kit";

export const Route = createFileRoute("/staff/help")({
  head: () => ({ meta: [{ title: "Help & Support — Dentriq" }] }),
  component: StaffHelp,
});

function StaffHelp() {
  return (
    <>
      <PageHeader
        title="Help & Support"
        description="Search role-appropriate guidance for Dentriq workflows and common account issues."
      />
      <HelpCenter audience="staff" />
    </>
  );
}
