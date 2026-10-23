import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Odontogram3D, Legend } from "@/components/app/Odontogram3D";
import { ToothPanel } from "@/components/app/ToothPanel";
import { Callout, PageHeader, Panel, Restricted, selectCls } from "@/components/app/kit";
import { getTeethFor } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { can, canEditClinical } from "@/lib/permissions";

export const Route = createFileRoute("/staff/odontogram/$patientId")({
  head: () => ({ meta: [{ title: "3D Odontogram — Dentriq" }, { name: "description", content: "Interactive 3D dental chart with tooth-level history." }, { property: "og:title", content: "3D Odontogram — Dentriq" }, { property: "og:description", content: "Interactive 3D dental chart." }] }),
  component: Page,
});

export function OdontogramWorkspace({ patientId }: { patientId: string }) {
  const { role, schedules, log } = useStore();
  const [teeth, setTeeth] = useState(() => getTeethFor(patientId));
  const [sel, setSel] = useState(26);
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <div className="space-y-3">
        <Odontogram3D teeth={teeth} selected={sel} onSelect={setSel} />
        <Legend />
      </div>
      <Panel>
        <ToothPanel key={sel + teeth[sel].condition + teeth[sel].history.length} tooth={teeth[sel]} schedules={schedules.filter((s) => s.patientId === patientId)} editable={canEditClinical(role)}
          onSave={(t) => { setTeeth((all) => ({ ...all, [t.number]: t })); log("Tooth record update", "Odontogram", `${patientId} / ${t.number}`, "Tooth-level documentation updated."); }} />
      </Panel>
    </div>
  );
}

function Page() {
  const { patientId } = Route.useParams();
  const { role, patients } = useStore();
  const nav = useNavigate();
  const p = patients.find((x) => x.id === patientId);
  if (!can(role, "odontogram") && !can(role, "patients")) return <Restricted what="the odontogram" />;
  return (
    <>
      <PageHeader title="3D Odontogram" description="Rotate, zoom and select a tooth to review or document tooth-level records." crumbs={[{ label: "Patients", to: "/staff/patients" }, { label: p?.name ?? patientId }, { label: "Odontogram" }]}
        actions={<select aria-label="Select patient" className={selectCls + " w-64"} value={patientId} onChange={(e) => nav({ to: "/staff/odontogram/$patientId", params: { patientId: e.target.value } })}>{patients.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>} />
      <Callout tone="info" className="mb-4">The odontogram records dentist findings. No automated diagnosis is performed.</Callout>
      <OdontogramWorkspace key={patientId} patientId={patientId} />
    </>
  );
}
