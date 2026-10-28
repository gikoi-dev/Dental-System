import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { Check, CircleHelp, LockKeyhole, Save, Search, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { ROLE_LABELS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Callout, Panel, StatusBadge } from "@/components/app/kit";

const STAFF_ARTICLES = [
  {
    category: "Getting started",
    title: "Find your way around Dentriq",
    body: "Use the grouped navigation for clinic workflows, intelligence, inventory, oversight, and administration. Your role determines which workspaces are available.",
  },
  {
    category: "Patient records",
    title: "Open a patient record safely",
    body: "Use Global Search or the Patients workspace, then confirm the patient name and identifier before reviewing clinical information.",
  },
  {
    category: "Clinical records",
    title: "Use the odontogram workspace",
    body: "Clinical entries remain role-controlled. Review the patient context before recording or reviewing tooth findings.",
  },
  {
    category: "Appointments",
    title: "Understand follow-up schedules",
    body: "Staff arrange follow-up schedules from the staff workspace. Patients can view schedules but cannot book, cancel, or reschedule them.",
  },
  {
    category: "Inventory",
    title: "Review stock and FIFO batches",
    body: "Inventory, batches, and forecasts are separate workspaces. Use the batch view when reviewing expiry or consumption order.",
  },
  {
    category: "Account and security",
    title: "If your session expires",
    body: "Return to the sign-in screen and complete the existing verification flow. Never share one-time verification codes.",
  },
];

const PATIENT_ARTICLES = [
  {
    category: "Managing my profile",
    title: "What can I update?",
    body: "Your portal displays account information available to Dentriq. Clinic-managed identifiers and clinical information are read-only in the patient portal.",
  },
  {
    category: "Signing in",
    title: "How do I recover access?",
    body: "Use the account recovery link on the sign-in screen. The current prototype does not send email or change credentials.",
  },
  {
    category: "Dental history",
    title: "Where can I view my history?",
    body: "Use My records for your available dental records and Tooth history for the recorded tooth-by-tooth view.",
  },
  {
    category: "Privacy and security",
    title: "Why is some information read-only?",
    body: "Clinical records, diagnoses, treatment records, and patient identifiers are protected from patient-side editing.",
  },
  {
    category: "Clinic corrections",
    title: "How do I request a correction?",
    body: "Use the correction or recovery request action shown on your profile where available. It records an in-session request in this prototype and does not send it externally.",
  },
];

function initials(name: string) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AccountProfile({ audience }: { audience: "staff" | "patient" }) {
  const { role, user } = useStore();
  const [requested, setRequested] = useState(false);
  const isPatient = audience === "patient";
  const accountRole = role ? ROLE_LABELS[role] : isPatient ? "Patient" : "Staff member";

  return (
    <div className="space-y-4">
      <Panel
        title="Account overview"
        description="Identity and access details from the current authenticated session."
      >
        <div className="flex flex-wrap items-center gap-4 border-b pb-5">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
            aria-hidden
          >
            {initials(user?.name ?? (isPatient ? "Patient" : "Staff"))}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user?.name ?? "Authenticated user"}</h2>
            <p className="text-sm text-muted-foreground">{user?.email ?? "Email unavailable"}</p>
            <div className="mt-2">
              <StatusBadge status={accountRole} />
            </div>
          </div>
        </div>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Account type</dt>
            <dd className="mt-1 font-medium">{accountRole}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Access status</dt>
            <dd className="mt-1 font-medium text-success">Active in current session</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-1 font-medium">{user?.email ?? "Not available"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Protected identity</dt>
            <dd className="mt-1 font-medium">Managed by the clinic system</dd>
          </div>
        </dl>
      </Panel>

      <Panel
        title="Personal information"
        description="The current prototype does not have a connected profile-write endpoint, so protected account fields stay read-only."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ReadOnlyField label="Full name" value={user?.name ?? "Unavailable"} />
          <ReadOnlyField label="Email address" value={user?.email ?? "Unavailable"} />
          <ReadOnlyField
            label={isPatient ? "Patient identifier" : "Role and permissions"}
            value={isPatient ? "Clinic-managed" : accountRole}
          />
          <ReadOnlyField label="Change process" value="Request through authorized clinic staff" />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => setRequested(true)} disabled={requested}>
            {requested ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {requested ? "Request recorded" : "Request a profile correction"}
          </Button>
          {requested && (
            <span className="text-sm text-success" role="status">
              This prototype recorded the request in the current session only.
            </span>
          )}
        </div>
      </Panel>

      <Callout tone="info" title="Protected information">
        {isPatient
          ? "Patient ID, clinical history, diagnoses, odontogram records, and treatment records cannot be edited from the portal."
          : "Role, permissions, employment status, and account identifiers are managed by authorized administrators."}
      </Callout>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 text-sm font-medium">
        <LockKeyhole className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        {value}
      </dd>
    </div>
  );
}

