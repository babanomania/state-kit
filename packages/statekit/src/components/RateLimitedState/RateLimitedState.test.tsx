import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RateLimitedState } from "./RateLimitedState";

describe("RateLimitedState", () => {
  it("renders the retry countdown as an alert", () => {
    render(<RateLimitedState retryAfter={42} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Too many requests");
    expect(screen.getByText("Retry after 42s")).toBeInTheDocument();
  });

  it("includes the limit in the description when given", () => {
    render(<RateLimitedState retryAfter={10} limit={60} />);
    expect(screen.getByRole("alert")).toHaveTextContent("You've hit the 60/min rate limit.");
  });

  it("fires onUpgrade when given", () => {
    const onUpgrade = vi.fn();
    render(<RateLimitedState retryAfter={10} onUpgrade={onUpgrade} />);
    screen.getByRole("button", { name: "View plans" }).click();
    expect(onUpgrade).toHaveBeenCalledTimes(1);
  });
});
