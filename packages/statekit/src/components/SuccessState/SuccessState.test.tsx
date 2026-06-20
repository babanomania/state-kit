import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SuccessState } from "./SuccessState";

describe("SuccessState", () => {
  it("renders the title and description as a status region", () => {
    render(<SuccessState title="All set!" description="Your changes have been saved." />);
    expect(screen.getByRole("status")).toHaveTextContent("All set!");
    expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
  });

  it("renders an optional action", () => {
    const onClick = vi.fn();
    render(<SuccessState title="All set!" action={<button onClick={onClick}>Continue</button>} />);
    screen.getByRole("button", { name: "Continue" }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
