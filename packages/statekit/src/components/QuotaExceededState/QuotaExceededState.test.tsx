import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuotaExceededState } from "./QuotaExceededState";

describe("QuotaExceededState", () => {
  it("interpolates used/limit/unit in the description", () => {
    render(<QuotaExceededState used={10} limit={10} unit="GB" />);
    expect(screen.getByRole("alert")).toHaveTextContent("You've used 10 of 10 GB on your current plan.");
  });

  it("fires onUpgrade when given", () => {
    const onUpgrade = vi.fn();
    render(<QuotaExceededState used={5} limit={5} onUpgrade={onUpgrade} />);
    screen.getByRole("button", { name: "Upgrade plan" }).click();
    expect(onUpgrade).toHaveBeenCalledTimes(1);
  });
});
