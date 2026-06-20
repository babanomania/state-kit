import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("announces the friendly default copy as an alert", () => {
    render(<ErrorState />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong");
  });

  it("renders a retry button that fires the handler", () => {
    const retry = vi.fn();
    render(<ErrorState retry={retry} />);
    screen.getByRole("button", { name: "Try again" }).click();
    expect(retry).toHaveBeenCalledOnce();
  });

  it("shows the error stack for the technical variant", () => {
    render(<ErrorState variant="technical" error={new Error("boom")} retry={() => {}} />);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    expect(screen.getByText("boom")).toBeInTheDocument();
  });
});
