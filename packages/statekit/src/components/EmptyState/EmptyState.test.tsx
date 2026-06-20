import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title and description", () => {
    render(<EmptyState title="No users yet" description="Invite your team to get started." />);
    expect(screen.getByText("No users yet")).toBeInTheDocument();
    expect(screen.getByText("Invite your team to get started.")).toBeInTheDocument();
  });

  it("renders a supplied action node", () => {
    render(<EmptyState title="No users yet" action={<button>Invite people</button>} />);
    expect(screen.getByRole("button", { name: "Invite people" })).toBeInTheDocument();
  });
});
