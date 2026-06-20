import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ForbiddenState } from "./ForbiddenState";

describe("ForbiddenState", () => {
  it("shows the back action by default", () => {
    const onBack = vi.fn();
    render(<ForbiddenState onBack={onBack} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Forbidden · 403");
    screen.getByRole("button", { name: "Go back" }).click();
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("switches to the contact-admin copy and link when contactUrl is given", () => {
    render(<ForbiddenState contactUrl="/contact" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Access forbidden");
    expect(screen.getByRole("link", { name: "Contact admin" })).toHaveAttribute("href", "/contact");
  });
});
