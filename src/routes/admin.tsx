import { createFileRoute } from "@tanstack/react-router";
import { StaffShell } from "@/components/app/StaffShell";

export const Route = createFileRoute("/admin")({ component: StaffShell });
