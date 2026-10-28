import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { getStaffLogoutLocation } from "@/components/app/StaffShell";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the public home page instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    "/login",
    "/recover-account",
    "/staff/dashboard",
    "/staff/patients",
    "/staff/patients/P-1001",
    "/staff/registration",
    "/staff/odontogram/P-1001",
    "/staff/queue",
    "/staff/schedules",
    "/staff/ai-assistant",
    "/staff/change-impact",
    "/staff/inventory",
    "/staff/inventory/batches",
    "/staff/inventory/forecasts",
    "/staff/reports",
    "/staff/audit-logs",
    "/admin/users",
    "/admin/roles",
    "/admin/resources",
    "/admin/treatment-plans",
    "/admin/backup",
    "/patient/dashboard",
    "/patient/records",
    "/patient/tooth-history",
    "/patient/schedules",
    "/patient/notifications",
    "/patient/instructions",
    "/patient/profile",
  ])("registers the required route %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("routes staff logout to signed-out staff login", () => {
    expect(getStaffLogoutLocation()).toEqual({
      to: "/login",
      search: { mode: "staff", signedOut: true },
    });
  });

  it.each([
    ["patient", "patient"],
    ["staff", "staff"],
  ])("keeps %s logout pointed at the login route with feedback state", (mode, expectedMode) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const location = router.buildLocation({
      to: "/login",
      search: { mode, signedOut: true },
    });

    expect(location.pathname).toBe("/login");
    expect(location.search).toEqual({ mode: expectedMode, signedOut: true });
  });
});
