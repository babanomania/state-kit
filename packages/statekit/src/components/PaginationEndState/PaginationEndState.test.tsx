import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PaginationEndState } from "./PaginationEndState";

describe("PaginationEndState", () => {
  it("shows the total when given", () => {
    render(<PaginationEndState total={248} />);
    expect(screen.getByText("That's everything — 248 records loaded.")).toBeInTheDocument();
  });

  it("falls back to generic copy without a total", () => {
    render(<PaginationEndState />);
    expect(screen.getByText("No more items to load.")).toBeInTheDocument();
  });

  it("fires onBackToTop when given", () => {
    const onBackToTop = vi.fn();
    render(<PaginationEndState onBackToTop={onBackToTop} />);
    screen.getByRole("button", { name: "Back to top" }).click();
    expect(onBackToTop).toHaveBeenCalledTimes(1);
  });
});
