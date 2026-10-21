import { createFileRoute } from "@tanstack/react-router";
import { StaffShell } from "@/components/app/StaffShell";

export const Route = createFileRoute("/staff")({ component: StaffShell });
