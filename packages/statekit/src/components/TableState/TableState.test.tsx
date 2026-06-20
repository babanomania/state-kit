import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TableState } from "./TableState";

describe("TableState", () => {
  it("renders a loading status region with shimmer rows", () => {
    render(<TableState rows={3} columns={2} />);
    expect(screen.getByRole("status")).toHaveTextContent("loading");
  });

  it("renders an empty message", () => {
    render(<TableState status="empty" />);
    expect(screen.getByText("No records yet")).toBeInTheDocument();
  });

  it("renders an error alert", () => {
    render(<TableState status="error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Couldn't load this table.");
  });
});
