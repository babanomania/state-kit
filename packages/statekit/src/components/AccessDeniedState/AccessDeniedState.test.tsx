import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AccessDeniedState } from "./AccessDeniedState";

describe("AccessDeniedState", () => {
  it("interpolates the resource name in the default lock variant", () => {
    render(<AccessDeniedState resource="Billing" />);
    expect(screen.getByRole("alert")).toHaveTextContent("You don't have permission to view Billing.");
  });

  it("renders shield-variant copy", () => {
    render(<AccessDeniedState variant="shield" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Restricted area");
  });

  it("fires onRequestAccess when given", () => {
    const onRequestAccess = vi.fn();
    render(<AccessDeniedState onRequestAccess={onRequestAccess} />);
    screen.getByRole("button", { name: "Request access" }).click();
    expect(onRequestAccess).toHaveBeenCalledTimes(1);
  });
});
