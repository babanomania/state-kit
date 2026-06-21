import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RetryState } from "./RetryState";

describe("RetryState", () => {
  it("shows a manual retry message without autoRetry", () => {
    render(<RetryState onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toHaveTextContent("The request didn't go through.");
  });

  it("fires onRetry from the manual button", () => {
    const onRetry = vi.fn();
    render(<RetryState onRetry={onRetry} />);
    screen.getByRole("button", { name: "Retry now" }).click();
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("shows a countdown message when autoRetry is set", () => {
    render(<RetryState onRetry={() => {}} autoRetry={3000} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Retrying automatically in 3 seconds…");
  });

  it("moves focus to the retry button on mount", () => {
    render(<RetryState onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: "Retry now" })).toHaveFocus();
  });
});
