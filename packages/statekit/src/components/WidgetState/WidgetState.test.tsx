import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WidgetState } from "./WidgetState";

describe("WidgetState", () => {
  it("renders children directly when ready", () => {
    render(
      <WidgetState status="ready">
        <div>Revenue chart</div>
      </WidgetState>,
    );
    expect(screen.getByText("Revenue chart")).toBeInTheDocument();
  });

  it("renders a loading shell by default", () => {
    render(<WidgetState />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("fires onRetry from the failure shell", () => {
    const onRetry = vi.fn();
    render(<WidgetState status="error" onRetry={onRetry} />);
    screen.getByRole("button", { name: "retry" }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