export function AccountSettings({ audience }: { audience: "staff" | "patient" }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [comfortableDensity, setComfortableDensity] = useState(true);
  const [saved, setSaved] = useState(false);
  const isPatient = audience === "patient";
  const toggle = (setter: (value: boolean) => void) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.checked);
    setSaved(false);
  };

  return (
    <div className="space-y-4">
      <Panel
        title="Account security"
        description="Security actions use the existing sign-in and recovery flow."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <SettingRow
            icon={<ShieldCheck className="h-4 w-4 text-success" />}
            title="Verification flow"
            description="Existing sign-in verification is required for account access."
            value="Enabled for this prototype"
          />
          <SettingRow
            icon={<LockKeyhole className="h-4 w-4 text-primary" />}
            title="Password changes"
            description="Credential changes are not available without the connected auth provider."
            value="Use account recovery"
          />
        </div>
      </Panel>
      <Panel
        title="Appearance and accessibility"
        description="These controls apply to this screen during the current session. No server preference endpoint is connected."
      >
        <div className="space-y-4">
          <Preference
            checked={reducedMotion}
            onChange={toggle(setReducedMotion)}
            title="Reduced motion"
            description="Prefer less animation in supported interface transitions."
          />
          <Preference
            checked={comfortableDensity}
            onChange={toggle(setComfortableDensity)}
            title="Comfortable density"
            description="Keep additional breathing room around information and controls."
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={() => setSaved(true)}>
            <Save className="mr-2 h-4 w-4" />
            Apply preferences
          </Button>
          {saved && (
            <span className="text-sm text-success" role="status">
              Preferences applied for this session.
            </span>
          )}
        </div>
      </Panel>
      <Panel
        title="Notification scope"
        description="Only categories represented by the current application are shown. Delivery channels are not configured here."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {(isPatient
            ? ["Account security", "Clinic communications"]
            : ["Operational alerts", "Inventory alerts", "Follow-up reminders", "Account security"]
          ).map((label) => (
            <Preference
              key={label}
              checked
              onChange={() => undefined}
              title={label}
              description="In-app information only in this prototype."
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Preference({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 hover:bg-muted/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 rounded border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

function SettingRow({
  icon,
  title,
  description,
  value,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      <p className="mt-3 text-xs font-medium text-primary-strong">{value}</p>
    </div>
  );
}

export function HelpCenter({ audience }: { audience: "staff" | "patient" }) {
  const [query, setQuery] = useState("");
  const articles = audience === "staff" ? STAFF_ARTICLES : PATIENT_ARTICLES;
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term
      ? articles.filter((article) =>
          `${article.title} ${article.category} ${article.body}`.toLowerCase().includes(term),
        )
      : articles;
  }, [articles, query]);
  return (
    <div className="space-y-4">
      <Panel
        title="Search help"
        description={
          audience === "staff"
            ? "Guidance is limited to workflows available in your Dentriq workspace."
            : "Simple guidance for using the patient portal."
        }
      >
        <label className="relative block">
          <span className="sr-only">Search help articles</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search help articles"
            className="h-10 w-full rounded-lg border bg-card pl-9 pr-3 text-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </Panel>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((article) => (
          <details key={article.title} className="group rounded-2xl border bg-card p-4 shadow-soft">
            <summary className="flex cursor-pointer list-none items-start gap-3 font-semibold">
              <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                {article.title}
                <span className="mt-1 block text-xs font-medium text-primary-strong">
                  {article.category}
                </span>
              </span>
            </summary>
            <p className="mt-3 border-t pt-3 text-sm leading-6 text-muted-foreground">
              {article.body}
            </p>
          </details>
        ))}
      </div>
      {filtered.length === 0 && (
        <Callout tone="info" title="No matching articles">
          Try a broader search term or return to the full help list.
        </Callout>
      )}
      <Callout tone="neutral" title="Need clinic assistance?">
        No verified support email, phone number, or helpdesk is configured in this prototype. Use
        the clinic&apos;s established internal contact process.
      </Callout>
    </div>
  );
}
