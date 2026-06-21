import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFoundState } from "./NotFoundState";

describe("NotFoundState", () => {
  it("renders the glitch digits and default copy", () => {
    render(<NotFoundState />);
    expect(screen.getByRole("alert")).toHaveTextContent("Page not found");
    expect(screen.getAllByText("4")).toHaveLength(2);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("links the home action when homeUrl is given", () => {
    render(<NotFoundState homeUrl="/" />);
    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute("href", "/");
  });

  it("moves focus to the home link on mount when homeUrl is given", () => {
    render(<NotFoundState homeUrl="/" />);
    expect(screen.getByRole("link", { name: "Go home" })).toHaveFocus();
  });
});
