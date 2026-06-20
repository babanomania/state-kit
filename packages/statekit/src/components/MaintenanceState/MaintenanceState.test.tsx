import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MaintenanceState } from "./MaintenanceState";

describe("MaintenanceState", () => {
  it("shows scheduled copy and a back-by time when until is given", () => {
    render(<MaintenanceState until={new Date("2026-06-20T15:30:00")} />);
    expect(screen.getByRole("status")).toHaveTextContent("Scheduled maintenance");
    expect(screen.getByText(/Back by/)).toBeInTheDocument();
  });

  it("shows live copy and a status page link without until", () => {
    render(<MaintenanceState statusPageUrl="/status" />);
    expect(screen.getByRole("status")).toHaveTextContent("Maintenance in progress");
    expect(screen.getByRole("link", { name: "Live status" })).toHaveAttribute("href", "/status");
  });
});
