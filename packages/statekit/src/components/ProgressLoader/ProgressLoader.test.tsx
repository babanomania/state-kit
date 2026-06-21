import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressLoader } from "./ProgressLoader";

describe("ProgressLoader", () => {
  it("is a polite status when indeterminate", () => {
    render(<ProgressLoader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("is a progressbar with bounds when determinate", () => {
    render(<ProgressLoader variant="linear" value={42} label="Uploading" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("Uploading")).toBeInTheDocument();
  });

  it("falls back to a generic accessible name when no label is given", () => {
    render(<ProgressLoader variant="linear" value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Progress");
  });
});
