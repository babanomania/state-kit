import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PartialFailureState } from "./PartialFailureState";

describe("PartialFailureState", () => {
  it("renders succeeded and failed counts", () => {
    render(<PartialFailureState succeeded={8} failed={2} />);
    expect(screen.getByRole("alert")).toHaveTextContent("8 succeeded");
    expect(screen.getByRole("alert")).toHaveTextContent("2 failed");
  });

  it("fires onRetryFailed when given", () => {
    const onRetryFailed = vi.fn();
    render(<PartialFailureState succeeded={8} failed={2} onRetryFailed={onRetryFailed} />);
    screen.getByRole("button", { name: "Retry failed" }).click();
    expect(onRetryFailed).toHaveBeenCalledTimes(1);
  });
});
