import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FilterEmptyState } from "./FilterEmptyState";

describe("FilterEmptyState", () => {
  it("reports the active filter count when not resettable", () => {
    render(<FilterEmptyState activeFilters={3} />);
    expect(screen.getByText("3 filters are active.")).toBeInTheDocument();
  });

  it("offers a reset action that fires onReset", () => {
    const onReset = vi.fn();
    render(<FilterEmptyState activeFilters={3} onReset={onReset} />);
    expect(screen.getByText("Reset to see all records.")).toBeInTheDocument();
    screen.getByRole("button", { name: "Reset filters" }).click();
    expect(onReset).toHaveBeenCalledOnce();
  });
});
