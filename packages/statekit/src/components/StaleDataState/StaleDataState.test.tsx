import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StaleDataState } from "./StaleDataState";

describe("StaleDataState", () => {
  it("shows a last-updated timestamp by default", () => {
    render(<StaleDataState lastUpdated={new Date("2026-06-20T10:00:00")} />);
    expect(screen.getByRole("status")).toHaveTextContent("Last updated");
  });

  it("shows a refreshing message when isRefreshing", () => {
    render(<StaleDataState lastUpdated={new Date()} isRefreshing />);
    expect(screen.getByRole("status")).toHaveTextContent("Refreshing…");
  });
});
