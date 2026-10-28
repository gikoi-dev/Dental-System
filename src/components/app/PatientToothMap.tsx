import { cn } from "@/lib/utils";
import {
  CONDITION_META,
  LOWER,
  UPPER,
  type ToothCondition,
  type ToothRecord,
} from "@/lib/mock-data";

const STATUS_MARK: Record<ToothCondition, string> = {
  healthy: "✓",
  review: "!",
  treated: "●",
  attention: "!",
  missing: "—",
};

const STATUS_STYLE: Record<ToothCondition, string> = {
  healthy: "border-success/60 bg-success-soft text-success",
  review: "border-warning/70 bg-warning-soft text-warning",
  treated: "border-info/70 bg-info-soft text-info",
  attention: "border-danger/70 bg-danger-soft text-danger",
  missing: "border-dashed border-neutral/70 bg-muted text-muted-foreground",
};

export function PatientToothMap({
  teeth,
  selected,
  onSelect,
  visibleNumbers,
}: {
  teeth: Record<number, ToothRecord>;
  selected: number | null;
  onSelect: (number: number) => void;
  visibleNumbers?: Set<number>;
}) {
  return (
    <div className="space-y-5" aria-label="Interactive dental arch map">
      <div className="rounded-xl border bg-muted/20 p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>Upper arch</span>
          <span>Patient&apos;s right ← → left</span>
        </div>
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2" role="group" aria-label="Upper teeth">
          {UPPER.map((number, index) => (
            <ToothButton
              key={number}
              number={number}
              record={teeth[number]}
              selected={selected === number}
              onSelect={onSelect}
              index={index}
              visible={visibleNumbers?.has(number) ?? true}
            />
          ))}
        </div>
        <div className="my-4 h-px bg-border" aria-hidden="true" />
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2" role="group" aria-label="Lower teeth">
          {LOWER.map((number, index) => (
            <ToothButton
              key={number}
              number={number}
              record={teeth[number]}
              selected={selected === number}
              onSelect={onSelect}
              index={index}
              visible={visibleNumbers?.has(number) ?? true}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>Lower arch</span>
          <span>Patient&apos;s right ← → left</span>
        </div>
      </div>
      <div className="grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(CONDITION_META) as ToothCondition[]).map((condition) => (
          <div key={condition} className="flex items-center gap-2 rounded-lg border px-2.5 py-2">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold",
                STATUS_STYLE[condition],
              )}
              aria-hidden="true"
            >
              {STATUS_MARK[condition]}
            </span>
            <span>
              <span className="font-medium">{CONDITION_META[condition].label}</span>
              <span className="block text-muted-foreground">
                {condition === "healthy" ? "No finding recorded" : "Clinic record available"}
              </span>
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        This map reflects information recorded by your clinic. It is for viewing only and is not a
        diagnosis.
      </p>
    </div>
  );
}

function ToothButton({
  number,
  record,
  selected,
  onSelect,
  index,
  visible,
}: {
  number: number;
  record: ToothRecord;
  selected: boolean;
  onSelect: (number: number) => void;
  index: number;
  visible: boolean;
}) {
  if (!visible) return <span className="min-h-14" aria-hidden="true" />;

  const meta = CONDITION_META[record.condition];
  const hasHistory = record.condition !== "healthy" || record.history.length > 0;
  return (
    <button
      type="button"
      aria-label={`Tooth ${number}, ${meta.label}${hasHistory ? ", recorded history" : ", no recorded history"}`}
      aria-pressed={selected}
      title={`Tooth ${number}: ${meta.label}`}
      onClick={() => onSelect(number)}
      className={cn(
        "group flex min-h-14 min-w-0 flex-col items-center justify-center rounded-lg border-2 px-0.5 py-1.5 text-center transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        STATUS_STYLE[record.condition],
        selected && "-translate-y-0.5 ring-4 ring-primary/25 ring-offset-1",
        index < 8 ? "rounded-t-[45%]" : "rounded-t-[35%]",
      )}
    >
      <span className="text-[11px] font-bold leading-none sm:text-xs">{number}</span>
      <span className="mt-1 text-[10px] font-bold leading-none" aria-hidden="true">
        {STATUS_MARK[record.condition]}
      </span>
    </button>
  );
}
