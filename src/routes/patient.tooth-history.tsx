import { createFileRoute } from "@tanstack/react-router";
import { History, Info, ShieldCheck } from "lucide-react";
import { PatientPortalShell } from "@/components/app/PatientPortalShell";
import { StatusBadge } from "@/components/app/kit";

export const Route = createFileRoute("/patient/tooth-history")({
  head: () => ({
    meta: [
      { title: "Tooth History — Dentriq" },
      { name: "description", content: "Information-only tooth history." },
    ],
  }),
  component: ToothHistory,
});

const TEETH = [
  {
    number: "16",
    name: "Upper right first molar",
    condition: "Treated",
    tone: "info" as const,
    note: "Filling completed during the last visit.",
  },
  {
    number: "26",
    name: "Upper left first molar",
    condition: "For review",
    tone: "warning" as const,
    note: "Discuss sensitivity with your dentist at the next visit.",
  },
  {
    number: "36",
    name: "Lower left first molar",
    condition: "Healthy",
    tone: "success" as const,
    note: "No treatment recorded.",
  },
];

function ToothHistory() {
  return (
    <PatientPortalShell
      title="Tooth history"
      description="A simplified view of tooth-specific information shared by your care team."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {TEETH.map((tooth) => (
          <article key={tooth.number} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-lg font-bold text-primary">
                {tooth.number}
              </span>
              <StatusBadge status={tooth.condition} tone={tooth.tone} />
            </div>
            <h2 className="mt-4 font-semibold">{tooth.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{tooth.note}</p>
          </article>
        ))}
      </div>
      <section className="rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">History and instructions</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Your dentist may add treatment history, images, and home-care instructions after each
          visit. This portal does not allow clinical edits.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/50 p-4">
            <Info className="h-4 w-4 text-primary" />
            <p className="mt-2 text-sm">Follow the care instructions provided by your clinic.</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <ShieldCheck className="h-4 w-4 text-success" />
            <p className="mt-2 text-sm">Only authorized clinic staff can update this history.</p>
          </div>
        </div>
      </section>
    </PatientPortalShell>
  );
}
