import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompletedState } from "./CompletedState";

describe("CompletedState", () => {
  it("renders the title as a status region", () => {
    render(<CompletedState title="Task complete" description="Nice work." />);
    expect(screen.getByRole("status")).toHaveTextContent("Task complete");
  });

  it("fires onDone when the continue action is clicked", () => {
    const onDone = vi.fn();
    render(<CompletedState title="Task complete" onDone={onDone} />);
    screen.getByRole("button", { name: "Continue" }).click();
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("omits the action when onDone is not given", () => {
    render(<CompletedState title="Task complete" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
