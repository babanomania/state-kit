import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StateBoundary } from "./StateBoundary";

describe("StateBoundary", () => {
  it("renders a default spinner while loading", () => {
    render(
      <StateBoundary loading>
        <div>Users table</div>
      </StateBoundary>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("Users table")).not.toBeInTheDocument();
  });

  it("renders a default error state and fires onRetry", () => {
    const onRetry = vi.fn();
    render(
      <StateBoundary error={new Error("boom")} onRetry={onRetry}>
        <div>Users table</div>
      </StateBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    screen.getByRole("button", { name: "Try again" }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders children when neither loading nor error", () => {
    render(
      <StateBoundary data={[1, 2, 3]}>
        <div>Users table</div>
      </StateBoundary>,
    );
    expect(screen.getByText("Users table")).toBeInTheDocument();
  });
});
