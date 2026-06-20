import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DashboardState, type WidgetStatus } from "./DashboardState";

const widgets: WidgetStatus[] = [
  { id: "revenue", title: "Revenue", status: "ready" },
  { id: "sessions", title: "Sessions", status: "loading" },
  { id: "conversion", title: "Conversion", status: "error", onRetry: vi.fn() },
];

describe("DashboardState", () => {
  it("isolates a failed widget while rendering healthy ones", () => {
    render(<DashboardState widgets={widgets}>{(w) => <div>{w.title} content</div>}</DashboardState>);
    expect(screen.getByText("Revenue content")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Conversion failed");
    expect(screen.getByRole("status")).toHaveTextContent("Sessions");
  });

  it("shows a single dashboard-level error when isolateFailures is false", () => {
    render(<DashboardState widgets={widgets} isolateFailures={false}>{(w) => <div>{w.title}</div>}</DashboardState>);
    expect(screen.getByRole("alert")).toHaveTextContent("Dashboard failed to load");
    expect(screen.queryByText("Revenue")).not.toBeInTheDocument();
  });
});
