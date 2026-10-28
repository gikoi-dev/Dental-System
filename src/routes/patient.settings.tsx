import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { AccountSettings } from "@/features/account/AccountTools";
import { PatientPortalShell } from "@/components/app/PatientPortalShell";

export const Route = createFileRoute("/patient/settings")({
  head: () => ({ meta: [{ title: "Settings — Dentriq" }] }),
  component: PatientSettings,
});

function PatientSettings() {
  return (
    <PatientPortalShell
      title="Settings"
      description="Manage supported account and accessibility preferences."
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
        <Settings className="h-4 w-4" /> Patient account settings
      </div>
      <AccountSettings audience="patient" />
    </PatientPortalShell>
  );
}
