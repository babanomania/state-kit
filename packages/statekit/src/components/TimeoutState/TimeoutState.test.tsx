import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimeoutState } from "./TimeoutState";

describe("TimeoutState", () => {
  it("shows the timeout copy as an alert", () => {
    render(<TimeoutState />);
    expect(screen.getByRole("alert")).toHaveTextContent("Request timed out");
    expect(screen.getByText("30s")).toBeInTheDocument();
  });

  it("derives the countdown label from elapsed time", () => {
    render(<TimeoutState timeoutMs={30000} elapsed={12000} onRetry={vi.fn()} />);
    expect(screen.getByText("12s")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });
});
