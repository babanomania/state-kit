import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces a polite loading status", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Loading");
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Fetching users" />);
    expect(screen.getByRole("status")).toHaveTextContent("Fetching users");
  });
});
