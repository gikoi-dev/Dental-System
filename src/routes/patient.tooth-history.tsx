import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { History, Info, ListFilter, ShieldCheck } from "lucide-react";
import { PatientPortalShell } from "@/components/app/PatientPortalShell";
import { PatientToothMap } from "@/components/app/PatientToothMap";
import { ToothPanel } from "@/components/app/ToothPanel";
import { Empty, Panel } from "@/components/app/kit";
import { getTeethFor } from "@/lib/mock-data";

export const Route = createFileRoute("/patient/tooth-history")({
  head: () => ({
    meta: [
      { title: "Tooth History — Dentriq" },
      { name: "description", content: "Information-only tooth history." },
    ],
  }),
  component: ToothHistory,
});

function ToothHistory() {
  const teeth = getTeethFor("P-1001");
  const [selected, setSelected] = useState<number | null>(26);
  const [filter, setFilter] = useState<"all" | "recorded">("all");
  const tooth = selected === null ? undefined : teeth[selected];
  const recordedTeeth = useMemo(
    () =>
      Object.values(teeth).filter(
        (record) => record.condition !== "healthy" || record.history.length > 0,
      ),
    [teeth],
  );
  const visibleNumbers =
    filter === "recorded" ? new Set(recordedTeeth.map((record) => record.number)) : undefined;
  return (
    <PatientPortalShell
      title="Tooth history"
      description="Explore the dental information recorded in your clinic records."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Teeth with recorded history" value={recordedTeeth.length} />
        <SummaryCard
          label="Treatments recorded"
          value={recordedTeeth.filter((record) => record.condition === "treated").length}
        />
        <SummaryCard
          label="Needs review or attention"
          value={
            recordedTeeth.filter(
              (record) => record.condition === "review" || record.condition === "attention",
            ).length
          }
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Panel
          title={
            <span>
              Full-mouth overview
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                Select any tooth to see its documented history.
              </span>
            </span>
          }
          action={
            <div
              className="flex items-center gap-1 rounded-lg border p-1"
              aria-label="Tooth history filter"
            >
              <ListFilter className="ml-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              {(["all", "recorded"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  className={`rounded-md px-2 py-1 text-xs font-medium ${filter === value ? "bg-primary-soft text-primary-strong" : "text-muted-foreground hover:bg-muted"}`}
                >
                  {value === "all" ? "All teeth" : "Recorded only"}
                </button>
              ))}
            </div>
          }
        >
          <PatientToothMap
            teeth={teeth}
            selected={selected}
            onSelect={(number) => setSelected(number)}
            visibleNumbers={visibleNumbers}
          />
          {filter === "recorded" && (
            <div className="mt-5 border-t pt-4">
              <p className="mb-2 text-sm font-semibold">Teeth with recorded history</p>
              <div className="flex flex-wrap gap-2">
                {recordedTeeth.map((record) => (
                  <button
                    key={record.number}
                    type="button"
                    onClick={() => setSelected(record.number)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${selected === record.number ? "border-primary bg-primary-soft text-primary-strong" : "hover:bg-muted"}`}
                  >
                    Tooth {record.number}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Panel>
        <Panel
          title={
            <span className="flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              {tooth ? `Tooth ${tooth.number}` : "Select a tooth"}
            </span>
          }
        >
          {tooth ? (
            <ToothPanel tooth={tooth} schedules={[]} editable={false} simple />
          ) : (
            <Empty
              icon={History}
              title="Select a tooth"
              body="Choose a tooth on the map to review its recorded information."
            />
          )}
        </Panel>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-muted/50 p-4">
          <Info className="h-4 w-4 text-primary" />
          <p className="mt-2 text-sm">
            Only documented clinic information is shown. An empty history does not confirm that a
            tooth is healthy.
          </p>
        </div>
        <div className="rounded-xl bg-muted/50 p-4">
          <ShieldCheck className="h-4 w-4 text-success" />
          <p className="mt-2 text-sm">
            This portal is view-only. Authorized clinic staff manage clinical records.
          </p>
        </div>
      </div>
    </PatientPortalShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-soft">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
