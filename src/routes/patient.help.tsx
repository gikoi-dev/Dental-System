import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { HelpCenter } from "@/features/account/AccountTools";
import { PatientPortalShell } from "@/components/app/PatientPortalShell";

export const Route = createFileRoute("/patient/help")({
  head: () => ({ meta: [{ title: "Help & Support — Dentriq" }] }),
  component: PatientHelp,
});

function PatientHelp() {
  return (
    <PatientPortalShell
      title="Help & Support"
      description="Find simple guidance for your Dentriq patient portal."
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
        <HelpCircle className="h-4 w-4" /> Patient help center
      </div>
      <HelpCenter audience="patient" />
    </PatientPortalShell>
  );
}
